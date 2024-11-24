'use client';

import { FC, useState } from 'react';
import DetailStepProps from './props';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Tooltip from '@/components/custom/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PriceInput from '@/components/custom/price-input';
import DateRangePicker from '@/components/custom/date-range-picker';
import { useForm } from 'react-hook-form';
import { BasicBodyType, basicSchema } from '@/schema-validations/campaign.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { campaignsRequest } from '@/request';
import { toast } from 'sonner';
import { constants } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import config from '@/config';

const StepGeneral: FC<DetailStepProps> = ({ campaign }) => {
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
  const router = useRouter();

  const onSubmit = (values: BasicBodyType) => {
    const caller = campaign
      ? campaignsRequest.updateCampaign(campaign.id, values)
      : campaignsRequest.createCampaign(values);
    setLoading(true);
    caller
      .then((res) => {
        if (res.data) router.push(config.routes.brand.campaigns.edit(res.data.substring(1, res.data.length - 1), 2));
      })
      .catch((err: any) => toast.error(err?.message || constants.sthWentWrong))
      .finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="flex gap-2">
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
                  rows={4}
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
        <div className="col-span-full">
          <Button type="submit" variant="gradient" loading={loading} fullWidth>
            Tiếp tục
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepGeneral;
