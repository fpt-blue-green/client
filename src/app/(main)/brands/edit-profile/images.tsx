'use client';

import Paper from '@/components/custom/paper';
import { FC, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import AvatarUploader from '@/components/avatar-uploader';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { brandRequest, userRequest } from '@/request';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { RiEditFill } from 'react-icons/ri';
import BrandDetailsProps from './props';
import { ImagesBodyType, imagesSchema } from '@/schema-validations/brand.schema';
import CoverUploader from '@/components/cover-uploader';

const Images: FC<BrandDetailsProps> = ({ brand, mutate }) => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

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
        mutate().then(() => toast.success('Cập nhật ảnh thành công'));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const onError = (err: any) => {
    toast.error(err.cover.message);
  };

  return (
    <Paper>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col gap-10 mb-8">
              <FormField
                control={form.control}
                name="avatar"
                render={() => (
                  <FormItem className="flex flex-col items-center justify-center gap-4 my-auto">
                    <FormControl>
                      <AvatarUploader defaultSrc={brand.avatar} {...avatarRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={() => (
                  <div className="col-span-2 relative">
                    <CoverUploader {...coverRef} defaultSrc={brand.coverImg} />
                    <div className="absolute top-2 left-2 bg-primary-foreground px-3 rounded-sm text-foreground">
                      <p>Ảnh bìa</p>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="large" variant="gradient" className="font-bold h-12" loading={loading}>
                <RiEditFill />
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Paper>
  );
};
export default Images;
