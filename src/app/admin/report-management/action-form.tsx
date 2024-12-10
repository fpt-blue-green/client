'use client';

import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminRequest } from '@/request';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { constants } from '@/lib/utils';
import IReport from '@/types/report';
import { BanBodyType, banSchema } from '@/schema-validations/user.schema';
import { EBanDate } from '@/types/enum';

interface ActionFormProps {
  item?: IReport;
  reload: () => Promise<void>;
  handleClose: () => void;
}

const ActionForm: FC<ActionFormProps> = ({ item, reload, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<BanBodyType>({
    resolver: zodResolver(banSchema),
    defaultValues: {
      reason: '',
      bannedTime: EBanDate.OneWeek,
    },
  });
  const handleSubmit = (values: BanBodyType) => {
    setLoading(true);
    const caller = adminRequest.approveReport(item?.id || '', values);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        reload();
        handleClose();
        return 'Đã chấp thuận đơn tố cáo thành công.';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>Chấp thuận đơn tố cáo</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lí do</FormLabel>
                <FormControl className="w-full">
                  <Input id="reason" placeholder="Nhập lí do..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bannedTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{'Tố cáo trong vòng'}</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời hạn tố cáo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EBanDate.OneWeek.toString()}>1 Tuần</SelectItem>
                    <SelectItem value={EBanDate.TwoWeeks.toString()}>2 Tuần</SelectItem>
                    <SelectItem value={EBanDate.OneMonth.toString()}>1 Tháng</SelectItem>
                    <SelectItem value={EBanDate.ThreeMonths.toString()}>3 Tháng</SelectItem>
                    <SelectItem value={EBanDate.SixMonths.toString()}>6 Tháng</SelectItem>
                    <SelectItem value={EBanDate.OneYear.toString()}>1 Năm</SelectItem>
                    <SelectItem value={EBanDate.TwoYears.toString()}>2 Năm</SelectItem>
                    <SelectItem value={EBanDate.indefinitely.toString()}>Vô thời hạn</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" loading={loading}>
              Hủy
            </Button>
          </DialogClose>
          <Button variant="gradient" type="submit" loading={loading}>
            Lưu
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ActionForm;
