'use client';

import AvatarUploader from '@/components/avatar-uploader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { AvatarBody, avatarSchema } from '@/schema-validations/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ProgressHeading from '../progress-heading';
import { useSession } from 'next-auth/react';
import influencerRequest from '@/request/influencer.request';
import { useRouter } from 'next/navigation';
import config from '@/config';
import { toast } from 'sonner';
import Link from 'next/link';
import { FC } from 'react';
import DetailStepProps from './props';

const Step2: FC<DetailStepProps> = ({ profile }) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const form = useForm<AvatarBody>({
    resolver: zodResolver(avatarSchema),
  });

  const avatarRef = form.register('avatar');

  const onSubmit = async (values: AvatarBody) => {
    const avatar = values.avatar[0];
    try {
      const res = await influencerRequest.changeAvatar(avatar);
      if (res.data) {
        await update({
          ...session,
          user: {
            ...session?.user,
            image: res.data,
          },
        });
      }
      router.push(`${config.routes.influencer.create}?step=3`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 items-center">
        {session && (
          <FormField
            control={form.control}
            name="avatar"
            render={() => (
              <FormItem className="flex flex-col items-center justify-center gap-4 my-auto">
                <FormControl>
                  <AvatarUploader {...avatarRef} defaultSrc={profile.avatar} />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground text-center">
                  Được phép *.jpeg, *.jpg, *.png, *.gif
                  <br />
                  kích thước tối đa 3 Mb
                </p>
              </FormItem>
            )}
          />
        )}
        <Button type="submit" variant="gradient" size="large" fullWidth>
          Tiếp tục
        </Button>
        <Button type="button" variant="link" className="text-muted-foreground" asChild>
          <Link href={{ pathname: config.routes.influencer.create, query: { step: 3 } }}>Bỏ qua bước này</Link>
        </Button>
      </form>
    </Form>
  );
};

export default Step2;
