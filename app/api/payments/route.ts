// /app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; // Correct import of authOptions
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-09-30.acacia',
});

// Define a custom type for the session user
type SessionUser = {
  id: string; // Add the id property
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions) as { user: SessionUser | null }; // Cast session to include user type
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { postId, amount } = await request.json();

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: 'inr',
      metadata: { postId },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
