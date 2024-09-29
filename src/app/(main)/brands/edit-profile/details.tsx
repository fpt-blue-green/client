'use client';

import { FC, useState } from 'react';
import Paper from '@/components/custom/paper';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AddressPicker from '@/components/address-picker';
import { BasicBodyType, basicSchema } from '@/schema-validations/brand.schema';
import BrandDetailsProps from './props';
import { brandRequest } from '@/request';
import { toast } from 'sonner';

const Details: FC<BrandDetailsProps> = ({ brand, mutate }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const detailsForm = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: brand.name || undefined,
      address: brand.address || undefined,
      description: brand.description || undefined,
    },
  });

  const onSubmit = (values: BasicBodyType) => {
    setIsLoading(true);
    brandRequest
      .updateGeneralInfo(values)
      .then(() => {
        mutate().then(() => toast.success('Cập nhật thông tin chi tiết thành công'));
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="address">Địa chỉ</Label>
                    <FormControl>
                      <AddressPicker
                        {...field}
                        id="address"
                        className="w-full"
                        placeholder="Nhập vào 3 kí tự đầu tiên và lựa chọn từ bảng gợi ý"
                      />
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
export default Details;
