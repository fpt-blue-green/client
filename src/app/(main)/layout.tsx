import { FC, ReactNode } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import IInfluencer from '@/types/influencer';
import { influencerRequest } from '@/request';
import { redirect } from 'next/navigation';
import config from '@/config';

const getInfluencer = async (): Promise<IInfluencer | undefined | null> => {
  try {
    const res = await influencerRequest.me();
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
}

const MainLayout: FC<Readonly<MainLayoutProps>> = async ({ children }) => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
