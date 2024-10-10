import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import config from '@/config';
import Link from 'next/link';
import { Metadata } from 'next';
import ProfileTabs from './profile-tabs';
import IBrand from '@/types/brand';
import { brandRequest } from '@/request';

const getBrand = async (): Promise<IBrand | undefined> => {
  const res = await brandRequest.me();
  return res.data;
};

export const metadata: Metadata = {
  title: 'Tạo thông tin của nhãn hàng',
  description: 'Nhập thông tin chi tiết để người dùng có thể tìm hiểu thêm về thương hiệu của bạn',
};

const EditBrandProfile = async () => {
  const brand = await getBrand();
  return (
    <div className="container mt-8 mb-16">
      {brand && (
        <Button variant="secondary" asChild startIcon={<ArrowLeftIcon />}>
          <Link href={config.routes.brands.details(brand?.id)} className="flex items-center">
            Trở về trang cá nhân
          </Link>
        </Button>
      )}
      <h1 className="text-2xl font-semibold mt-6 mb-12 text-center md:text-start">Chỉnh Sửa Thông Tin</h1>
      <ProfileTabs />
    </div>
  );
};

export default EditBrandProfile;
