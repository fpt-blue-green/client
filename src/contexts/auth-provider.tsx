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
import { usePathname, useRouter } from 'next/navigation';
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
  influencer?: IInfluencer | null;
  brand?: IBrand | null;
  refreshInfluencer: KeyedMutator<IInfluencer | null>;
  refreshBrand: KeyedMutator<IBrand | null>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const RefreshProvider: FC<Readonly<AuthProviderProps>> = ({ children }) => {
  const { data: session, update } = useSession();
  const {
    data: influencer,
    isLoading: isLoadingInfluencer,
    mutate: refreshInfluencer,
  } = useSWRImmutable<IInfluencer | null>(session?.user.role === ERole.Influencer ? '/Influencer' : null, fetcher);
  const {
    data: brand,
    isLoading: isLoadingBrand,
    mutate: refreshBrand,
  } = useSWRImmutable<IBrand | null>(session?.user.role === ERole.Brand ? '/Brand' : null, fetcher);

  const sessionFlag = useRef(true);
  const router = useRouter();
  const pathname = usePathname();

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

  // Lập lịch để thực hiện refresh token
  useEffect(() => {
    const user = session?.user;

    if (user) {
      // refresh token khi user được lưu trong cookie và app được chạy lần đầu
      if (sessionFlag.current) {
        refreshTokenIfNeeded(user);
        sessionFlag.current = false;
        refreshBrand();
        refreshInfluencer();
      }
      const handler = setInterval(() => refreshTokenIfNeeded(user), 60_000);

      return () => clearInterval(handler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.accessToken]);

  // Chuyển trang nếu cần thiết
  useEffect(() => {
    const user = session?.user;

    if (user && !sessionFlag.current) {
      switch (user.role) {
        case ERole.Admin:
          if (!pathname.startsWith(config.routes.admin.base)) {
            router.push(config.routes.admin.base);
          }
          break;
        case ERole.Influencer:
          if (!isLoadingInfluencer) {
            if (influencer) {
              if (!influencer.isPublish) {
                let step = 1;
                if (!influencer.avatar) step = 2;
                else if (!influencer.channels.length) step = 3;
                else if (!influencer.tags.length) step = 4;
                else if (!influencer.images.length) step = 5;
                else if (!influencer.packages.length) step = 6;
                else if (!influencer.phone) step = 7;
                router.push(config.routes.influencer.create(step));
              }
            } else if (influencer === null) {
              router.push(config.routes.influencer.create(1));
            }
          }
          break;
        case ERole.Brand:
          if (!isLoadingBrand) {
            if (brand === null) {
              router.push(config.routes.brand.create(1));
            }
          }
          break;
        default:
          break;
      }
    }
  }, [pathname, session, influencer, brand, isLoadingBrand, isLoadingInfluencer, router]);

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
