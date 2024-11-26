'use client';

import { Button } from '@/components/ui/button';
import config from '@/config';
import { constants, emitter } from '@/lib/utils';
import { campaignsRequest, fetchRequest } from '@/request';
import chatRequest from '@/request/chat.request';
import { ECampaignStatus } from '@/types/enum';
import { EyeOpenIcon, Pencil1Icon, PlayIcon, StopIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Actions = () => {
  const { id } = useParams<{ id: string }>();
  const { data, mutate } = fetchRequest.campaign.getById(id);
  const router = useRouter();

  if (!data) return;

  const handleEnđ = () => {
    emitter.confirm({
      description: 'Các nhà sáng tạo nội dung không thể tìm kiếm và thực hiện công việc trong chiến dịch này nữa.',
      content: `Bạn có chắc kết thúc chiến dịch ${data.title} không?`,
      callback: () => {
        toast.promise(campaignsRequest.end(data.id), {
          loading: 'Đang tải',
          success: () => {
            mutate();
            return 'Chiến dịch đã kết thúc.';
          },
          error: (err) => err?.message || constants.sthWentWrong,
        });
      },
    });
  };

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

  const handleChat = () => {
    campaignsRequest.getChat(data.id).then((res) => {
      if (res.data?.id) {
        router.push(config.routes.chats.details(true, res.data.id));
      } else {
        campaignsRequest
          .createChat(data.id)
          .then((resp) => {
            const chatId = resp.data?.id;
            if (chatId) {
              // Thêm thành viên sau khi tạo
              campaignsRequest.participants(chatId).then((res) => {
                const members = res.data?.map((mem) => mem.id);
                chatRequest.addMembers(chatId, members || []);
              });
              router.push(config.routes.chats.details(true, chatId));
            }
          })
          .catch((err) => toast.error(err?.message));
      }
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
        <Button variant="destructive" size="large" onClick={handleEnđ} startIcon={<StopIcon />}>
          Kết thúc
        </Button>
      )}
      <Button variant="outline" size="large" startIcon={<EyeOpenIcon />} onClick={handleChat}>
        Nhóm chat
      </Button>
    </div>
  );
};
export default Actions;
