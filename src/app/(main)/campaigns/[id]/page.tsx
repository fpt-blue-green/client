import { campaignsRequest } from '@/request';
import ICampaign from '@/types/campaign';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import ImagesCarousel from './images-carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { formats } from '@/lib/utils';
import Contents from './contents';
import { RiFacebookFill, RiInstagramFill, RiLink, RiTiktokFill, RiYoutubeFill } from 'react-icons/ri';

const getCampaign = async (id: string): Promise<ICampaign> => {
  try {
    const res = await campaignsRequest.getCampaignById(id);
    if (!res.data) {
      return notFound();
    }
    return res.data;
  } catch (ex) {
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
  const campaign = await getCampaign(params.id);
  const { websiteUrl, tiktokUrl, youtubeUrl, instagramUrl, facebookUrl } = campaign.brand;

  return (
    <div className="container mt-8 mb-16">
      <div>
        <ImagesCarousel campaign={campaign} />
        <div className="py-4 space-y-6">
          <h1 className="font-bold text-2xl">{campaign.title}</h1>
          <p className="text-muted-foreground">{campaign.description}</p>
          <div className="flex items-center gap-2">
            <Avatar className="size-16">
              <AvatarImage src={campaign.brand.avatar} alt={`Ảnh đại diện của nhãn hàng ${campaign.brand.name}`} />
              <AvatarFallback>${campaign.brand.name}</AvatarFallback>
            </Avatar>
            <div>
              <h5 className="font-semibold">{campaign.brand.name}</h5>
              <div className="flex items-center gap-3 mt-2">
                {websiteUrl && (
                  <Link href={websiteUrl}>
                    <RiLink className="size-5" />
                  </Link>
                )}
                {facebookUrl && (
                  <Link href={facebookUrl}>
                    <RiFacebookFill className="size-5" />
                  </Link>
                )}
                {youtubeUrl && (
                  <Link href={youtubeUrl}>
                    <RiYoutubeFill className="size-5" />
                  </Link>
                )}
                {instagramUrl && (
                  <Link href={instagramUrl}>
                    <RiInstagramFill className="size-5" />
                  </Link>
                )}
                {tiktokUrl && (
                  <Link href={tiktokUrl}>
                    <RiTiktokFill className="size-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Thông tin chung</h3>
            <ul className="list-disc pl-8 space-y-2">
              <li>
                <span className="font-medium">Thời gian: </span>
                {formats.date(campaign.startDate)} - {formats.date(campaign.endDate)}
              </li>
              <li>
                <span className="font-medium">Ngân sách ước tính: </span>
                {formats.price(campaign.budget)}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Yêu cầu nội dung</h3>
            <Contents campaign={campaign} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampaignDetails;
