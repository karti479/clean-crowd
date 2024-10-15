// /app/my-posts.tsx
"use client"

import { useState, useEffect } from 'react'
import { Post } from '@/lib/types'
import PostCard from '../components/postcard'

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      // In a real app, this would fetch only the user's posts
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
      setIsLoading(false)
    }
    fetchPosts()
  }, [])

  if (isLoading) {
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
        <p>You haven not reported any issues yet.</p>
      )}
    </div>
  )
}