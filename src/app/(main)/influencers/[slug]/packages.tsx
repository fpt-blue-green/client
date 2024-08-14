import { Button } from '@/components/ui/button';
import { LuFacebook, LuInstagram } from 'react-icons/lu';
import HowPackagesWork from './how-packages-work-modal';
import { formats } from '@/lib/utils';

const Packages = () => {
  return (
    <div className="container ">
      <div className="flex items-center space-x-3 mt-16 mb-8 relative">
        <h3 className="font-bold text-2xl">Các Gói</h3>
        <HowPackagesWork />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-muted-foreground border-2 px-6 py-4 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xl">1 Bài đăng ảnh lên Instagram</span>
            <span className="font-semibold text-xl">{formats.price(650000)}</span>
          </div>
          <div className="flex items-center justify-between mt-8">
            <LuInstagram className="size-6" />
            <Button className="text-xl py-6 px-10" variant={'gradient'}>
              Tiếp tục
            </Button>
          </div>
        </div>
        <div className="border-muted-foreground border-2 px-6 py-4 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xl">2 Bài đăng ảnh lên FaceBook</span>
            <span className="font-semibold text-xl">{formats.price(1200000)}</span>
          </div>
          <div className="flex items-center justify-between mt-8">
            <LuFacebook className="size-6" />
            <Button className="text-xl py-6 px-10" variant={'gradient'}>
              Tiếp tục
            </Button>
          </div>
        </div>
        <div className="border-muted-foreground border-2 px-6 py-4 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xl">2 Bài đăng ảnh lên Instagram</span>
            <span className="font-semibold text-xl">{formats.price(1100000)}</span>
          </div>
          <div className="flex items-center justify-between mt-8">
            <LuInstagram className="size-6" />
            <Button className="text-xl py-6 px-10" variant={'gradient'}>
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
      <div className="border-muted-foreground border-2 px-6 py-4 rounded-sm max-w-[600px] mt-6">
        <div className="flex items-center justify-between space-x-2">
          <h4 className="font-semibold text-[18px] flex-2">Có yêu cầu nào chưa được đề xuất không?</h4>
          <Button className="text-xl py-5 flex-1" variant={'gradient'}>
            Gửi Đề Xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
