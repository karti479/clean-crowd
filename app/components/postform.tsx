// /app/components/PostForm.tsx
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Map } from './map'

interface PostFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  isSubmitting: boolean
}

export default function PostForm({ onSubmit, isSubmitting }: PostFormProps) {
  const { data: session } = useSession()
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedCost, setEstimatedCost] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      alert('You must be logged in to create a post')
      return
    }
    const formData = new FormData()
    formData.append('location', location)
    formData.append('description', description)
    formData.append('estimatedCost', estimatedCost)
    formData.append('latitude', latitude.toString())
    formData.append('longitude', longitude.toString())
    if (image) {
      formData.append('image', image)
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
          Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <Map
          onLocationSelect={(lat, lng) => {
            setLatitude(lat)
            setLongitude(lng)
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Describe the cleaning needed"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedCost">
          Estimated Cost (₹)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="estimatedCost"
          type="number"
          placeholder="Enter estimated cost"
          value={estimatedCost}
          onChange={(e) => setEstimatedCost(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </form>
  )
}