'use client';

import { Button } from '@/components/ui/button';
import config from '@/config';
import { constants, emitter } from '@/lib/utils';
import { campaignsRequest, fetchRequest } from '@/request';
import { ECampaignStatus } from '@/types/enum';
import { EyeOpenIcon, Pencil1Icon, PlayIcon, StopIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const Actions = () => {
  const { id } = useParams<{ id: string }>();
  const { data, mutate } = fetchRequest.campaign.getById(id);

  if (!data) return;

  const handleStart = () => {
    emitter.confirm({
      description:
        'Các nhà sáng tạo nội dung vẫn có thể tham gia vào chiến dịch nhưng bạn không thể chỉnh sửa được thông tin của chiến dịch.',
      content: `Bạn có chắc bắt đầu khởi chạy chiến dịch ${data.title} không?`,
      callback: () => {
        toast.promise(campaignsRequest.start(data.id), {
          loading: 'Đang tải',
          success: () => {
            mutate();
            return 'Chiến dịch đã được khởi chạy.';
          },
          error: (err) => err?.message || constants.sthWentWrong,
        });
      },
    });
  };

  return (
    <div className="flex max-md:flex-col-reverse items-center max-md:items-stretch gap-2 pt-4">
      {data.status === ECampaignStatus.Published && (
        <>
          <Button variant="gradient" size="large" onClick={handleStart} startIcon={<PlayIcon />}>
            Bắt đầu
          </Button>
          <Button variant="outline" size="large" startIcon={<Pencil1Icon />} asChild>
            <Link href={config.routes.brand.campaigns.edit(data.id, 1)}>Chỉnh sửa</Link>
          </Button>
        </>
      )}
      {data.status === ECampaignStatus.Active && (
        <Button
          variant="destructive"
          size="large"
          onClick={handleStart}
          startIcon={<StopIcon />}
          disabled={new Date() < new Date(data.endDate)}
        >
          Kết thúc
        </Button>
      )}
      <Button variant="outline" size="large" startIcon={<EyeOpenIcon />} asChild>
        <Link href={config.routes.campaigns.details(data.id)}>Xem chi tiết</Link>
      </Button>
    </div>
  );
};
export default Actions;
