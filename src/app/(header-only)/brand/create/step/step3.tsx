'use client';

import { ChangeEvent, FC, useState } from 'react';
import DetailStepProps from './props';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { SocialBodyType, socialSchema } from '@/schema-validations/brand.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { brandRequest } from '@/request';
import { useRouter } from 'next/navigation';
import config from '@/config';
import { constants } from '@/lib/utils';

const Step3: FC<DetailStepProps> = ({ profile, mutate }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<SocialBodyType>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      websiteUrl: profile.websiteUrl || undefined,
      facebookUrl: profile.facebookUrl || undefined,
      tiktokUrl: profile.tiktokUrl || undefined,
      instagramUrl: profile.instagramUrl || undefined,
      youtubeUrl: profile.youtubeUrl || undefined,
    },
  });

  const onSubmit = (values: SocialBodyType) => {
    const data: SocialBodyType = Object.fromEntries(Object.entries(values).filter(([, value]) => !!value));
    if (!Object.keys(data).length) {
      toast.error('Vui lòng nhập ít nhất một đường dẫn');
      return;
    }

    setLoading(true);
    brandRequest
      .addSocialLink(values)
      .then(() => mutate().then(() => router.push(config.routes.brands.details(profile.id))))
      .catch((err) => toast.error(err.message || constants.sthWentWrong));
  };

  const handleChange = (field: ControllerRenderProps<SocialBodyType>) => (e: ChangeEvent<HTMLInputElement>) => {
    let value = undefined;
    if (e.target.value) value = e.target.value;
    field.onChange(value);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="websiteUrl">Website</Label>
              <FormControl>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="Website"
                  className="w-full"
                  {...field}
                  onChange={handleChange(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebookUrl"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="facebookUrl">Facebook</Label>
              <FormControl>
                <Input
                  id="facebookUrl"
                  type="url"
                  placeholder="Facebook"
                  className="w-full"
                  {...field}
                  onChange={handleChange(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiktokUrl"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="tiktokUrl">TikTok</Label>
              <FormControl>
                <Input
                  id="tiktokUrl"
                  type="url"
                  placeholder="TikTok"
                  className="w-full"
                  {...field}
                  onChange={handleChange(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagramUrl"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="instagramUrl">Instagram</Label>
              <FormControl>
                <Input
                  id="instagramUrl"
                  type="url"
                  placeholder="Instagram"
                  className="w-full"
                  {...field}
                  onChange={handleChange(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtubeUrl"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="youtubeUrl">YouTube</Label>
              <FormControl>
                <Input
                  id="youtubeUrl"
                  type="url"
                  placeholder="YouTube"
                  className="w-full"
                  {...field}
                  onChange={handleChange(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="large" variant="gradient" fullWidth loading={loading}>
          Tiếp tục
        </Button>
      </form>
    </Form>
  );
};

export default Step3;
