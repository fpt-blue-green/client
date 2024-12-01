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
    <>
      <div className="relative h-screen -mt-20">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src="/assets/videos/homepage.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-zinc-900/80"></div>
        <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 text-white">
          <div className="container">
            <div className="md:w-2/3 px-5 space-y-7 max-md:text-center">
              <h1 className="md:text-5xl text-4xl font-bold !leading-tight">
                Nền tảng tiếp thị{' '}
                <em
                  style={{
                    WebkitTextStrokeWidth: '0.025em',
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStrokeColor: 'currentcolor',
                  }}
                >
                  người sáng tạo
                </em>{' '}
                và <em className="bg-gradient">người ảnh hưởng </em>miễn phí và dễ dàng
              </h1>
              <p className="text-lg max-md:hidden">
                Tìm và thuê những người có ảnh hưởng hàng đầu trên Instagram, TikTok và Youtube để tạo nội dung độc đáo
                cho thương hiệu của bạn
              </p>
              <div className="flex max-lg:flex-col items-center max-lg:justify-center gap-8">
                <Button size="large" variant="gradient" className="h-12 px-8 text-base rounded-full" asChild>
                  <Link href={config.routes.influencer.landing}>Trở thành nhà sáng tạo</Link>
                </Button>
                <div className="border h-0 lg:h-12 w-48 lg:w-px"></div>
                <Button size="large" variant="gradient" className="h-12 px-8 text-base rounded-full" asChild>
                  <Link href={config.routes.brand.landing}>Trở thành nhãn hàng</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-8 mb-16 space-y-20">
        <InfluencerList
          url="/Influencers/top"
          title="Nổi bật"
          subtitle="Thuê những người có ảnh hưởng hàng đầu trên tất cả nền tảng"
        />
        <InfluencerList
          url="/Influencers/top/tiktok"
          title="TikTok"
          subtitle="Thuê những người có ảnh hưởng trên TikTok"
        />

        <HowItWork />
        <InfluencerList
          url="/Influencers/top/instagram"
          title="Instagram"
          subtitle="Thuê những người có ảnh hưởng trên Instagram"
        />
        <InfluencerList
          url="/Influencers/top/youtube"
          title="YouTube"
          subtitle="Thuê những người có ảnh hưởng trên YouTube"
        />
        <Banner />
      </div>
    </>
  );
};

export default Home;
