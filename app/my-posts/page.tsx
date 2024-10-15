// /app/my-posts/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Post } from '@/lib/types'
import PostCard from '../components/postcard'

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { status } = useSession() // Removed session since it's not used
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      const fetchPosts = async () => {
        const response = await fetch('/api/posts/my-posts')
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
        setIsLoading(false)
      }
      fetchPosts()
    }
  }, [status, router])

  if (status === 'loading' || isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Reports</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>You have not reported any issues yet.</p>
      )}
    </div>
  )
}
