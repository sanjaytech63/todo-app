import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/app/lib/auth/actions';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ['/dashboard'];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Auth routes
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}