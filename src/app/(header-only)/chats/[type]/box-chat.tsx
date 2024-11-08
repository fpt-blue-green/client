'use client';

import Paper from '@/components/custom/paper';
import Tooltip from '@/components/custom/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LuMoreHorizontal, LuPhone, LuVideo } from 'react-icons/lu';
import ChatContainer from './chat-container';
import { fetchRequest } from '@/request';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const BoxChat = () => {
  const searchParams = useSearchParams();
  const { data } = fetchRequest.chat.list();
  const id = searchParams.get('c');

  const chat = useMemo(() => {
    return data?.find((c) => c.chatId === id);
  }, [id, data]);

  if (!id || !chat) return;

  return (
    <div className="pl-4 pr-8 h-full">
      <Paper className="relative h-full p-4">
        <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 bg-secondary shadow-lg z-1">
          <span className="flex items-center gap-2 flex-1">
            <Avatar className="size-11 shrink-0">
              <AvatarImage src={chat.chatImage} alt={chat.chatName} />
              <AvatarFallback>{chat.chatName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left gap-1 overflow-hidden text-nowrap">
              <h6 className="font-medium">{chat.chatName}</h6>
              <p className="truncate font-normal text-muted-foreground">Đang hoạt động</p>
            </div>
          </span>
          <div className="flex items-center gap-2">
            <Tooltip label="Bắt đầu gọi thoại">
              <Button variant="ghost" size="icon">
                <LuPhone className="text-xl" />
              </Button>
            </Tooltip>
            <Tooltip label="Bắt đầu gọi video">
              <Button variant="ghost" size="icon">
                <LuVideo className="text-xl" />
              </Button>
            </Tooltip>
            <Tooltip label="Thông tin về cuộc trò chuyện">
              <Button variant="ghost" size="icon">
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
