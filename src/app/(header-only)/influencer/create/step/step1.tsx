'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GeneralBodyType, generalSchema } from '@/schema-validations/influencer.schema';
import { EGender } from '@/types/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import DetailStepProps from './props';
import { influencerRequest } from '@/request';
import { useRouter } from 'next/navigation';
import config from '@/config';
import { toast } from 'sonner';

const Step1: FC<DetailStepProps> = ({ profile, mutate }) => {
  const router = useRouter();
  const form = useForm<GeneralBodyType>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      fullName: profile.fullName || '',
      address: profile.address || '',
      summarise: profile.summarise || '',
      slug: profile.slug || '',
      description: profile.description || '',
      gender: profile.gender || EGender.Male,
    },
  });

  const onSubmit = (values: GeneralBodyType) => {
    influencerRequest
      .updateGeneralInfo(values)
      .then(() => {
        router.push(`${config.routes.influencer.create}?step=2`);
        mutate();
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <Form {...form}>
      <form className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="fullName">Tên hiển thị</Label>
              <FormControl>
                <Input id="fullName" placeholder="Tên hiển thị" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="slug">Tên người dùng</Label>
              <FormControl>
                <Input id="slug" placeholder="Tên người dùng" className="w-full" {...field} />
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
                <Input id="address" placeholder="Địa chỉ" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="gender">Giới tính</Label>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger className="w-full" id="gender">
                    <SelectValue placeholder="Giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EGender.Male.toString()}>Nam</SelectItem>
                    <SelectItem value={EGender.Female.toString()}>Nữ</SelectItem>
                    <SelectItem value={EGender.Others.toString()}>Khác</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summarise"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <Label htmlFor="summarise">Tóm tắt bản thân</Label>
              <FormControl>
                <Input id="summarise" placeholder="Tóm tắt bản thân" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <Label htmlFor="description">Mô tả</Label>
              <FormControl>
                <Textarea {...field} id="description" className="w-full" rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="large" variant="gradient" fullWidth className="md:col-span-2">
          Tiếp tục
        </Button>
      </form>
    </Form>
  );
};

export default Step1;