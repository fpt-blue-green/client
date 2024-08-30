'use client';

import { FC, ReactNode, useEffect } from 'react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import config from '@/config';
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<Readonly<AuthProviderProps>> = ({ children }) => {
  return (
    <SessionProvider>
      <RefreshProvider>{children}</RefreshProvider>
    </SessionProvider>
  );
};

const RefreshProvider: FC<Readonly<AuthProviderProps>> = ({ children }) => {
  const { data: session } = useSession();

  // Refresh token lỗi thì logout
  useEffect(() => {
    if (session?.user) {
      if (session.user.error === 'RefreshAccessTokenError') {
        console.log('Logout');
        signOut({ callbackUrl: config.routes.login });
      }
    }
  }, [session?.user]);

  return children;
};

export default AuthProvider;
