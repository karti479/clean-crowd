// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Session } from 'next-auth';
import { uploadImage } from '../../../lib/imageUploader';

// Extend the Session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Ensure this is included
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export async function POST(request: NextRequest) {
  // Ensure the session is populated correctly
  const session = await getServerSession(authOptions) as Session; // Cast to Session type
  console.log('Session:', session); // Log the session to inspect its contents

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id; // Get userId from session
  console.log('User ID:', userId); // Log the userId to ensure it's defined

  try {
    const formData = await request.formData();
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const estimatedCost = parseFloat(formData.get('estimatedCost') as string);
    const latitude = parseFloat(formData.get('latitude') as string);
    const longitude = parseFloat(formData.get('longitude') as string);
    const image = formData.get('image') as File;

    // Implement actual image upload logic
    const imageUrl = await uploadImage(image); // Use the 'image' variable here for uploading

    const newPost = await prisma.post.create({
      data: {
        location,
        description,
        estimatedCost,
        latitude,
        longitude,
        imageUrl,
        status: 'pending',
        currentFunding: 0,
        userId, // Ensure userId is set here
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}