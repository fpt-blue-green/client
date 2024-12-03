'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import config from '@/config';
import { useAuthBrand, useThrottle } from '@/hooks';
import { cn, constants } from '@/lib/utils';
import { brandRequest, fetchRequest } from '@/request';
import IInfluencer from '@/types/influencer';
import { ChatBubbleIcon, HeartFilledIcon, HeartIcon, Link2Icon } from '@radix-ui/react-icons';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { FaFacebook, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { LuShare } from 'react-icons/lu';
import { toast } from 'sonner';

interface ActionProps {
  influencer: IInfluencer;
}

const Action: FC<ActionProps> = ({ influencer }) => {
  const { session, profile } = useAuthBrand();
  const { data, mutate } = fetchRequest.favorites(!!profile);
  const isFavorite = Boolean(data && data.some((f) => f.id === influencer.id));
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleFavorite = useThrottle(() => {
    if (!session) {
      signIn();
      return;
    }
    const caller = isFavorite ? brandRequest.unfavorite(influencer.id) : brandRequest.favorite(influencer.id);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        mutate();
        return (isFavorite ? 'Đã xóa khỏi' : 'Đã thêm vào') + ' danh sách yêu thích';
      },
      error: (err) => err?.message || constants.sthWentWrong,
    });
  }, 750);

  const copyUrlToClipboard = () => {
    const currentUrl = window?.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.info('Đã sao chép liên kết vào clipboard');
      setCopiedUrl(true);
    });
  };

  return (
    <div className="grid grid-cols-2 md:flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" startIcon={<LuShare />}>
            Chia Sẻ
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <h6 className="font-semibold text-center mb-2">Chia sẻ</h6>
          <div className="grid grid-cols-4 gap-5 *:w-16">
            <div className="flex flex-col items-center gap-1">
              <button
                className="flex items-center justify-center size-12 bg-accent rounded-full"
                onClick={copyUrlToClipboard}
              >
                <Link2Icon className="size-8" />
              </button>
              <span className="text-center text-xs">{copiedUrl ? 'Đã sao chép liên kết' : 'Sao chép liên kết'}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center size-12 bg-accent rounded-full">
                <FaFacebook className="size-full fill-[#0866ff] stroke-white" />
              </button>
              <span className="text-center text-xs">Facebook</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center size-12 bg-[#25d366] rounded-full">
                <FaWhatsapp className="size-8 fill-white" />
              </button>
              <span className="text-center text-xs">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center size-12 bg-[#111] rounded-full">
                <FaXTwitter className="size-8 fill-white" />
              </button>
              <span className="text-center text-xs">X</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        startIcon={
          isFavorite ? <HeartFilledIcon className="size-5 text-destructive" /> : <HeartIcon className="size-5" />
        }
        onClick={handleFavorite}
      >
        <span className={cn({ 'text-destructive': isFavorite })}>{isFavorite ? 'Đã yêu thích' : 'Yêu thích'}</span>
      </Button>
      <Button variant="ghost" startIcon={<ChatBubbleIcon className="size-5" />} asChild>
        <Link href={config.routes.chats.details(false, influencer.userId)}>Nhắn tin</Link>
      </Button>
    </div>
  );
};

export default Action;
