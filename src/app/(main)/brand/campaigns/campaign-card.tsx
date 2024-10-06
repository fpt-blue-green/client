'use client';

import { FC } from 'react';
import ICampaign from '@/types/campaign';
import Image from 'next/image';
import { cn, formats } from '@/lib/utils';
import config from '@/config';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

interface CampaignCardProps {
  data: ICampaign;
  onEdit: (campaign?: ICampaign) => () => void;
}

const CampaignCard: FC<CampaignCardProps> = ({ data, onEdit }) => {
  const firstImage =
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8zM193YWxscGFwZXJfb2ZfY2xvdWRzX2dyYWRpZW50X2dsaXR0ZXJfb25fc2ltcF8zNzFmOGU1Zi1jZTM2LTRjNjctOWMyZC1lMWZkZTI1YmEwM2ZfMS5qcGc.jpg';

  return (
    <div
      key={data.id}
      className={cn('relative bg-accent rounded-lg overflow-hidden select-none', { 'pb-[100%]': !firstImage })}
    >
      {firstImage && (
        <Image
          src={firstImage}
          alt={`Ảnh về chiến dịch ${data.title}`}
          width={500}
          height={500}
          className="object-cover w-full aspect-square transition-transform hover:scale-110"
        />
      )}
      <div className="absolute left-0 top-0 right-0 bottom-0 bg-bg-gradient-to-b from-black/5 from-75% to-black"></div>
      <div className="absolute left-4 bottom-4 text-white">
        <Link href={config.routes.campaigns.details(data.id)} className="font-semibold hover:underline">
          {data.name}
        </Link>
        <div className="text-sm">
          {formats.date(data.startDate)} - {formats.date(data.endDate)}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="absolute top-4 right-4">
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={config.routes.campaigns.details(data.id)}>Xem chi tiết</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit(data)}>Chỉnh sửa chung</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={config.routes.brand.campaigns.edit(data.id, 1)}>Chỉnh sửa chi tiết</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default CampaignCard;
