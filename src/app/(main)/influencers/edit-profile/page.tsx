import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import config from '@/config';
import Link from 'next/link';
import { influencerRequest } from '@/request';
import IInfluencer from '@/types/influencer';
import ProfileTabs from './profile-tabs';

const getInfluencer = async (): Promise<IInfluencer | undefined> => {
  const res = await influencerRequest.me();
  return res.data;
};

const EditInfluencerProfile = async () => {
  const influencer = await getInfluencer();

  return (
    <div className="container mt-8 mb-16">
      <Button size="medium" variant="ghost" asChild startIcon={<ArrowLeftIcon />}>
        <Link href={config.routes.home} className="flex items-center">
          Trở về trang chủ
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold mt-6 mb-12 text-center md:text-start">Chỉnh Sửa Thông Tin</h1>
      <ProfileTabs />
    </div>
  );
};

export default EditInfluencerProfile;
