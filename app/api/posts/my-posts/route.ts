// /app/api/posts/my-posts/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions) as { user: { id: string } | null }

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const posts = await prisma.post.findMany({
      where: { userId: session.user.id },
      include: { user: true, bids: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching user posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  
  }
}
