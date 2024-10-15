// /app/page.tsx
import Link from 'next/link'
import PostList from './components/postlist' // Adjusted import path

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="bg-teal-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to CleanStreets India</h1>
          <p className="text-xl mb-8">Join our community-driven initiative to make our streets cleaner and our cities better.</p>
          <Link href="/create-post" className="bg-white text-teal-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-teal-100 transition duration-300">
            Report an Issue
          </Link>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Reports</h2>
          <PostList />
        </div>
      </section>
      <section className="bg-teal-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">1. Report an Issue</h3>
              <p>Take a photo of a dirty area and provide its location.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">2. Community Funding</h3>
              <p>Local community members contribute to fund the cleaning.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">3. Professional Cleaning</h3>
              <p>Local cleaners bid for the job, and the work gets done.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
