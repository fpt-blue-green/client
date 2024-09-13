import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftIcon, IdCardIcon } from '@radix-ui/react-icons';
import { FaBox, FaNetworkWired, FaRegImages } from 'react-icons/fa6';
import Link from 'next/link';
import config from '@/config';
import ImageGallery from './images';
import Details from './details';
import Packages from './packages';
import SocialMedias from './social-medias';
import { influencerRequest } from '@/request';
import IInfluencer from '@/types/influencer';

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
      <Tabs defaultValue="details">
        <TabsList className="h-13 mb-8 flex flex-wrap items-center justify-start">
          <TabsTrigger value="details" className="py-3 px-14 md:px-10">
            <IdCardIcon className="mr-2" />
            Chi tiết
          </TabsTrigger>
          <TabsTrigger value="images" className="py-3 px-10">
            <FaRegImages className="mr-2" />
            Thư viện ảnh
          </TabsTrigger>
          <TabsTrigger value="socialMedias" className="py-3 px-10">
            <FaNetworkWired className="mr-2" />
            Mạng xã hội
          </TabsTrigger>
          <TabsTrigger value="packages" className="py-3 px-14 md:px-10">
            <FaBox className="mr-2" />
            Các gói
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Details influencer={influencer!} />
        </TabsContent>
        <TabsContent value="images">
          <ImageGallery influencer={influencer!} />
        </TabsContent>
        <TabsContent value="socialMedias">
          <SocialMedias />
        </TabsContent>
        <TabsContent value="packages">
          <Packages />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditInfluencerProfile;
