'use client';

import Chip from '@/components/custom/chip';
import Paper from '@/components/custom/paper';
import { constants, formats } from '@/lib/utils';
import IJob from '@/types/job';
import { ClockIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { FC } from 'react';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

interface JobCardProps {
  item: IJob;
}

const JobCard: FC<JobCardProps> = ({ item }) => {
  return (
    <Paper className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
      <Chip
        label={constants.campaignStatus[item.campaign.status].label}
        variant={constants.campaignStatus[item.campaign.status].color}
        className="absolute top-6 left-6"
        size="small"
      />
      <Image
        src={item.campaign.images[0]?.url || '/assets/img/influencer.jpg'}
        alt={`Chiến dịch ${item.campaign.title}`}
        width={450}
        height={300}
        className="w-full aspect-cover object-cover rounded-lg"
      />
      <div className="md:col-span-2 space-y-2">
        <h4 className="font-semibold text-lg">{item.campaign.title}</h4>
        <p className="text-sm text-muted-foreground">{item.campaign.description}</p>
        <div className="flex items-center gap-2">
          <ClockIcon />
          {formats.date(item.campaign.startDate)} - {formats.date(item.campaign.endDate)}
        </div>
        <div className="flex items-center gap-2">
          <FaRegMoneyBillAlt />
          {formats.price(item.campaign.budget)}
        </div>
        <div className="text-right">
          <Chip
            label={`Trạng thái công việc: ${constants.jobStatus[item.status].label}`}
            variant={constants.jobStatus[item.status].color}
            size="large"
          />
        </div>
      </div>
    </Paper>
  );
};

export default JobCard;
