import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  
  // Redirect to login if no token and trying to access protected routes
  if (!token && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('auth/login', request.url));
  }

  // For admin routes, we'll need to verify the token on the server side
  // This is a simplified check and should be replaced with proper token verification
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Here you should verify the token and check if the user is an admin
    // For now, we'll just check if the token exists
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};