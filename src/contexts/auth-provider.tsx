'use client';

import { FC, ReactNode, useEffect } from 'react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import http from '@/lib/http';
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

const time = Number(config.env.REFRESH_TIME);

const RefreshProvider: FC<Readonly<AuthProviderProps>> = ({ children }) => {
  const { data: session, update } = useSession();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (session) {
      const updateRefreshToken = async () => {
        try {
          const decoded = jwtDecode(session.user.accessToken);

          if (decoded.exp! * 1000 - Date.now() < time * 2) {
            const { data } = await http.post('/Auth/refreshToken', { token: session.user.refreshToken });
            const { accessToken, refreshToken } = data;
            await update({ ...session, user: { ...session.user, accessToken, refreshToken } });
          }
        } catch {
          signOut();
        }
      };

      interval = setInterval(updateRefreshToken, time);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return children;
};

export default AuthProvider;
