// /app/components/Header.tsx
"use client"; // Ensure this is the first line

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession() // This should now work correctly

  return (
    <header className="bg-teal-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="CleanStreets India Logo" width={40} height={40} />
          <span className="text-2xl font-bold">CleanStreets India</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-teal-200">Home</Link></li>
            <li><Link href="/create-post" className="hover:text-teal-200">Report Issue</Link></li>
            <li><Link href="/my-posts" className="hover:text-teal-200">My Reports</Link></li>
            {session ? (
              <>
                <li><Link href="/profile" className="hover:text-teal-200">Profile</Link></li>
                <li><button onClick={() => signOut()} className="hover:text-teal-200">Logout</button></li>
              </>
            ) : (
              <li><Link href="/api/auth/signin" className="hover:text-teal-200">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
