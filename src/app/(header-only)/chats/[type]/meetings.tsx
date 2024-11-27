'use client';

import Chip from '@/components/custom/chip';
import DatePicker from '@/components/custom/date-picker';
import PeoplePickerPopup from '@/components/people-picker-popup';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuthBrand } from '@/hooks';
import { formats } from '@/lib/utils';
import { campaignsRequest, fetchRequest } from '@/request';
import { MeetingBodyType, meetingSchema } from '@/schema-validations/campaign.schema';
import IMeeting from '@/types/meeting';
import IUser from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Meetings = ({ campaignId }: { campaignId: string; reload?: () => void }) => {
  const { profile } = useAuthBrand();
  const { data, mutate } = fetchRequest.campaign.meetings(campaignId);
  const [open, setOpen] = useState(false);
  const [meeting, setMeeting] = useState<IMeeting>();

  const handleReload = () => {
    setOpen(false);
    mutate();
  };

  const handleEdit = (meeting?: IMeeting) => () => {
    setMeeting(meeting);
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-3">
      {data?.items.map((meeting) => (
        <div key={meeting.id} className="relative flex flex-col gap-1 group">
          <Link href="#" className="truncate font-medium hover:text-sky-500">
            {meeting.roomName}
          </Link>
          <p className="text-xs text-muted-foreground">
            {formats.date(meeting.startAt, true, {
              second: undefined,
            })}
            {meeting.endAt && ` - ${formats.date(meeting.endAt, true, { second: undefined })}`}
          </p>
          {profile && (
            <Button
              className="absolute top-1/2 right-0 -translate-y-1/2 hidden group-hover:flex"
              variant="outline"
              size="icon-sm"
              onClick={handleEdit(meeting)}
            >
              <Pencil1Icon />
            </Button>
          )}
        </div>
      ))}
      {profile && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="small"
              startIcon={<PlusIcon />}
              fullWidth
              disabled={!profile.isPremium}
              endIcon={!profile.isPremium && <Chip label="Premium" size="small" variant="gradient" />}
              onClick={handleEdit()}
            >
              Tạo phòng họp
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Thêm phòng họp</DialogTitle>
            <DialogDescription />
            <MeetingForm campaignId={campaignId} meeting={meeting} reload={handleReload} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const MeetingForm = ({
  campaignId,
  meeting,
  reload,
}: {
  campaignId: string;
  meeting?: IMeeting;
  reload: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<MeetingBodyType>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      roomName: meeting?.roomName || '',
      description: meeting?.description || '',
      startAt: meeting?.startAt ? new Date(meeting.startAt) : undefined,
      endAt: meeting?.endAt ? new Date(meeting.endAt) : undefined,
      participators: meeting?.participants || [],
    },
  });
  const [selectedUsers, setSelectedUser] = useState<IUser[]>([]);

  const handleSubmit = (values: MeetingBodyType) => {
    setLoading(true);
    toast.promise(campaignsRequest.createMeeting(campaignId, values), {
      loading: 'Đang tải',
      success: () => {
        reload();
        return 'Tạo phòng họp thành công';
      },
      error: (err) => err?.message,
      finally: () => setLoading(false),
    });
  };

  const handleChangeParticipators = (users: IUser[]) => {
    setSelectedUser(users);
    form.setValue(
      'participators',
      users.map((u) => u.email),
    );
    form.trigger('participators');
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
                  disablePast
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
              <FormLabel>Thời gian kết thúc</FormLabel>
              <FormControl>
                <DatePicker
                  hasTime
                  disablePast
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
          name="participators"
          render={() => (
            <FormItem>
              <FormLabel required>Người tham gia</FormLabel>
              <div className="flex flex-wrap items-center gap-1">
                {selectedUsers.map((u) => (
                  <Chip
                    key={u.id}
                    label={u.name}
                    size="small"
                    variant="secondary"
                    icon={
                      <Avatar className="size-7">
                        <AvatarImage src={u.image} alt={u.name} />
                        <AvatarFallback>{u.name[0]}</AvatarFallback>
                      </Avatar>
                    }
                    onDelete={() => handleChangeParticipators(selectedUsers.filter((user) => user.id !== u.id))}
                  />
                ))}
                <PeoplePickerPopup
                  campaignId={campaignId}
                  selectedIds={selectedUsers.map((u) => u.id)}
                  onSubmit={(users) => handleChangeParticipators([...selectedUsers, ...users])}
                >
                  <Button variant="ghost" size="small" startIcon={<PlusIcon />}>
                    Thêm
                  </Button>
                </PeoplePickerPopup>
              </div>
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
          <Button variant="gradient" type="submit" loading={loading}>
            Tạo
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Meetings;
