'use client';

import { Button } from '@/components/ui/button';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from '@/components/custom/date-picker';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Tooltip from '@/components/custom/tooltip';
import { useForm } from 'react-hook-form';
import { BasicBodyType, basicSchema } from '@/schema-validations/campaign.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const CreateForm = () => {
  const form = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: '',
      title: '',
      description: '',
      budget: 0,
    },
  });

  const onSubmit = () => {
    // Handle form submission
    console.log(form.getValues());
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
                  <Input
                    id="budget"
                    type="number"
                    className="md:col-span-3"
                    fullWidth
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage className="md:col-start-2 col-span-full" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="startDate" className="md:text-right">
                  Ngày bắt đầu
                </FormLabel>
                <FormControl>
                  <DatePicker
                    id="startDate"
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
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="endDate" className="md:text-right">
                  Ngày kết thúc
                </FormLabel>
                <FormControl>
                  <DatePicker
                    id="endDate"
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
          <Button type="submit" variant="gradient">
            OK
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
export default CreateForm;
