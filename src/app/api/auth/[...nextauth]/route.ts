import http from '@/lib/http';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

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
          const res = await http.post('https://dummyjson.com/auth/login', {
            username: credentials?.email,
            password: credentials?.password,
          });
          const user = res.payload;

          if (user) {
            return {
              ...user,
              name: user.firstName + ' ' + user.lastName,
            };
          } else {
            return null;
          }
        } catch {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as number,
        name: token.name as string,
        email: token.email as string,
        image: token.image as string,
      };
      return session;
    },
    async signIn({ user, account }) {
      // Gửi dữ liệu user tới backend sau khi đăng nhập bằng Google
      if (account?.provider === 'google') {
        try {
          console.log(user);
        } catch (error) {
          console.error('Failed to send data to backend:', error);
        }
      }
      return true; // Trả về true để tiếp tục quá trình đăng nhập
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
