'use client';
import { FC, useState } from 'react';
import Paper from '@/components/custom/paper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';
import { ChannelBodyType, ChannelsBodyType, channelsSchema } from '@/schema-validations/influencer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EPlatform, PlatformData } from '@/types/enum';
import IInfluencer from '@/types/influencer';

interface ISocialAccountsProps {
  influencer: IInfluencer;
}

const SocialMedias: FC<ISocialAccountsProps> = ({ influencer }) => {
  console.log('channels', influencer.channels);
  const [loading, setLoading] = useState(false);
  const form = useForm<ChannelsBodyType>({
    resolver: zodResolver(channelsSchema),
    defaultValues: {
      channels: Object.entries(PlatformData).map(([key]) => {
        const platform = +key as unknown as EPlatform;
        const channel = influencer.channels.find((c) => c.platform === platform);
        return {
          id: channel?.id,
          platform,
          userName: channel?.userName || '',
          show: influencer.channels.some((c) => c.platform === platform),
        };
      }),
    },
  });

  const onSubmit = (values: ChannelBodyType) => {};

  return (
    <Paper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <FormControl>
                    <Input
                      id="youtube"
                      className="w-full"
                      inputClassName="-ml-2"
                      startAdornment="https://www.youtube.com/"
                      placeholder="example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="max-md:hidden">Số người đăng ký</Label>
              <Input
                endAdornment={<span className="text-nowrap">người đăng ký</span>}
                className="w-full"
                readOnly
                value={''}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <FormControl>
                    <Input
                      id="instagram"
                      className="w-full"
                      inputClassName="-ml-2"
                      startAdornment="https://www.instagram.com/"
                      placeholder="example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="max-md:hidden">Số người theo dõi</Label>
              <Input
                endAdornment={<span className="text-nowrap">người theo dõi</span>}
                className="w-full"
                readOnly
                value={''}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <FormControl>
                    <Input
                      id="tiktok"
                      className="w-full"
                      inputClassName="-ml-2"
                      startAdornment="https://www.tiktok.com/@"
                      placeholder="example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="max-md:hidden">Số người theo dõi</Label>
              <Input
                endAdornment={<span className="text-nowrap">người theo dõi</span>}
                className="w-full"
                readOnly
                value={''}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="gradient" size="large" className="p-6" loading={loading}>
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Form>
    </Paper>
  );
};

export default SocialMedias;
