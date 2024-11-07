'use client';

import Paper from '@/components/custom/paper';
import Tooltip from '@/components/custom/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LuMoreHorizontal, LuPhone, LuVideo } from 'react-icons/lu';
import ChatContainer from './chat-container';
import ChatForm from './chat-form';
import { useChat } from '@/hooks';

const BoxChat = () => {
  const { messages } = useChat('0f3d02f5-fc1b-43e3-8fb9-c91049496845');

  console.log(messages);

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
        <div className="flex flex-col gap-4 h-full pt-16 -mr-4">
          <ChatContainer messages={messages} />
          <div className="shrink-0 pr-4">
            <ChatForm />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default BoxChat;
