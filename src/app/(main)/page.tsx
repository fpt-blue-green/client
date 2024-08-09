import InfluencerList from '@/components/influencer-list';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="container">
      <div className="py-12 mx-auto max-w-4xl text-center group">
        <h1 className="text-4xl text-gradient font-bold">Nền tảng Influencer Marketing</h1>
        <p className="text-muted-foreground mt-3 mb-8">
          Tìm và thuê những người có ảnh hưởng hàng đầu trên Instagram, TikTok và Youtube để tạo nội dung độc đáo cho
          thương hiệu của bạn
        </p>
      </div>
      <InfluencerList
        title="Nổi bật"
        subtitle="Thuê những người có ảnh hưởng hàng đầu trên tất cả nền tảng"
        className="mb-20"
      />
      <InfluencerList title="Instagram" subtitle="Thuê những người có ảnh hưởng trên Instagram" className="mb-20" />
      <InfluencerList title="TikTok" subtitle="Thuê những người có ảnh hưởng trên TikTok" className="mb-20" />
      <div
        className="bg-no-repeat bg-cover bg-center rounded-3xl overflow-hidden mb-20"
        style={{
          backgroundImage: 'url(https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/cta.png)',
        }}
      >
        <div className="flex flex-col items-center justify-center gap-6 w-full py-20 bg-foreground/50 text-background">
          <h5 className="text-4xl font-semibold">Tìm và thuê người ảnh hưởng</h5>
          <p>Tìm kiếm những người có sức ảnh hưởng trên Instagram, TikTok, YouTube.</p>
          <Button variant="secondary" className="h-16 px-12 text-lg">
            Bắt đầu tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
