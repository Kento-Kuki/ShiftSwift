import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/clients(.*)',
  '/shifts(.*)',
  '/employees(.*)',
  '/select-org(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth();
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  if (userId && orgId && !isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/clients', req.url));
  }
  if (userId && !orgId && req.nextUrl.pathname !== '/select-org') {
    return NextResponse.redirect(new URL('/select-org', req.url));
  }
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
