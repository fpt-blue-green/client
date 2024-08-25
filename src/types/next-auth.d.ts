import NextAuth from 'next-auth';
import 'next-auth/jwt';
import User from './user';
import { ERole } from './enum';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: string;
    refreshToken?: string;
    role?: ERole;
  }
}
