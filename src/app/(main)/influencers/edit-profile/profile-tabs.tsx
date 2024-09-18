'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IdCardIcon } from '@radix-ui/react-icons';
import { FaBox, FaNetworkWired, FaRegImages } from 'react-icons/fa6';
import ImageGallery from './images';
import Details from './details';
import Packages from './packages';
import SocialMedias from './social-medias';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import IInfluencer from '@/types/influencer';

const ProfileTabs = () => {
  const { data: influencer, mutate } = useSWRImmutable<IInfluencer>('/Influencer', fetcher);

  if (!influencer) return;

  return (
    <Tabs defaultValue="details">
      <TabsList className="h-13 mb-8 flex flex-wrap">
        <TabsTrigger value="details" className="flex-1 py-3">
          <IdCardIcon />
          <span className="max-md:hidden ml-2">Chi tiết</span>
        </TabsTrigger>
        <TabsTrigger value="images" className="flex-1 py-3">
          <FaRegImages />
          <span className="max-md:hidden ml-2">Thư viện ảnh</span>
        </TabsTrigger>
        <TabsTrigger value="socialMedias" className="flex-1 py-3">
          <FaNetworkWired />
          <span className="max-md:hidden ml-2">Mạng xã hội</span>
        </TabsTrigger>
        <TabsTrigger value="packages" className="flex-1 py-3">
          <FaBox />
          <span className="max-md:hidden ml-2">Các gói</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <Details influencer={influencer} mutate={mutate} />
      </TabsContent>
      <TabsContent value="images">
        <ImageGallery influencer={influencer} mutate={mutate} />
      </TabsContent>
      <TabsContent value="socialMedias">
        <SocialMedias influencer={influencer} mutate={mutate} />
      </TabsContent>
      <TabsContent value="packages">
        <Packages influencer={influencer} mutate={mutate} />
      </TabsContent>
    </Tabs>
  );
};
export default ProfileTabs;
