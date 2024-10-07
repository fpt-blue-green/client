import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import config from '@/config';
import Link from 'next/link';
import { Metadata } from 'next';
import CampaignTabs from './campaign-tabs';

export const metadata: Metadata = {
  title: 'Chỉnh sửa thông tin chiến dịch',
  description: 'Nhập thông tin chi tiết để người dùng có thể tìm hiểu thêm về chiến dịch của bạn',
};

const EditCampaign = async () => {
  return (
    <div className="container mt-8 mb-16">
      <Button variant="secondary" asChild startIcon={<ArrowLeftIcon />}>
        <Link href={config.routes.brands.details('Willson')} className="flex items-center">
          Trở về chiến dịch
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold mt-6 mb-12 text-center md:text-start">Cập nhật chiến dịch của bạn </h1>
      <CampaignTabs params={{ id: '10' }} />
    </div>
  );
};

export default EditCampaign;
