import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';

const BrandDetails = () => {
  return (
    <div className="container my-8">
      <div className="flex justify-end mb-4">
        <Button variant="ghost" startIcon={<FaEdit />}>
          Chỉnh sửa
        </Button>
      </div>
      <div className="relative flex flex-col items-center mb-12">
        <Image
          className="w-full max-h-[480px] object-cover cursor-pointer hover:opacity-80 rounded-md"
          src="https://d5ik1gor6xydq.cloudfront.net/buyers/194517/17268433977072098.webp"
          alt="Brand_Avatar"
          width={800}
          height={400}
        />
        <div className="absolute -bottom-12 z-10 rounded-full h-32 w-32 bg-primary-foreground flex justify-center items-center ">
          <Image
            src="https://img.freepik.com/premium-photo/boy-with-anime-character-his-hoodie_662214-103222.jpg"
            alt="Brand_avatar"
            width={100}
            height={100}
            className="w-28 h-28 rounded-full"
          />
        </div>
      </div>
      <div>
        <h5 className="text-center font-semibold text-xl">Mr Willson</h5>
        <p className="mt-3 font-light text-sm text-center md:text-start">
          Phần mô tả và hình ảnh chất lượng, cùng với những kênh mạng xã hội phổ biến sẽ mang lại kết quả gấp 3 lần
          trong việc tìm kiếm và kết hợp với các nhà sáng tạo.
          <Button className="font-semibold text-md text-foreground underline" variant="link">
            Hoàn thành hồ sơ ngay.
          </Button>
        </p>
      </div>
      <div className="relative">
        <h2 className="mt-10 mb-4 text-xl font-semibold">Chiến dịch của bạn</h2>
        <Link href={''} target="_blank">
          <Image
            className="w-full md:w-1/2 max-h-[300px] object-cover rounded-sm ease-out duration-300"
            src="https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/noPic.png"
            alt="Brand_Campaign"
            width={400}
            height={200}
          />
          <p className="absolute bottom-2 left-2 text-primary-foreground">In-progress</p>
        </Link>
      </div>
      <div>
        <h2 className="mt-10 mb-4 text-xl font-semibold">Lượt đánh giá</h2>
        <p className="text-sm font-light">Bạn chưa có lượt đánh giá nào.</p>
      </div>
    </div>
  );
};

export default BrandDetails;
