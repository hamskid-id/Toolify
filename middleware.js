
import { NextResponse } from 'next/server'

export function middleware(request) {

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // if (isProtectedRoute(request.nextUrl.pathname)) {
   
  // }

  return NextResponse.next()
}

function isProtectedRoute(pathname) {
  const protectedRoutes = ['/dashboard', '/cms']
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ['/', '/dashboard/:path*', '/cms/:path*'],
}