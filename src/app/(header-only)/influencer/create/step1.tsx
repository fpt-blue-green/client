'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GeneralBodyType, generalSchema } from '@/schema-validations/influencer.schema';
import { EGender } from '@/types/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

const Step1 = () => {
  const { data: session } = useSession();
  const form = useForm<GeneralBodyType>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      name: session?.user.name || '',
      address: '',
      summarize: '',
      description: '',
      gender: EGender.Male,
    },
  });

  const onSubmit = (values: GeneralBodyType) => {
    console.log(values);
  };

  return (
    <div className="space-y-10">
      <Progress value={100 / 7} className="h-3" />
      <h1 className="text-3xl font-semibold">Thông tin cơ bản của bạn</h1>
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
            name="summarize"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="summarize">Tóm tắt bản thân</Label>
                <FormControl>
                  <Input id="summarize" placeholder="Tóm tắt bản thân" className="w-full" {...field} />
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
    </div>
  );
};

export default Step1;
