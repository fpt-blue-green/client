import { withAuth } from 'next-auth/middleware';
import { ERole } from './types/enum';
import { NextResponse } from 'next/server';
import routes from './config/routes';

const brandPaths = ['/example'];
const influencerPaths = ['/account'];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    if (influencerPaths.some((path) => pathname.startsWith(path)) && token?.role !== ERole.Influencer) {
      console.log('Influencer route protected');
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (brandPaths.some((path) => pathname.startsWith(path)) && token?.role !== ERole.Influencer) {
      console.log('Brand route protected');
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
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
  matcher: ['/account'],
};
