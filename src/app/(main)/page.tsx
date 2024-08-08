import InfluencerCard from '@/components/influencer-card';

const Home = () => {
  return (
    <div className="container">
      <div className="space-y-8 py-12 mx-auto max-w-4xl text-center group">
        <h1 className="text-4xl text-gradient font-bold">Nền tảng Influencer Marketing</h1>
        <p className="text-muted-foreground">
          Tìm và thuê những người có ảnh hưởng hàng đầu trên Instagram, TikTok và Youtube để tạo nội dung độc đáo cho
          thương hiệu của bạn
        </p>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <InfluencerCard />
      </div>
    </div>
  );
};

export default Home;
