'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Tooltip from '@/components/custom/tooltip';
import { useForm } from 'react-hook-form';
import { BasicBodyType, basicSchema } from '@/schema-validations/campaign.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import PriceInput from '@/components/custom/price-input';
import DateRangePicker from '@/components/custom/date-range-picker';
import { FC, useState } from 'react';
import { campaignsRequest } from '@/request';
import { toast } from 'sonner';
import { constants } from '@/lib/utils';
import ICampaign from '@/types/campaign';

interface CreateFormProps {
  campaign?: ICampaign;
  reload: () => Promise<void>;
  onClose: () => void;
}

const CreateForm: FC<CreateFormProps> = ({ campaign, reload, onClose }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: campaign?.name || '',
      title: campaign?.title || '',
      description: campaign?.description || '',
      dates:
        campaign?.startDate && campaign?.endDate
          ? [new Date(campaign.startDate), new Date(campaign.endDate)]
          : [undefined, undefined],
      budget: campaign?.budget || 0,
    },
  });

  const onSubmit = (values: BasicBodyType) => {
    setLoading(true);
    const caller = campaign
      ? campaignsRequest.updateCampaign(campaign.id, values)
      : campaignsRequest.createCampaign(values);
    caller
      .then(() => reload().then(onClose))
      .catch((err) => toast.error(err?.message || constants.sthWentWrong))
      .finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Tạo chiến dịch mới</DialogTitle>
          <DialogDescription>
            Cộng tác với người sáng tạo và yêu cầu họ đăng ảnh, video, phát trực tiếp tới khán giả của họ
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 *:grid *:grid-cols-1 *:md:grid-cols-4 *:items-center *:md:gap-x-4 *:md:gap-y-2 *:md:space-y-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="flex gap-2 md:justify-end">
                  Tên
                  <Tooltip label="Thông tin này dành cho tổ chức nội bộ của bạn và sẽ không hiển thị công khai">
                    <InfoCircledIcon />
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input id="name" className="md:col-span-3" fullWidth placeholder="Ví dụ: Chiến dịch 1" {...field} />
                </FormControl>
                <FormMessage className="md:col-start-2 col-span-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title" className="md:text-right">
                  Tiêu đề
                </FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    className="md:col-span-3"
                    fullWidth
                    placeholder="Ví dụ: Nâng tầm tủ đồ mùa thu của bạn với áo len "
                    {...field}
                  />
                </FormControl>
                <FormMessage className="md:col-start-2 col-span-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description" className="md:text-right">
                  Mô tả
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    rows={3}
                    className="md:col-span-3"
                    placeholder="Sản phẩm/dịch vụ mà bạn muốn người sáng tạo quảng bá là gì? Một số điểm chính liên quan đến nó là gì?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="md:col-start-2 col-span-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="budget" className="md:text-right">
                  Ngân sách
                </FormLabel>
                <FormControl>
                  <PriceInput id="budget" type="number" className="md:col-span-3" fullWidth {...field} />
                </FormControl>
                <FormMessage className="md:col-start-2 col-span-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="dates" className="md:text-right">
                  Thời gian
                </FormLabel>
                <FormControl>
                  <DateRangePicker
                    id="dates"
                    className="md:col-span-3"
                    selected={field.value}
                    onChange={field.onChange}
                    fullWidth
                    disablePast
                  />
                </FormControl>
                <FormMessage className="md:col-start-2 col-span-full" />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" loading={loading}>
              Huỷ
            </Button>
          </DialogClose>
          <Button type="submit" variant="gradient" loading={loading}>
            OK
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
export default CreateForm;
