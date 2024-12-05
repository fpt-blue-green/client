'use client';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { EReportReason } from '@/types/enum';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReportInfluencerBasicBodyType, reportInfluencerBasicSchema } from '@/schema-validations/brand.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import IInfluencer from '@/types/influencer';
import { constants } from '@/lib/utils';
import brandsRequest from '@/request/brands.request';

interface ActionFormProps {
  influencer: IInfluencer;
  handleClose: () => void;
  mutate: () => void;
}

const ReportForm: FC<ActionFormProps> = ({ handleClose, influencer, mutate }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ReportInfluencerBasicBodyType>({
    resolver: zodResolver(reportInfluencerBasicSchema),
    defaultValues: {
      reason: EReportReason.Other,
      description: '',
    },
  });
  const handleSubmit = (values: ReportInfluencerBasicBodyType) => {
    setLoading(true);
    const caller = brandsRequest.reportInfluencer(influencer?.id || '', values);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        handleClose();
        mutate();
        return `Đã tố cáo ${influencer.fullName} thành công.`;
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>{`Đề nghị tố cáo ${influencer.fullName}`}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lý do tố cáo</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn lý do tố cáo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EReportReason.FakeInfo.toString()}>Thông tin giả</SelectItem>
                    <SelectItem value={EReportReason.Fraud.toString()}>Gian lận</SelectItem>
                    <SelectItem value={EReportReason.HateSpeech.toString()}>Ngôn từ đả kích</SelectItem>
                    <SelectItem value={EReportReason.InappropriateContent.toString()}>
                      Nội dung không phù hợp
                    </SelectItem>
                    <SelectItem value={EReportReason.UncompletedTask.toString()}>Không hoàn thành công việc</SelectItem>
                    <SelectItem value={EReportReason.ViolationOfTerms.toString()}>
                      Vi phạm điều khoản dịch vụ
                    </SelectItem>
                    <SelectItem value={EReportReason.Other.toString()}>Lý do khác</SelectItem>
                  </SelectContent>
                </Select>
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
                <FormControl className="w-full">
                  <Input id="description" placeholder="Nhập thông tin chi tiết..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Hủy
            </Button>
          </DialogClose>
          <Button variant="gradient" type="submit" loading={loading}>
            Tố cáo
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ReportForm;
