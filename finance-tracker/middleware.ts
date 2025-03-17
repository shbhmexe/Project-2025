import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Always allow access to all routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/transactions/:path*',
    '/categories/:path*',
    '/budgets/:path*',
    '/api/:path*',
  ],
}; 