'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IdCardIcon } from '@radix-ui/react-icons';
import { FaNetworkWired, FaRegImages } from 'react-icons/fa6';
import Details from './details';

const ProfileTabs = () => {
  // const { data: influencer, isLoading, mutate } = useSWRImmutable<IInfluencer>('/Brand', fetcher);

  return (
    // <div className="flex flex-col gap-8">
    //   <Skeleton className="h-11" />
    //   <Skeleton className="h-40" />
    // </div>
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
      </TabsList>
      <TabsContent value="details">
        <Details />
      </TabsContent>
      <TabsContent value="images">{/* <ImageGallery influencer={influencer} mutate={mutate} /> */}</TabsContent>
      <TabsContent value="socialMedias">{/* <SocialMedias influencer={influencer} mutate={mutate} /> */}</TabsContent>
    </Tabs>
  );
};
export default ProfileTabs;
