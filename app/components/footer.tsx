// /app/components/Footer.tsx
"use client";

export default function Footer() {
    return (
      <footer className="bg-teal-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">CleanStreets India</h3>
              <p>Together, we can make our streets cleaner and our communities stronger.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <ul>
                <li><a href="/" className="hover:text-teal-200">Home</a></li>
                <li><a href="/create-post" className="hover:text-teal-200">Report an Issue</a></li>
                <li><a href="/my-posts" className="hover:text-teal-200">My Reports</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p>Email: info@cleanstreetsindia.org</p>
              <p>Phone: +91 123 456 7890</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 CleanStreets India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }