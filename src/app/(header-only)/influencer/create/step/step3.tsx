'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChannelsBodyType, channelsSchema } from '@/schema-validations/influencer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { EPlatform, PlatformData } from '@/types/enum';
import influencerRequest from '@/request/influencer.request';
import { useRouter } from 'next/navigation';
import config from '@/config';
import { toast } from 'sonner';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import { ISocialProfile } from '@/types/utilities';
import { useDebounce } from '@/hooks';
import DetailStepProps from './props';
import Link from 'next/link';
import { Cross2Icon } from '@radix-ui/react-icons';

const Step3: FC<DetailStepProps> = ({ profile, mutate }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<ChannelsBodyType>({
    resolver: zodResolver(channelsSchema),
    defaultValues: {
      channels: Object.entries(PlatformData).map(([key]) => {
        const platform = +key as unknown as EPlatform;
        const channel = profile.channels.find((c) => c.platform === platform);
        return {
          id: channel?.id,
          platform,
          userName: channel?.userName || '',
          show: profile.channels.some((c) => c.platform === platform),
        };
      }),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'channels',
  });

  const onSubmit = (values: ChannelsBodyType) => {
    setLoading(true);
    influencerRequest
      .updateChannels(values.channels.filter((c) => c.show))
      .then(() => {
        mutate().then(() => router.push(config.routes.influencer.create(4)));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  // Handle trường hợp không có channels nào được gửi đi
  const handleError = (errors: any) => {
    const message = errors.channels.root?.message;
    if (message) {
      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-6">
        {fields.map((field, index) => (
          <ChannelInput key={field.id} form={form} index={index} loading={loading} />
        ))}
        <Button type="submit" variant="gradient" size="large" fullWidth loading={loading}>
          Tiếp tục
        </Button>
        {profile.channels.length > 0 && (
          <div className="text-center">
            <Button type="button" variant="link" className="text-muted-foreground" asChild>
              <Link href={config.routes.influencer.create(4)}>Bỏ qua bước này</Link>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

interface ChannelInputProps {
  form: UseFormReturn<ChannelsBodyType, any, undefined>;
  index: number;
  loading: boolean;
}

const ChannelInput: FC<ChannelInputProps> = ({ form, index, loading }) => {
  const { platform, userName, show } = form.watch(`channels.${index}`);
  const debounceUsername = useDebounce(userName, 500);
  const { name, url, followerText, Icon } = PlatformData[platform];
  const { data } = useSWRImmutable<ISocialProfile>(
    `/Utility/profile?platform=${platform}&channelId=${debounceUsername}`,
    show && userName ? fetcher : null,
  );

  const handleShow = () => {
    form.setValue(`channels.${index}.show`, true);
  };

  const handleHidden = () => {
    // TODO: Call API Delete channel
    form.setValue(`channels.${index}`, { platform, show: false, userName: '' });
  };

  return show ? (
    <div className="grid md:grid-cols-5 grid-cols-1 gap-4 items-start">
      <FormField
        control={form.control}
        name={`channels.${index}.userName`}
        render={({ field }) => (
          <FormItem className="md:col-span-3">
            <Label htmlFor={name}>{name}</Label>
            <FormControl>
              <Input
                id={name}
                className="w-full"
                inputClassName="-ml-2"
                startAdornment={
                  <span className="flex items-center gap-2">
                    <Icon />
                    {url}
                  </span>
                }
                placeholder="example"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-end gap-4 md:col-span-2">
        <div className="flex-1 space-y-2">
          <Label className="max-md:hidden">Số {followerText}</Label>
          <Input
            endAdornment={<span className="text-nowrap">{followerText}</span>}
            tabIndex={-1}
            className="w-full"
            value={data?.followersCount || ''}
            disabled
          />
        </div>
        <Button variant="ghost" className="size-12 flex-shrink-0" size="icon" onClick={handleHidden} disabled={loading}>
          <Cross2Icon className="size-5" />
        </Button>
      </div>
    </div>
  ) : (
    <Button
      variant="outline"
      size="large"
      className="h-12"
      fullWidth
      startIcon={<Icon size={20} />}
      onClick={handleShow}
    >
      {name}
    </Button>
  );
};

export default Step3;
