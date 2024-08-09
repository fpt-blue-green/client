import Image from 'next/image';
import { LuBadgeDollarSign, LuCheck, LuLock, LuMessageSquare } from 'react-icons/lu';

const HowItWork = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold">AdFusion hoạt động như thế nào</h3>
      <h4 className="mt-1 text-sm">Mọi thứ bạn cần để chạy các chiến dịch với người có ảnh hưởng và hơn thế nữa</h4>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-12 mt-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/step1.png"
            alt="Bước 1"
            width={800}
            height={450}
            className="aspect-video object-cover w-full"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-b from-black/20 from-10% to-black text-white">
            <div className="p-3">
              <h6 className="text-xl font-semibold">1. Tìm Influencers phù hợp</h6>
              <p className="mt-1 text-sm">
                Tìm kiếm thông qua hàng nghìn người có ảnh hưởng trên Instagram, TikTok và YouTube đã được kiểm duyệt
              </p>
            </div>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/step2.png"
            alt="Bước 2"
            width={800}
            height={450}
            className="aspect-video object-cover w-full"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-b from-black/20 from-10% to-black text-white">
            <div className="p-3">
              <h6 className="text-xl font-semibold">2. Thanh toán an toàn</h6>
              <p className="mt-1 text-sm">Chúng tôi giữ khoản thanh toán của bạn cho đến khi công việc hoàn thành.</p>
            </div>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/step3.png"
            alt="Bước 3"
            width={800}
            height={450}
            className="aspect-video object-cover w-full"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-b from-black/20 from-10% to-black text-white">
            <div className="p-3">
              <h6 className="text-xl font-semibold">3. Nhận nội dung chất lượng</h6>
              <p className="mt-1 text-sm">
                Nhận nội dung chất lượng cao của bạn từ những Influencers trực tiếp thông qua nền tảng.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mt-8 px-4">
        <div className="flex flex-col gap-2 items-center text-center">
          <div className="p-4 bg-gradient text-primary-foreground shadow-md rounded-full text-xl">
            <LuBadgeDollarSign />
          </div>
          <h6 className="text-xl font-semibold">Không có chi phí trả trước</h6>
          <p className="text-muted-foreground text-sm">
            Tìm kiếm người có ảnh hưởng miễn phí. Không có đăng ký, hợp đồng hoặc phí ẩn
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center text-center">
          <div className="p-4 bg-gradient text-primary-foreground shadow-md rounded-full text-xl">
            <LuCheck />
          </div>
          <h6 className="text-xl font-semibold">Influencer được kiểm định</h6>
          <p className="text-muted-foreground text-sm">
            Mọi Influencer đều được chúng tôi xem xét kỹ lưỡng. Luôn nhận được nội dung chất lượng cao, chuyên nghiệp
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center text-center">
          <div className="p-4 bg-gradient text-primary-foreground shadow-md rounded-full text-xl">
            <LuMessageSquare />
          </div>
          <h6 className="text-xl font-semibold">Trò chuyện tức thời</h6>
          <p className="text-muted-foreground text-sm">
            Trò chuyện, gọi điện hoặc meeting ngay lập tức với những người có ảnh hưởng và giữ liên lạc trong toàn bộ
            giao dịch
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center text-center">
          <div className="p-4 bg-gradient text-primary-foreground shadow-md rounded-full text-xl">
            <LuLock />
          </div>
          <h6 className="text-xl font-semibold">Thanh toán bảo mật</h6>
          <p className="text-muted-foreground text-sm">
            Tiền của bạn được giữ an toàn cho đến khi bạn chấp thuận công việc của người của Influencer
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
