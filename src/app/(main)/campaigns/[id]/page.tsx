import { campaignsRequest } from '@/request';
import ICampaign from '@/types/campaign';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import ImagesCarousel from './images-carousel';

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

const CampaignDetails: FC<CampaignDetailsProps> = async ({ params }) => {
  return (
    <div className="container mt-8 mb-16">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="">
          <ImagesCarousel />
        </div>
      </div>
    </div>
  );
};
export default CampaignDetails;
