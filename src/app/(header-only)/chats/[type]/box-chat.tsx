'use client';

import Paper from '@/components/custom/paper';
import Tooltip from '@/components/custom/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LuMoreHorizontal, LuVideo } from 'react-icons/lu';
import ChatContainer from './chat-container';
import { fetchRequest } from '@/request';
import { FC, useState } from 'react';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import Setting from './setting';

interface BoxChatProps {
  id: string;
  open: boolean;
  toggle: () => void;
}

const BoxChat: FC<BoxChatProps> = ({ id, open, toggle }) => {
  const { data } = fetchRequest.chat.details(id);
  const [showMore, setShowMore] = useState(false);

  return (
    <>
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
                <AvatarImage src={data?.chatImage} alt={data?.chatName} />
                <AvatarFallback>{data?.chatName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden truncate text-nowrap font-medium">{data?.chatName}</div>
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <Tooltip label="Bắt đầu gọi video">
                <Button variant="ghost" size="icon-sm">
                  <LuVideo className="text-xl" />
                </Button>
              </Tooltip>
              <Tooltip label="Thông tin về cuộc trò chuyện">
                <Button variant="ghost" size="icon-sm" onClick={() => setShowMore(!showMore)}>
                  <LuMoreHorizontal className="text-xl" />
                </Button>
              </Tooltip>
            </div>
          </div>
          {data && (
            <>
              <ChatContainer chat={data} />
            </>
          )}
        </Paper>
      </div>
      {data && showMore && (
        <div className="w-full md:w-80">
          <Setting chat={data} />
        </div>
      )}
    </>
  );
};

export default BoxChat;
