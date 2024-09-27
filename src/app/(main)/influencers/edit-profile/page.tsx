import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import config from '@/config';
import Link from 'next/link';
import { influencerRequest } from '@/request';
import IInfluencer from '@/types/influencer';
import ProfileTabs from './profile-tabs';
import { Metadata } from 'next';

const getInfluencer = async (): Promise<IInfluencer | undefined> => {
  const res = await influencerRequest.me();
  return res.data;
};

export const metadata: Metadata = {
  title: 'Chỉnh sửa thông tin cá nhân',
};

const EditInfluencerProfile = async () => {
  const influencer = await getInfluencer();

  return (
    <div className="container mt-8 mb-16">
      {influencer && (
        <Button size="medium" variant="secondary" asChild startIcon={<ArrowLeftIcon />}>
          <Link href={config.routes.influencers.details(influencer.slug)} className="flex items-center">
            Trở về trang cá nhân
          </Link>
        </Button>
      )}
      <h1 className="text-2xl font-semibold mt-6 mb-12 text-center md:text-start">Chỉnh Sửa Thông Tin</h1>
      <ProfileTabs />
    </div>
  );
};

export default EditInfluencerProfile;
