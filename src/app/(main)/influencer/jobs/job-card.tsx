'use client';

import Chip from '@/components/custom/chip';
import Paper from '@/components/custom/paper';
import { constants } from '@/lib/utils';
import { ERole, PlatformData } from '@/types/enum';
import IJob from '@/types/job';
import Image from 'next/image';
import { FC } from 'react';
import JobOffer from './job-offer';
import ReadMore from '@/components/custom/read-more';
import { FaReply } from 'react-icons/fa6';
import Link from 'next/link';
import config from '@/config';
interface JobCardProps {
  item: IJob;
}

const JobCard: FC<JobCardProps> = ({ item }) => {
  const { name, logo, contentTypes } = PlatformData[item.offer.platform];
  const campaignImage = item.campaign.images[0]?.url;

  return (
    <Paper className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
      <Chip
        label={constants.campaignStatus[item.campaign.status].label}
        variant={constants.campaignStatus[item.campaign.status].color}
        className="absolute top-6 left-6"
        size="small"
      />
      {campaignImage ? (
        <Image
          src={campaignImage}
          alt={`Chiến dịch ${item.campaign.title}`}
          width={450}
          height={300}
          className="w-full aspect-cover object-cover rounded-lg"
        />
      ) : (
        <div className="pb-[calc(4/3)] bg-foreground rounded-lg"></div>
      )}
      <div className="md:col-span-2 flex flex-col gap-2">
        <Link
          href={config.routes.campaigns.details(item.campaign.id)}
          className="font-semibold text-lg transition-colors hover:text-info"
        >
          {item.campaign.title}
        </Link>
        <ReadMore className="text-sm text-muted-foreground">{item.campaign.description}</ReadMore>
        <div className="flex items-center gap-2">
          <Image src={logo} alt={name} width={50} height={50} className="size-5" />
          {item.offer.quantity} {contentTypes[item.offer.contentType]}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <Chip
            label={`Trạng thái: ${constants.offerStatus[item.offer.status].label}`}
            variant={constants.offerStatus[item.offer.status].color}
            icon={item.offer.from === ERole.Influencer ? <FaReply /> : undefined}
          />
          <JobOffer offer={item.offer} campaign={item.campaign}>
            <span className="text-sm text-sky-500 hover:underline cursor-pointer">Xem chi tiết</span>
          </JobOffer>
        </div>
      </div>
    </Paper>
  );
};

export default JobCard;
