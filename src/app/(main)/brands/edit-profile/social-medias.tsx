'use client';

import { ChangeEvent, FC, useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { SocialBodyType, socialSchema } from '@/schema-validations/brand.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { brandRequest } from '@/request';
import { constants } from '@/lib/utils';
import BrandDetailsProps from './props';
import Paper from '@/components/custom/paper';

const SocialMedias: FC<BrandDetailsProps> = ({ brand, mutate }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<SocialBodyType>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      websiteUrl: brand.websiteUrl || undefined,
      facebookUrl: brand.facebookUrl || undefined,
      tiktokUrl: brand.tiktokUrl || undefined,
      instagramUrl: brand.instagramUrl || undefined,
      youtubeUrl: brand.youtubeUrl || undefined,
    },
  });

  const onSubmit = (values: SocialBodyType) => {
    const isOneItemAtLeast = Object.entries(values).filter(([, value]) => !!value).length > 0;
    if (!isOneItemAtLeast) {
      toast.error('Vui lòng nhập ít nhất một đường dẫn');
      return;
    }
    setLoading(true);
    console.log('values', values);
    brandRequest
      .addSocialLink(values)
      .then(() => mutate().then(() => toast.success('Cập nhật tài khoản mạng xã hội thành công.')))
      .catch((err) => toast.error(err.message || constants.sthWentWrong));
  };

  return (
    <Paper>
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <Label className="text-base" htmlFor="websiteUrl">
                  Website
                </Label>
                <FormControl>
                  <Input
                    id="websiteUrl"
                    type="url"
                    placeholder="Nhập đường dẫn trang web"
                    className="w-full"
                    {...field}
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
                <Label className="text-base" htmlFor="facebookUrl">
                  Facebook
                </Label>
                <FormControl>
                  <Input
                    id="facebookUrl"
                    type="url"
                    placeholder="Nhập đường dẫn Facebook"
                    className="w-full"
                    {...field}
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
                <Label className="text-base" htmlFor="tiktokUrl">
                  TikTok
                </Label>
                <FormControl>
                  <Input id="tiktokUrl" type="url" placeholder="Nhập đường dẫn TikTok" className="w-full" {...field} />
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
                <Label className="text-base" htmlFor="instagramUrl">
                  Instagram
                </Label>
                <FormControl>
                  <Input
                    id="instagramUrl"
                    type="url"
                    placeholder="Nhập đường dẫn Instagram"
                    className="w-full"
                    {...field}
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
                <Label className="text-base" htmlFor="youtubeUrl">
                  YouTube
                </Label>
                <FormControl>
                  <Input
                    id="youtubeUrl"
                    type="url"
                    placeholder="Nhập đường dẫn YouTube"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button size="large" variant="gradient" className="font-bold h-12" loading={loading}>
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Form>
    </Paper>
  );
};

export default SocialMedias;
