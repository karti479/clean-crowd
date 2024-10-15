// /app/create-post/page.tsx
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import PostForm from '../components/postform'

export default function CreatePost() {
  const router = useRouter()
  const { status } = useSession() // Removed session as it's not used
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const post = await response.json()
      router.push(`/view-post/${post.id}`)
    } else {
      alert('Failed to create post. Please try again.')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Report a Cleaning Issue</h1>
      <PostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
