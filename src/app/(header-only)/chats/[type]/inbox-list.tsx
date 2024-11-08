'use-client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import config from '@/config';
import { useAuthUser } from '@/hooks';
import { cn, formats } from '@/lib/utils';
import { fetchRequest } from '@/request';
import { MagnifyingGlassIcon, Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

const InboxList = () => {
  const { session } = useAuthUser();
  const { data, isLoading } = fetchRequest.chat.list();
  const searchParams = useSearchParams();

  return (
    <div className="relative flex flex-col gap-2 pl-8 pr-4 h-full">
      <div className="sticky top-0 z-5">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Đoạn chat</h1>
          <Button variant="ghost" size="icon">
            <Pencil2Icon />
          </Button>
        </div>
        <Input
          startAdornment={<MagnifyingGlassIcon className="size-5" />}
          fullWidth
          placeholder="Tìm kiếm đoạn chat..."
        />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-1">
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <Fragment key={index}>
                  <div className="flex items-center gap-2 w-full">
                    <Skeleton className="size-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="w-1/3 h-3" />
                      <Skeleton className="w-full h-2" />
                    </div>
                  </div>
                  <Separator />
                </Fragment>
              ))
            : data?.map((chat) => (
                <Fragment key={chat.chatId}>
                  <Button
                    variant="ghost"
                    className={cn('flex justify-start h-fit', { 'bg-accent': searchParams.get('c') === chat.chatId })}
                    asChild
                  >
                    <Link
                      className="flex gap-2 w-full"
                      href={config.routes.chats.details(chat.isCampaign, chat.chatId)}
                    >
                      <Avatar className="size-10 shrink-0">
                        <AvatarImage src={chat.chatImage} alt={chat.chatName} />
                        <AvatarFallback>{chat.chatName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left gap-1 overflow-hidden">
                        <h6 className="font-medium">{chat.chatName}</h6>
                        <p className="truncate font-normal text-muted-foreground">
                          {chat.sender.id === session?.user.id ? 'Bạn: ' : `${chat.sender.name}: `}
                          {`${chat.lastMessage} · ${formats.timeAgo(chat.sentAt)}`}
                        </p>
                      </div>
                    </Link>
                  </Button>
                  <Separator />
                </Fragment>
              ))}
        </div>
      </div>
    </div>
  );
};

export default InboxList;
