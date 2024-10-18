import InfluencerList from '@/components/influencer-list';
import { Button } from '@/components/ui/button';
import config from '@/config';
import Link from 'next/link';
import HowItWork from './how-it-work';
import Banner from './banner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  openGraph: {
    description: 'Marketing những người sáng tạo nội dung một cách dễ dàng và chuyên nghiệp',
    type: 'website',
    siteName: 'adfusion',
  },
};

const Home = () => {
  return (
    <div className="container my-16 space-y-20">
      <div className="mx-auto max-w-4xl text-center group">
        <h1 className="text-4xl text-gradient font-bold">Nền tảng Influencer Marketing</h1>
        <p className="text-muted-foreground mt-3 mb-8">
          Tìm và thuê những người có ảnh hưởng hàng đầu trên Instagram, TikTok và Youtube để tạo nội dung độc đáo cho
          thương hiệu của bạn
        </p>
        <div className="flex max-md:flex-col items-center justify-center gap-8">
          <Button size="large" variant="gradient" className="h-16 px-12 text-lg rounded-full" asChild>
            <Link href={config.routes.influencer.base}>Trở thành nhà sáng tạo</Link>
          </Button>
          <div className="border h-0 md:h-12 w-48 md:w-px"></div>
          <Button size="large" variant="gradient" className="h-16 px-12 text-lg rounded-full" asChild>
            <Link href={config.routes.brand.landing}>Trở thành nhãn hàng</Link>
          </Button>
        </div>
      </div>
      <InfluencerList title="Nổi bật" subtitle="Thuê những người có ảnh hưởng hàng đầu trên tất cả nền tảng" />
      <InfluencerList title="Instagram" subtitle="Thuê những người có ảnh hưởng trên Instagram" />
      <InfluencerList title="TikTok" subtitle="Thuê những người có ảnh hưởng trên TikTok" />

      <HowItWork />
      <Banner />
    </div>
  );
};

export default Home;
