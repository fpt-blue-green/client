'use client';

import { FC, useState } from 'react';
import Paper from '@/components/custom/paper';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AddressPicker from '@/components/custom/address-picker';
import { BasicBodyType, basicSchema } from '@/schema-validations/campaign.schema';
import CampaignDetailsProps from './props';
import { campaignsRequest } from '@/request';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const CampaignTabDetails: FC<CampaignDetailsProps> = ({ campaign }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const detailsForm = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: campaign.name || undefined,
      title: campaign.title || undefined,
      description: campaign.description || undefined,
      budget: campaign.budget || undefined,
    },
  });

  const onSubmit = (values: BasicBodyType) => {
    console.log(values);
    setIsLoading(true);
    campaignsRequest
      .updateCampaign(campaign.id, values)
      .then(() => {
        // mutate().then(() => toast.success('Cập nhật thông tin chi tiết của chiến dịch thành công'));
        () => toast.success('Cập nhật thông tin chi tiết của chiến dịch thành công');
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="flex flex-col gap-4">
      <Form {...detailsForm}>
        <form onSubmit={detailsForm.handleSubmit(onSubmit)}>
          <Paper className="col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <FormField
                control={detailsForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Tên</Label>
                    <FormControl>
                      <Input {...field} id="name" className="w-full" value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="title">Tiêu đề</Label>
                    <FormControl>
                      <Input {...field} id="title" className="w-full" value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="budget">Ngân sách</Label>
                    <FormControl>
                      <Input {...field} id="budget" className="w-full" value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={detailsForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="description">Mô tả</Label>
                    <FormControl>
                      <Textarea {...field} id="description" className="w-full" rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-8 text-right">
              <Button type="submit" size="large" variant="gradient" loading={isLoading}>
                Lưu thay đổi
              </Button>
            </div>
          </Paper>
        </form>
      </Form>
    </div>
  );
};
export default CampaignTabDetails;
