import config from '@/config';
import NextAuth from 'next-auth';

const handler = NextAuth(config.auth);
export { handler as GET, handler as POST };
