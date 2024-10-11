'use client';

import { createContext, FC, ReactNode, useEffect, useRef } from 'react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { authRequest } from '@/request';
import config from '@/config';
import IUser from '@/types/user';
import useSWRImmutable from 'swr/immutable';
import IInfluencer from '@/types/influencer';
import { fetcher } from '@/lib/http';
import { ERole } from '@/types/enum';
import IBrand from '@/types/brand';
import { Session } from 'next-auth';
import { KeyedMutator } from 'swr';
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

interface AuthContextProps {
  session: Session | null;
  update: (data?: any) => Promise<Session | null>;
  isLoading: boolean;
  influencer?: IInfluencer;
  brand?: IBrand;
  refreshInfluencer: KeyedMutator<IInfluencer>;
  refreshBrand: KeyedMutator<IBrand>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const RefreshProvider: FC<Readonly<AuthProviderProps>> = ({ children }) => {
  const { data: session, update } = useSession();
  const {
    data: influencer,
    isLoading: isLoadingInfluencer,
    mutate: refreshInfluencer,
  } = useSWRImmutable<IInfluencer>('/Influencer', session?.user.role === ERole.Influencer ? fetcher : null);
  const {
    data: brand,
    isLoading: isLoadingBrand,
    mutate: refreshBrand,
  } = useSWRImmutable<IBrand>('/Brand', session?.user.role === ERole.Brand ? fetcher : null);

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
      refreshBrand();
      refreshInfluencer();
      const handler = setInterval(() => refreshTokenIfNeeded(user), 60_000);

      return () => clearInterval(handler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.accessToken]);

  return (
    <AuthContext.Provider
      value={{
        session,
        update,
        isLoading: isLoadingInfluencer || isLoadingBrand,
        influencer,
        brand,
        refreshInfluencer,
        refreshBrand,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
