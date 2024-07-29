import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/tai-khoan'];
const authPaths = ['/dang-nhap', '/dang-ky'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('token')?.value;

  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/dang-nhap', request.url));
  }

  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tai-khoan', '/dang-nhap', '/dang-ky'],
};
