'use client';

import { FC } from 'react';
import ICampaign from '@/types/campaign';
import Image from 'next/image';
import { cn, constants, emitter, formats } from '@/lib/utils';
import config from '@/config';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DotsVerticalIcon, EyeOpenIcon, Pencil1Icon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { campaignsRequest } from '@/request';
import { toast } from 'sonner';

interface CampaignCardProps {
  data: ICampaign;
  onEdit: (campaign?: ICampaign) => () => void;
  reload: () => Promise<void>;
}

const CampaignCard: FC<CampaignCardProps> = ({ data, onEdit, reload }) => {
  const firstImage =
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8zM193YWxscGFwZXJfb2ZfY2xvdWRzX2dyYWRpZW50X2dsaXR0ZXJfb25fc2ltcF8zNzFmOGU1Zi1jZTM2LTRjNjctOWMyZC1lMWZkZTI1YmEwM2ZfMS5qcGc.jpg';

  const handleDelete = (campaign: ICampaign) => () => {
    emitter.confirm({
      content: `Bạn có chắc muốn xóa chiến dịch ${campaign.name}? Bạn không thể hoàn tác sau khi thực hiện tác vụ này.`,
      callback: () =>
        campaignsRequest
          .delete(campaign.id)
          .then(() => reload().then(() => toast.success(`Xóa chiến dịch ${campaign.name} thành công`)))
          .catch((err) => toast.error(err?.message || constants.sthWentWrong)),
    });
  };

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
        <Link href={config.routes.brand.campaigns.edit(data.id, 1)} className="font-semibold hover:underline">
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
            <Link href={config.routes.campaigns.details(data.id)} className="flex items-center gap-2">
              <EyeOpenIcon />
              Xem chi tiết
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit(data)}>
            <span className="flex items-center gap-2">
              <Pencil1Icon />
              Chỉnh sửa chung
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={config.routes.brand.campaigns.edit(data.id, 1)} className="flex items-center gap-2">
              <Pencil2Icon />
              Chỉnh sửa chi tiết
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete(data)}>
            <span className="flex items-center gap-2">
              <TrashIcon />
              Xóa
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default CampaignCard;
