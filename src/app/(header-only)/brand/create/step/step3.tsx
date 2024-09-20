'use client';

import { FC, useState } from 'react';
import DetailStepProps from './props';
import { useForm } from 'react-hook-form';
import { SocialBodyType, socialSchema } from '@/schema-validations/brand.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Step3: FC<DetailStepProps> = ({ profile }) => {
  const [loading] = useState(false);
  const form = useForm<SocialBodyType>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      websiteLink: profile.websiteLink,
      facebookLink: profile.facebookLink,
      tiktokLink: profile.tiktokLink,
      instagramLink: profile.instagramLink,
      youtubeLink: profile.youtubeLink,
    },
  });

  const onSubmit = (values: SocialBodyType) => {
    const data: SocialBodyType = Object.fromEntries(Object.entries(values).filter(([, value]) => !!value));
    if (!Object.keys(data).length) {
      toast.error('Vui lòng nhập ít nhất một đường dẫn');
      return;
    }
    // TODO: Call api
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="websiteLink"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="websiteLink">Website</Label>
              <FormControl>
                <Input id="websiteLink" type="url" placeholder="Website" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebookLink"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="facebookLink">Facebook</Label>
              <FormControl>
                <Input id="facebookLink" type="url" placeholder="Facebook" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiktokLink"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="tiktokLink">TikTok</Label>
              <FormControl>
                <Input id="tiktokLink" type="url" placeholder="TikTok" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagramLink"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="instagramLink">Instagram</Label>
              <FormControl>
                <Input id="instagramLink" type="url" placeholder="Instagram" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtubeLink"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="youtubeLink">YouTube</Label>
              <FormControl>
                <Input id="youtubeLink" type="url" placeholder="YouTube" className="w-full" {...field} />
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
