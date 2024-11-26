'use client';

import DatePicker from '@/components/custom/date-picker';
import Paper from '@/components/custom/paper';
import PeoplePickerPopup from '@/components/people-picker-popup';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import config from '@/config';
import { useAuthBrand } from '@/hooks';
import { formats } from '@/lib/utils';
import { fetchRequest } from '@/request';
import chatRequest from '@/request/chat.request';
import { MeetingBodyType, meetingSchema } from '@/schema-validations/campaign.schema';
import IChat from '@/types/chat';
import IUser from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { ChatBubbleIcon, DotsHorizontalIcon, ExitIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { LuUserPlus2 } from 'react-icons/lu';
import { toast } from 'sonner';

interface SettingProps {
  chat: IChat;
}

const Setting: FC<SettingProps> = ({ chat }) => {
  const { session, profile } = useAuthBrand();
  const { data, mutate } = fetchRequest.chat.member(chat.chatId);

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
          {profile && (
            <AccordionItem value="meeting">
              <AccordionTrigger>Phòng họp</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="ghost" size="small" fullWidth>
                        Thêm phòng họp
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Thêm phòng họp</DialogTitle>
                      <DialogDescription />
                      <MeetingForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
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

const MeetingForm = () => {
  const form = useForm<MeetingBodyType>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      roomName: '',
      description: '',
      participators: [],
    },
  });

  const handleSubmit = (values: MeetingBodyType) => {
    console.log('🚀 ~ handleSubmit ~ values:', values);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="roomName"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Tên phòng</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: Ten_Phong_Hop" {...field} fullWidth />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Thời gian bắt đầu</FormLabel>
              <FormControl>
                <DatePicker
                  hasTime
                  placeholder="Thời gian bắt đầu"
                  selected={field.value}
                  onChange={field.onChange}
                  fullWidth
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Thời gian kết thúc</FormLabel>
              <FormControl>
                <DatePicker
                  hasTime
                  placeholder="Thời gian kết thúc"
                  selected={field.value}
                  onChange={field.onChange}
                  fullWidth
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Mô tả" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Hủy</Button>
          </DialogClose>
          <Button variant="gradient" type="submit">
            Tạo
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Setting;
