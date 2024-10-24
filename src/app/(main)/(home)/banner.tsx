import { Button } from '@/components/ui/button';
import config from '@/config';
import Link from 'next/link';

const Banner = () => {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center rounded-3xl overflow-hidden mb-20"
      style={{
        backgroundImage: 'url(https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/cta.png)',
      }}
    >
      <div className="flex flex-col items-center justify-center gap-6 w-full py-20 bg-foreground/50 text-background text-center">
        <h5 className="text-4xl font-semibold">Tìm và thuê người ảnh hưởng</h5>
        <p>Tìm kiếm những người có sức ảnh hưởng trên Instagram, TikTok, YouTube.</p>
        <Button variant="secondary" className="h-16 px-12 text-lg" asChild>
          <Link href={config.routes.influencers.list}>Bắt đầu tìm kiếm</Link>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
