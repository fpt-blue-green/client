import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import config from '@/config';
import { authRequest } from '@/request';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }

          const res = await authRequest.login(credentials);
          const user = res.data || null;

          return user;
        } catch {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: config.routes.login,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          //TODO: Call Api
          console.log(user);
        } catch (error) {
          console.error('Failed to send data to backend:', error);
        }
      }
      if (account?.provider === 'facebook') {
        try {
          //TODO: Call Api
          console.log(user);
        } catch (error) {
          console.error('Failed to send data to backend:', error);
        }
      }
      return true; // Trả về true để tiếp tục quá trình đăng nhập
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  events: {
    async signOut({ session }) {
      try {
        await authRequest.logout(session.user.refreshToken);
      } catch {}
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
