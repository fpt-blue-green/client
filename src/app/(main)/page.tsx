import InfluencerList from '@/components/influencer-list';

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
    </div>
  );
};

export default Home;
