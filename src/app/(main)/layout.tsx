import { FC, ReactNode } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import IInfluencer from '@/types/influencer';
import { influencerRequest } from '@/request';
import { redirect } from 'next/navigation';
import config from '@/config';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { ERole } from '@/types/enum';

const getInfluencer = async (): Promise<IInfluencer | undefined | null> => {
  try {
    const res = await influencerRequest.me(true);
    if (!res.data) {
      return null;
    }
    return res.data;
  } catch {
    return undefined;
  }
};

interface MainLayoutProps {
  children: ReactNode;
  admin: ReactNode;
}

const MainLayout: FC<Readonly<MainLayoutProps>> = async ({ admin, children }) => {
  const session = await getServerSession(authOptions);

  if (session) {
    const { user } = session;
    if (user.role === ERole.Influencer) {
      const influencer = await getInfluencer();

      if (influencer) {
        if (!influencer.isPublish) {
          let step = 1;
          if (!influencer.avatar) step = 2;
          else if (!influencer.channels.length) step = 3;
          else if (!influencer.tags.length) step = 4;
          else if (!influencer.images.length) step = 5;
          else if (!influencer.packages.length) step = 6;
          else if (!influencer.phone) step = 7;
          redirect(config.routes.influencer.create(step));
        }
      } else if (influencer === null) {
        redirect(config.routes.influencer.create(1));
      }
    }
  }

  return (
    <>
      {session?.user.role === ERole.Admin ? (
        admin
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 md:pt-20 pt-16">{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default MainLayout;
