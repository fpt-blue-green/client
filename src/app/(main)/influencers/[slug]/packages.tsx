import { Button } from '@/components/ui/button';
import { LuFacebook, LuInstagram } from 'react-icons/lu';
import HowPackagesWork from './how-packages-work-modal';
import { formats } from '@/lib/utils';

const Packages = () => {
  return (
    <div className="mt-16">
      <div className="relative flex items-center space-x-3 mb-8">
        <h3 className="font-semibold text-2xl">Gói</h3>
        <HowPackagesWork />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-muted-foreground border-2 px-6 py-4 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">1 Bài đăng ảnh lên Instagram</span>
            <span className="font-semibold text-lg">{formats.price(650000)}</span>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">
            Với gói này tôi sẽ đăng 1 bức ảnh giới thiệu sản phẩm của nhãn hàng tới những khán giả của mình.
          </p>
          <div className="flex items-center justify-between mt-8">
            <LuInstagram className="size-6" />
            <Button variant="gradient" size="large" className="text-base">
              Tiếp tục
            </Button>
          </div>
        </div>
        <div className="border-muted-foreground border-2 px-6 py-4 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">1 Bài đăng ảnh lên Instagram</span>
            <span className="font-semibold text-lg">{formats.price(650000)}</span>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">
            Với gói này tôi sẽ đăng 1 bức ảnh giới thiệu sản phẩm của nhãn hàng tới những khán giả của mình.
          </p>
          <div className="flex items-center justify-between mt-8">
            <LuInstagram className="size-6" />
            <Button variant="gradient" size="large" className="text-base">
              Tiếp tục
            </Button>
          </div>
        </div>
        <div className="border-muted-foreground border-2 px-6 py-4 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">2 Bài đăng ảnh lên FaceBook</span>
            <span className="font-semibold text-lg">{formats.price(650000)}</span>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">
            Với gói này tôi sẽ đăng 2 bức ảnh giới thiệu sản phẩm của nhãn hàng tới những khán giả của mình.
          </p>
          <div className="flex items-center justify-between mt-8">
            <LuFacebook className="size-6" />
            <Button variant="gradient" size="large" className="text-base">
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
      <div className="border-muted-foreground border-2 px-6 py-4 rounded-sm max-w-3xl mt-6">
        <div className="flex items-center justify-between space-x-2">
          <h4 className="font-semibold text-lg">Có yêu cầu nào chưa được đề xuất không?</h4>
          <Button variant="gradient" size="large" className="text-base">
            Gửi Đề Xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
