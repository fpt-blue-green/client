'use client';

import Chip from '@/components/custom/chip';
import Paper from '@/components/custom/paper';
import { constants, formats } from '@/lib/utils';
import { PlatformData } from '@/types/enum';
import IJob from '@/types/job';
import { RxFace } from 'react-icons/rx';
import Image from 'next/image';
import { FC } from 'react';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import JobOffer from './job-offer';
import ReadMore from '@/components/custom/read-more';
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
      <div className="md:col-span-2 space-y-2">
        <h4 className="font-semibold text-lg">{item.campaign.title}</h4>
        <ReadMore className="text-sm text-muted-foreground">{item.campaign.description}</ReadMore>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Image src={logo} alt={name} width={50} height={50} className="size-5" />
            {item.offer.quantity} {contentTypes[item.offer.contentType]}
          </div>
          <div className="flex items-center gap-2">
            <FaRegMoneyBillAlt className="text-xl" />
            {formats.price(item.offer.price)}
          </div>
          <div className="flex items-center gap-2">
            <RxFace className="text-xl" />
            {item.offer.targetReaction}
          </div>
        </div>
        <div className="text-right">
          <JobOffer offer={item.offer} campaign={item.campaign}>
            <Chip
              label={`Trạng thái công việc: ${constants.jobStatus[item.status].label}`}
              variant={constants.jobStatus[item.status].color}
              size="large"
            />
          </JobOffer>
        </div>
      </div>
    </Paper>
  );
};

export default JobCard;
