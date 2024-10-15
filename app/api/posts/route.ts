// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const estimatedCost = parseFloat(formData.get('estimatedCost') as string);
    const latitude = parseFloat(formData.get('latitude') as string);
    const longitude = parseFloat(formData.get('longitude') as string);
    // const image = formData.get('image') as File; // Removed unused variable

    // TODO: Implement actual image upload logic
    const imageUrl = '/placeholder-image.jpg'; // Replace with actual image upload logic

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
        userId: (session.user as { id: string }).id, // Type assertion to ensure 'id' exists
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
