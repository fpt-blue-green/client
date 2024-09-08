// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
import 'next-auth/jwt';
import IUser from './user';

declare module 'next-auth' {
  interface Session {
    user: IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
