'use client';

import { FC, ReactNode, useEffect } from 'react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { authRequest } from '@/request';
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
  const { data: session, update } = useSession();

  // Refresh token lỗi thì logout
  useEffect(() => {
    const user = session?.user;
    if (user) {
      const handler = setInterval(async () => {
        const decoded = jwtDecode(user.accessToken);
        if (decoded.exp) {
          // Token còn dưới 2.5 phút thì refresh
          if (decoded.exp * 1000 - Date.now() < 150_000) {
            try {
              const { data } = await authRequest.refreshToken(user.refreshToken);
              if (data) {
                const { accessToken, refreshToken } = data;
                update({
                  ...session,
                  user: {
                    ...session?.user,
                    accessToken,
                    refreshToken,
                  },
                });
              }
            } catch {
              signOut({ callbackUrl: config.routes.login });
            }
          }
        }
      }, 60_000);

      return () => clearInterval(handler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  return children;
};

export default AuthProvider;
