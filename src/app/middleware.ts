import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Define the paths that should be protected
  const protectedPaths = ['/create-post', '/my-posts', '/profile']

  // Check if the current path is in the protected paths
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // If it's a protected path and there's no token, redirect to login
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If it's the API posts route, check for token
  if (request.nextUrl.pathname.startsWith('/api/posts') && request.method !== 'GET' && !token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }

  // For all other cases, continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/create-post',
    '/my-posts',
    '/profile',
    '/api/posts/:path*'
  ],
}