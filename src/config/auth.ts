import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { authRequest } from '@/request';
import routes from './routes';

const auth: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            return null;
          }
          const userAgent = req.headers?.['user-agent'];

          const res = await authRequest.login(credentials, userAgent);
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
    signIn: routes.login,
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
    async jwt({ token, user, trigger, session }) {
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

export default auth;
