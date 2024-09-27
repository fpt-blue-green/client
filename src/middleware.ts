import { withAuth } from 'next-auth/middleware';
import { ERole } from './types/enum';
import { NextResponse } from 'next/server';
import routes from './config/routes';

const brandPaths = [routes.account, routes.brand.base];
const influencerPaths = [routes.account, '/influencer/create'];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    if (influencerPaths.some((path) => pathname.startsWith(path)) && token?.role === ERole.Influencer) {
      return NextResponse.next();
    }

    if (
      brandPaths.some((path) => pathname.startsWith(path)) &&
      (token?.role === ERole.Brand || pathname === routes.brand.base)
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: routes.login,
    },
  },
);

export const config = {
  matcher: ['/account', '/influencer/create', '/brand/:path*'],
};
