'use client';

import config from '@/config';
import { useAuthUser } from '@/hooks';
import { authRequest } from '@/request';
import { ERole } from '@/types/enum';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const { session, update } = useAuthUser();
  const { method } = useParams<{ method: 'sign-in' | 'sign-up' }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const loginOrRegister = async (session: Session) => {
    const p = searchParams.get('p');

    if (!session.user.accessToken && !!p) {
      const provider = Number(p);

      try {
        const user = await authRequest.login({ email: session.user.email, provider: provider }, navigator.userAgent);
        await update({
          ...session,
          user: user.data,
        });
        router.push(config.routes.home);
      } catch {
        if (method === 'sign-in') {
          signOut({ callbackUrl: config.routes.login + '?e=notRegistered' });
        } else {
          await authRequest.registerOthers({
            email: session.user.email,
            name: session.user.name,
            role: searchParams.get('r') === 'influencer' ? ERole.Influencer : ERole.Brand,
            image: session.user.image,
            accountProvider: provider,
          });

          const registeredUser = await authRequest.login(
            { email: session.user.email, provider: provider },
            navigator.userAgent,
          );
          await update({
            ...session,
            user: registeredUser.data,
          });
          router.push(config.routes.home);
        }
      }
    }
  };

  useEffect(() => {
    if (session) {
      loginOrRegister(session);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="h-screen w-screen bg-background">
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
