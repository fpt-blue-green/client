'use client';

import Paper from '@/components/custom/paper';
import Tooltip from '@/components/custom/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LuMoreHorizontal, LuPhone, LuVideo } from 'react-icons/lu';
import ChatContainer from './chat-container';
import { fetchRequest } from '@/request';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import NoData from '@/components/no-data';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface BoxChatProps {
  open: boolean;
  toggle: () => void;
}

const BoxChat: FC<BoxChatProps> = ({ open, toggle }) => {
  const searchParams = useSearchParams();
  const { data } = fetchRequest.chat.list();
  const id = searchParams.get('c');

  const chat = useMemo(() => {
    return data?.find((c) => c.chatId === id);
  }, [id, data]);

  if (!id || !chat) return <NoData className="flex-1 h-full" description="Chọn đoạn chat hoặc nhắn tin mới" />;

  return (
    <div
      className={cn('flex-1 h-full max-md:absolute z-50 inset-y-0 right-0 max-md:w-0 transition-all', {
        'max-md:w-full': open,
      })}
    >
      <Paper className="relative h-full p-4 max-md:rounded-none">
        <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 bg-background shadow-lg z-1">
          <span className="flex items-center gap-2">
            <Tooltip label="Trở lại">
              <Button variant="ghost" size="icon-sm" className="md:hidden" onClick={toggle}>
                <ArrowLeftIcon className="size-5" />
              </Button>
            </Tooltip>
            <Avatar className="size-11 shrink-0">
              <AvatarImage src={chat.chatImage} alt={chat.chatName} />
              <AvatarFallback>{chat.chatName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden truncate text-nowrap font-medium">{chat.chatName}</div>
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <Tooltip label="Bắt đầu gọi thoại">
              <Button variant="ghost" size="icon-sm">
                <LuPhone className="text-xl" />
              </Button>
            </Tooltip>
            <Tooltip label="Bắt đầu gọi video">
              <Button variant="ghost" size="icon-sm">
                <LuVideo className="text-xl" />
              </Button>
            </Tooltip>
            <Tooltip label="Thông tin về cuộc trò chuyện">
              <Button variant="ghost" size="icon-sm">
                <LuMoreHorizontal className="text-xl" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <ChatContainer chat={chat} />
      </Paper>
    </div>
  );
};

export default BoxChat;
