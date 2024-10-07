'use client';

import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IdCardIcon } from '@radix-ui/react-icons';
import { FaNetworkWired, FaRegImages } from 'react-icons/fa6';
import ICampaign from '@/types/campaign';
import { notFound } from 'next/navigation';
import { campaignsRequest } from '@/request';
import { Metadata } from 'next';
import CampaignTabDetails from './details';

const initCampaign: ICampaign = {
  name: '',
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  budget: 0,
  brandId: '',
  contents: [],
  id: '',
  images: [],
  tags: [],
};

const getCampaign = async (id: string): Promise<ICampaign> => {
  try {
    const res = await campaignsRequest.getCampaignById(id);
    if (!res.data) {
      return notFound();
    }
    return res.data;
  } catch {
    return notFound();
  }
};

interface CampaignDetailsProps {
  params: { id: string };
}

export async function generateMetadata({ params }: CampaignDetailsProps): Promise<Metadata> {
  const campaign = await getCampaign(params.id);
  return {
    title: campaign.title,
  };
}

const CampaignTabs: FC<CampaignDetailsProps> = ({ params }) => {
  const campaign = getCampaign(params.id);

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
          <span className="max-md:hidden ml-2">Nội dung</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <CampaignTabDetails campaign={initCampaign} />
      </TabsContent>
    </Tabs>
  );
};
export default CampaignTabs;
