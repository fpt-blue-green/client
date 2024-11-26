'use client';

import Paper from '@/components/custom/paper';
import PeoplePickerPopup from '@/components/people-picker-popup';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import config from '@/config';
import { useAuthBrand } from '@/hooks';
import { formats } from '@/lib/utils';
import { fetchRequest } from '@/request';
import chatRequest from '@/request/chat.request';
import IChat from '@/types/chat';
import IUser from '@/types/user';
import { ChatBubbleIcon, DotsHorizontalIcon, ExitIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FC } from 'react';
import { LuUserPlus2 } from 'react-icons/lu';
import { toast } from 'sonner';

interface SettingProps {
  chat: IChat;
}

const Setting: FC<SettingProps> = ({ chat }) => {
  const { session, profile } = useAuthBrand();
  const { data, mutate } = fetchRequest.chat.member(chat.chatId && chat.chatId);

  const handleAdd = (users: IUser[]) => {
    toast.promise(
      chatRequest.addMembers(
        chat.chatId,
        users.map((u) => u.id),
      ),
      {
        loading: 'Đang tải',
        success: () => {
          mutate();
          return 'Thêm thành viên thành công';
        },
        error: (err) => err?.message,
      },
    );
  };

  const handleRemove = (user: IUser) => () => {
    toast.promise(chatRequest.deleteMember(chat.chatId, user.id), {
      loading: 'Đang tải',
      success: () => {
        mutate();
        return 'Xoá thành viên thành công';
      },
      error: (err) => err?.message,
    });
  };

  return (
    <div className="h-full w-full md:w-80">
      <Paper className="h-full">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-20">
            <AvatarImage src={chat.chatImage} alt={chat.chatName} />
            <AvatarFallback>{chat.chatName[0]}</AvatarFallback>
          </Avatar>
          <h6 className="font-semibold text-center">{chat.chatName}</h6>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="info">
            <AccordionTrigger>Thông tin</AccordionTrigger>
          </AccordionItem>
          {chat.isCampaign && chat.campaignId && (
            <AccordionItem value="member">
              <AccordionTrigger>Thành viên</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {data?.map((member) => (
                    <div key={member.user.id} className="flex items-center gap-2 px-2 h-10">
                      <Avatar className="size-8">
                        <AvatarImage src={member.user.image} alt={member.user.name} />
                        <AvatarFallback>{member.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div>{member.user.name}</div>
                        <p className="text-xs text-muted-foreground">Tham gia vào {formats.date(member.joinAt)}</p>
                      </div>
                      {profile?.userId !== member.user.id && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" className="ml-auto">
                              <DotsHorizontalIcon />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                              {session?.user.id !== member.user.id && (
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={config.routes.chats.details(false, member.user.id)}
                                    className="flex items-center gap-2"
                                  >
                                    <ChatBubbleIcon />
                                    Nhắn tin
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {session?.user.id === member.user.id && (
                                <DropdownMenuItem onClick={handleRemove(member.user)}>
                                  <ExitIcon className="mr-2" />
                                  <span>Rời nhóm</span>
                                </DropdownMenuItem>
                              )}
                              {profile && (
                                <DropdownMenuItem onClick={handleRemove(member.user)}>
                                  <ExitIcon className="mr-2" />
                                  <span>Đuổi khỏi nhóm</span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  ))}
                  {profile && (
                    <PeoplePickerPopup
                      campaignId={chat.campaignId}
                      selectedIds={data?.map((m) => m.user.id)}
                      onSubmit={handleAdd}
                    >
                      <Button
                        variant="ghost"
                        size="large"
                        startIcon={
                          <Avatar className="size-8">
                            <AvatarFallback>
                              <LuUserPlus2 />
                            </AvatarFallback>
                          </Avatar>
                        }
                        fullWidth
                        className="px-2 justify-start"
                      >
                        Thêm người
                      </Button>
                    </PeoplePickerPopup>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          <AccordionItem value="privacy">
            <AccordionTrigger>Quyền riêng tư và hỗ trợ</AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </Paper>
    </div>
  );
};

export default Setting;
