// app/create-post/page.tsx
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import PostForm from '../components/postform'

export default function CreatePost() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login')
    return null
  }

  const handleSubmit = async (formData: FormData) => {
    if (!session) {
      setError('You must be logged in to create a post')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const post = await response.json()
        router.push(`/posts/${post.id}`)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create post. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Report a Cleaning Issue</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      <PostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
