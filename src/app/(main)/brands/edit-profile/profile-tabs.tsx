'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IdCardIcon } from '@radix-ui/react-icons';
import { FaNetworkWired, FaRegImages } from 'react-icons/fa6';
import Details from './details';
import Images from './images';
import SocialMedias from './social-medias';
import IBrand from '@/types/brand';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';

const initBrand: IBrand = {
  id: '',
  userId: '',
  name: '',
  address: '',
  isPremium: false,
  avatar: '',
  coverImg: '',
  description: '',
  createdAt: new Date(),
  modifiedAt: new Date(),
  websiteUrl: '',
  facebookUrl: '',
  tiktokUrl: '',
  instagramUrl: '',
  youtubeUrl: '',
};

const ProfileTabs = () => {
  const { data: brand, isLoading, mutate } = useSWRImmutable<IBrand>('/Brand', fetcher);

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
          <span className="max-md:hidden ml-2">Ảnh</span>
        </TabsTrigger>
        <TabsTrigger value="socialMedias" className="flex-1 py-3">
          <FaNetworkWired />
          <span className="max-md:hidden ml-2">Mạng xã hội</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <Details brand={brand || initBrand} mutate={mutate} />
      </TabsContent>
      <TabsContent value="images">
        <Images brand={brand || initBrand} mutate={mutate} />
      </TabsContent>
      <TabsContent value="socialMedias">
        <SocialMedias brand={brand || initBrand} mutate={mutate} />
      </TabsContent>
    </Tabs>
  );
};
export default ProfileTabs;
