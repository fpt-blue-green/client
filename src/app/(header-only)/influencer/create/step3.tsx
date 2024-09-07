'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChannelBodyType, channelSchema } from '@/schema-validations/influencer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ProgressHeading from './progress-heading';
import { Channel } from '@/types/influencer';
import { EPlatform } from '@/types/enum';
import influencerRequest from '@/request/influencer.request';
import { useRouter } from 'next/navigation';
import config from '@/config';
import { toast } from 'sonner';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import { SocialProfile } from '@/types/utilities';
import { useDebounce } from '@/hooks';

interface Step3Props {
  channels: Channel[];
}

const Step3: FC<Step3Props> = ({ channels }) => {
  const router = useRouter();
  const form = useForm<ChannelBodyType>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      youtube: channels.find((c) => c.platform === EPlatform.YouTube)?.userName || 'test',
      instagram: channels.find((c) => c.platform === EPlatform.Instagram)?.userName || '',
      tiktok: channels.find((c) => c.platform === EPlatform.TitTok)?.userName || '',
    },
  });

  const count = {
    youtube: form.watch('youtube'),
    instagram: form.watch('instagram'),
    tiktok: form.watch('tiktok'),
  };

  const debounceCount = useDebounce(count, 500);

  const { data: youtubeSub } = useSWRImmutable<SocialProfile>(
    `/Utility/profile?platform=${EPlatform.YouTube}&channelId=${debounceCount.youtube}`,
    debounceCount.youtube ? fetcher : null,
  );
  const { data: instagramFlw } = useSWRImmutable<SocialProfile>(
    `/Utility/profile?platform=${EPlatform.Instagram}&channelId=${debounceCount.instagram}`,
    debounceCount.instagram ? fetcher : null,
  );
  const { data: tiktokFlw } = useSWRImmutable<SocialProfile>(
    `/Utility/profile?platform=${EPlatform.TitTok}&channelId=${debounceCount.tiktok}`,
    debounceCount.tiktok ? fetcher : null,
  );

  const onSubmit = (values: ChannelBodyType) => {
    const channelData: Channel[] = [];
    const mapping: { [key: string]: EPlatform } = {
      youtube: EPlatform.YouTube,
      instagram: EPlatform.Instagram,
      tiktok: EPlatform.TitTok,
    };

    for (const [key, value] of Object.entries(values)) {
      if (value) {
        channelData.push({
          platform: mapping[key],
          userName: value,
        });
      }
    }

    influencerRequest
      .updateChannels(channelData)
      .then(() => router.push(`${config.routes.influencer.create}?step=4`))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="space-y-10">
      <ProgressHeading step={3} title="Thêm các trang mạng xã hội của bạn" />
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
                value={youtubeSub ? youtubeSub.followersCount : ''}
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
                value={instagramFlw ? instagramFlw.followersCount : ''}
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
                value={tiktokFlw ? tiktokFlw.followersCount : ''}
              />
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
