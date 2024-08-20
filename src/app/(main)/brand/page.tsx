import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import TypingText from './typing-text';
import Image from 'next/image';
import Banner from '../(home)/banner';
import Link from 'next/link';
import config from '@/config';

export const metadata: Metadata = {
  title: 'Trở thành nhãn hàng',
  description: 'Cách dễ dàng để tạo những hình ảnh sản phẩm, bài viết được tài trợ, lời chứng thực và video quảng cáo.',
};

const JoinAsBrand = () => {
  return (
    <div className="container my-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-semibold">
          Cách dễ dàng để tạo
          <br />
          <TypingText />
        </h1>
        <p className="text-sm text-muted-foreground mt-3 mb-7">
          Tìm những người có ảnh hưởng, chạy chiến dịch và nhận nội dung độc đáo cho thương hiệu của bạn chỉ trong vài
          giây.
        </p>
        <Button size="large" variant="gradient" className="px-12 h-12" asChild>
          <Link href={config.routes.brand.register}>Bắt đầu miễn phí</Link>
        </Button>
      </div>
      <div className="grid lg:grid-cols-7 grid-cols-1 items-center mt-20 gap-12">
        <div className="lg:col-span-4 lg:order-last">
          <Image
            src="https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/brandPage/marketplace.png"
            alt="Thị trường"
            width={1601}
            height={1063}
            className="w-full"
          />
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-3xl font-semibold mb-8">
            Tìm và thuê những người có ảnh hưởng trong vài giây trên thị trường
          </h3>
          <div className="space-y-6">
            <div>
              <h5 className="text-xl font-semibold mb-2">Tìm kiếm Influencers</h5>
              <p className="text-muted-foreground">
                Tìm kiếm hàng nghìn người có ảnh hưởng trên Instagram, TikTok và Youtube đã được kiểm định.
              </p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-2">Thanh toán bảo mật</h5>
              <p className="text-muted-foreground">
                Mua hàng an toàn thông qua AdFusion. Chúng tôi giữ khoản thanh toán của bạn cho đến khi công việc hoàn
                thành.
              </p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-2">Nhận nội dung chất lượng</h5>
              <p className="text-muted-foreground">
                Nhận nội dung chất lượng cao của bạn từ những người có ảnh hưởng trực tiếp thông qua nền tảng.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-7 grid-cols-1 items-center mt-20 gap-12">
        <div className="lg:col-span-4">
          <Image
            src="https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/brandPage/campaignApply.png"
            alt="Thị trường"
            width={1607}
            height={1063}
            className="w-full"
          />
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-3xl font-semibold mb-8">
            Tiết kiệm thời gian với các chiến dịch và làm việc với những người có ảnh hưởng trên quy mô lớn
          </h3>
          <div className="space-y-6">
            <div>
              <h5 className="text-xl font-semibold mb-2">Đăng chiến dịch</h5>
              <p className="text-muted-foreground">
                Tập trung hình ảnh, yêu cầu, ví dụ nội dung, v.v. trong bản tóm tắt chiến dịch.
              </p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-2">Đặt mục tiêu</h5>
              <p className="text-muted-foreground">
                Chỉ định nhân khẩu học bao gồm vị trí thích hợp, vị trí và quy mô theo dõi của những người có ảnh hưởng
                mà bạn muốn nhắm mục tiêu.
              </p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-2">Người có ảnh hưởng áp dụng</h5>
              <p className="text-muted-foreground">
                Những người có ảnh hưởng được nhắm đến có thể áp dụng mức giá của họ và bạn có thể chọn người để làm
                việc cùng.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-7 grid-cols-1 items-center mt-20 gap-12">
        <div className="lg:col-span-4 lg:order-last">
          <Image
            src="https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/tracking/tracking.png"
            alt="Theo dõi"
            width={1607}
            height={1063}
            className="w-full"
          />
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-3xl font-semibold mb-8">Theo dõi và phân tích bài đăng theo thời gian thực</h3>
          <div className="space-y-6">
            <div>
              <h5 className="text-xl font-semibold mb-2">Theo dõi bằng một cú nhấp chuột</h5>
              <p className="text-muted-foreground">
                Theo dõi nội dung Instagram, TikTok và YouTube trong thời gian thực từ một trang tổng quan duy nhất. Nói
                lời tạm biệt với bảng tính lộn xộn và theo dõi thủ công.
              </p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-2">Phân tích & Báo cáo nâng cao</h5>
              <p className="text-muted-foreground">
                Tất cả các số liệu chính của bạn ở một nơi. Sắp xếp hiệu suất theo chiến dịch, xem biểu đồ chi tiết về
                hiệu suất nội dung theo thời gian và dễ dàng tạo báo cáo.
              </p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-2">Hoàn toàn tự động</h5>
              <p className="text-muted-foreground">
                Chúng tôi cập nhật hiệu suất nội dung của bạn 24 giờ một lần, giúp bạn sẵn sàng xem chỉ bằng một cú nhấp
                chuột.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Banner />
      </div>
    </div>
  );
};

export default JoinAsBrand;
