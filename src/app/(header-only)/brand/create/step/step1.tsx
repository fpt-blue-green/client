'use client';

import { FC, useState } from 'react';
import DetailStepProps from './props';
import { useForm } from 'react-hook-form';
import { BasicBodyType, basicSchema } from '@/schema-validations/brand.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import AddressPicker from '@/components/address-picker';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { brandRequest } from '@/request';
import { useRouter } from 'next/navigation';
import config from '@/config';
import { toast } from 'sonner';

const Step1: FC<DetailStepProps> = ({ profile, mutate }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: profile.name || '',
      address: profile.address || '',
      description: profile.description,
    },
  });

  const onSubmit = (value: BasicBodyType) => {
    setLoading(true);
    brandRequest
      .updateGeneralInfo(value)
      .then(() => mutate().then(() => router.push(config.routes.brand.create(2))))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="name">Tên hiển thị</Label>
              <FormControl>
                <Input id="name" placeholder="Tên hiển thị" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="address">Địa chỉ</Label>
              <FormControl>
                <AddressPicker id="address" placeholder="Địa chỉ" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <Label htmlFor="description">Mô tả</Label>
              <FormControl>
                <Textarea
                  {...field}
                  id="description"
                  className="w-full"
                  rows={4}
                  placeholder="Bạn bán gì? Sứ mệnh của bạn là gì? Hãy cụ thể vì đây là cách người tạo nội dung sẽ tìm hiểu thêm về thương hiệu của bạn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="large" variant="gradient" fullWidth className="col-span-full" loading={loading}>
          Tiếp tục
        </Button>
      </form>
    </Form>
  );
};
export default Step1;
