'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { authRequest } from '@/request';
import config from '@/config';
import IUser from '@/types/user';
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
  const sessionFlag = useRef(true);

  const refreshTokenIfNeeded = async (user: IUser) => {
    const decoded = jwtDecode(user.accessToken);
    if (decoded.exp) {
      // Token còn dưới 2.5 phút thì refresh
      if (decoded.exp * 1000 - Date.now() < 180_000) {
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
          // Refresh token lỗi thì logout
          signOut({ callbackUrl: config.routes.login });
        }
      }
    }
  };

  useEffect(() => {
    const user = session?.user;

    if (user) {
      // refresh token khi user được lưu trong cookie và app được chạy lần đầu
      if (sessionFlag.current) {
        refreshTokenIfNeeded(user);
        sessionFlag.current = false;
      }

      const handler = setInterval(() => refreshTokenIfNeeded(user), 60_000);

      return () => clearInterval(handler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  return children;
};

export default AuthProvider;
