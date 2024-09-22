'use client';

import { FC, useState } from 'react';
import DetailStepProps from './props';
import AvatarUploader from '@/components/avatar-uploader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ImagesBodyType, imagesSchema } from '@/schema-validations/brand.schema';
import CoverUploader from '@/components/cover-uploader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import config from '@/config';
import { toast } from 'sonner';
import { brandRequest, userRequest } from '@/request';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Step2: FC<DetailStepProps> = ({ profile, mutate }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();

  const form = useForm<ImagesBodyType>({
    resolver: zodResolver(imagesSchema),
  });

  const avatarRef = form.register('avatar');
  const coverRef = form.register('cover');

  const onSubmit = (values: ImagesBodyType) => {
    setLoading(true);
    const uploader: Promise<any>[] = [
      values.avatar[0] ? userRequest.changeAvatar(values.avatar[0] as File) : Promise.resolve(),
    ];
    if (values.cover.length > 0) {
      uploader.push(brandRequest.changeCover(values.cover[0] as File));
    }

    Promise.all(uploader)
      .then(([res]) => {
        if (res) {
          update({
            ...session,
            user: {
              ...session?.user,
              image: res.data,
            },
          });
        }
        mutate().then(() => router.push(config.routes.brand.create(3)));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const onError = (err: any) => {
    toast.error(err.cover.message);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="relative">
          <FormField
            control={form.control}
            name="cover"
            render={() => (
              <FormItem>
                <FormControl>
                  <CoverUploader {...coverRef} defaultSrc={profile.coverImg} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={() => (
              <FormItem className="absolute -bottom-1/3 left-1/2 -translate-x-1/2">
                <FormControl>
                  <AvatarUploader {...avatarRef} defaultSrc={profile.avatar} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant="gradient" size="large" className="mt-32" fullWidth loading={loading}>
          Tiếp tục
        </Button>
        {profile.avatar && (
          <div className="flex justify-center mt-8">
            <Button type="button" variant="link" className="text-muted-foreground" asChild>
              <Link href={config.routes.brand.create(3)}>Bỏ qua bước này</Link>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default Step2;
