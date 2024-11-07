'use client';

import Paper from '@/components/custom/paper';
import Tooltip from '@/components/custom/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LuMoreHorizontal, LuPhone, LuVideo } from 'react-icons/lu';
import ChatContainer from './chat-container';

const BoxChat = () => {
  return (
    <div className="pl-4 pr-8 h-full">
      <Paper className="relative h-full p-4">
        <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 bg-secondary shadow-lg z-1">
          <span className="flex items-center gap-2 w-48">
            <Avatar className="size-11 shrink-0">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left gap-1 overflow-hidden">
              <h6 className="font-medium">Shadecn/ui</h6>
              <p className="truncate font-normal text-muted-foreground">Title</p>
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
        <ChatContainer />
      </Paper>
    </div>
  );
};

export default BoxChat;
