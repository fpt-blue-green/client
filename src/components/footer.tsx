import config from '@/config';
import { LuFacebook, LuInstagram, LuMail, LuPhone, LuYoutube } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiTiktokLine } from 'react-icons/ri';
import Tooltip from '@/components/custom/tooltip';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="border-t pt-16">
      <div className="container">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-8 text-sm">
          <div className="lg:col-span-2 md:col-span-3 max-lg:items-center max-lg:text-center flex flex-col gap-4">
            <div>
              <Link href={config.routes.home} className="relative inline-block font-bold text-lg">
                adfusion
                <Image
                  src="/logo.png"
                  alt="adfusion"
                  className="absolute -top-0.5 left-full size-6"
                  width={200}
                  height={200}
                />
              </Link>
            </div>
            <p className="text-muted-foreground">
              AdFusion kết nối những người có ảnh hưởng với thương hiệu để cộng tác quảng cáo hiệu quả. Hợp lý hóa các
              chiến dịch của bạn và tối đa hóa ROI với chúng tôi.
            </p>
            <div className="flex items-center gap-2">
              <LuPhone className="size-5" />
              <Link href="tel:0123456789">0123 456 789</Link>
            </div>
            <div className="flex items-center gap-2">
              <LuMail className="size-5" />
              <Link href="mailto:adfusion.support@hotmail.com">adfusion.support@hotmail.com</Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 max-md:items-center">
            <h6 className="font-bold text-base">Tài nguyên</h6>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Blog
              </Link>
            </div>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Chương trình liên kết
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 max-md:items-center">
            <h6 className="font-bold text-base">Công cụ</h6>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Phân tích và theo dõi Influencers
              </Link>
            </div>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Máy tính giá Influencers
              </Link>
            </div>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Trình tải Instagram reels
              </Link>
            </div>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Trình tải TikTok video
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 max-md:items-center">
            <h6 className="font-bold text-base">Khám phá</h6>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Tìm kiếm Influencers
              </Link>
            </div>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Top Influencers
              </Link>
            </div>
            <div>
              <Link className="text-muted-foreground hover:underline" href="">
                Influencers tags
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 my-8 max-md:flex-col">
          <p className="text-sm text-muted-foreground">Copyright &copy; 2024 adfusion by BlueGreen</p>
          <div className="flex items-center gap-2">
            <Tooltip label="Facebook">
              <Button variant="ghost" size="icon">
                <LuFacebook size={20} />
              </Button>
            </Tooltip>
            <Tooltip label="Youtube">
              <Button variant="ghost" size="icon">
                <LuYoutube size={20} />
              </Button>
            </Tooltip>
            <Tooltip label="Instagram">
              <Button variant="ghost" size="icon">
                <LuInstagram size={20} />
              </Button>
            </Tooltip>
            <Tooltip label="TikTok">
              <Button variant="ghost" size="icon">
                <RiTiktokLine size={20} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
