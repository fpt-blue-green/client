'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import config from '@/config';
import { ChannelBodyType, channelSchema } from '@/schema-validations/influencer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const Step3 = () => {
  const form = useForm<ChannelBodyType>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      youtube: '',
      instagram: '',
      tiktok: '',
    },
  });

  const onSubmit = (values: ChannelBodyType) => {
    console.log(values);
  };

  return (
    <div className="space-y-10">
      <Progress value={(100 * 3) / 7} className="h-3" />
      <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />}>
        <Link href={{ pathname: config.routes.influencer.create, query: { step: 2 } }}>Trở lại</Link>
      </Button>
      <h1 className="text-3xl font-semibold">Thêm các trang mạng xã hội của bạn</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="youtube"
              render={() => (
                <FormItem className="md:col-span-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <FormControl>
                    <Input
                      id="youtube"
                      className="w-full"
                      inputClassName="-ml-2"
                      startAdornment="https://www.youtube.com/"
                      placeholder="example"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="max-md:hidden">Số người đăng ký</Label>
              <Input endAdornment={<span className="text-nowrap">người đăng ký</span>} className="w-full" readOnly />
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="instagram"
              render={() => (
                <FormItem className="md:col-span-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <FormControl>
                    <Input
                      id="instagram"
                      className="w-full"
                      inputClassName="-ml-2"
                      startAdornment="https://www.instagram.com/"
                      placeholder="example"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="max-md:hidden">Số người theo dõi</Label>
              <Input endAdornment={<span className="text-nowrap">người theo dõi</span>} className="w-full" readOnly />
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="tiktok"
              render={() => (
                <FormItem className="md:col-span-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <FormControl>
                    <Input
                      id="tiktok"
                      className="w-full"
                      inputClassName="-ml-2"
                      startAdornment="https://www.tiktok.com/@"
                      placeholder="example"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="max-md:hidden">Số người theo dõi</Label>
              <Input endAdornment={<span className="text-nowrap">người theo dõi</span>} className="w-full" readOnly />
            </div>
          </div>
          <Button type="submit" variant="gradient" size="large" fullWidth>
            Tiếp tục
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Step3;
