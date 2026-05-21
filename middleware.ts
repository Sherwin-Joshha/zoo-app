import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/visitor') || path.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const payload = await verifyToken(token);
    
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (path.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url)); // or a 403 page
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/visitor/:path*', '/admin/:path*'],
};
