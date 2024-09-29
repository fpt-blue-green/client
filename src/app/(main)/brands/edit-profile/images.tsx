'use client';

import Paper from '@/components/custom/paper';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import AvatarUploader from '@/components/avatar-uploader';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AvatarBody, avatarSchema } from '@/schema-validations/user.schema';
import { Button } from '@/components/ui/button';
import { userRequest } from '@/request';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { RiEditFill } from 'react-icons/ri';
import BrandDetailsProps from './props';

const Images: FC<BrandDetailsProps> = ({ brand, mutate }) => {
  const { data: session, update } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundImage, setBackgroundImage] = useState();
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);

  const avatarForm = useForm<AvatarBody>({
    resolver: zodResolver(avatarSchema),
  });
  const avatarRef = avatarForm.register('avatar');

  const handleUploadBackgroundImg = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmitAvatar = async (values: AvatarBody) => {
    const avatar = values.avatar?.[0] as File;
    setLoadingAvatar(true);
    try {
      const res = await userRequest.changeAvatar(avatar);
      if (res.data) {
        await update({
          ...session,
          user: {
            ...session?.user,
            image: res.data,
          },
        });
        // mutate().then(() => toast.success('Cập nhật ảnh đại diện thành công'));
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingAvatar(false);
    }
  };

  const handleOnChangeImage = (event: ChangeEvent<HTMLInputElement>) => {};

  const handleOnBackgroundImgClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = () => {
    setLoading(true);
    // Call API
    //     .then(() => {
    //       mutate().then(() => {
    //         toast.success('Bạn cập nhật thư viện ảnh thành công');
    //       });
    //     })
    //     .catch((err) => toast.error(err.message))
    //     .finally(() => setLoading(false));
  };
  return (
    <Paper>
      <div>
        <Form {...avatarForm}>
          <form onSubmit={avatarForm.handleSubmit(onSubmitAvatar)}>
            <div className="flex flex-col gap-10 mb-8">
              <FormField
                control={avatarForm.control}
                name="avatar"
                render={() => (
                  <FormItem className="flex flex-col items-center justify-center gap-4 my-auto">
                    <FormControl>
                      <AvatarUploader
                        defaultSrc="https://img.freepik.com/premium-photo/boy-with-anime-character-his-hoodie_662214-103222.jpg"
                        {...avatarRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={avatarForm.control}
                name="avatar"
                render={() => (
                  <div className="col-span-2 relative">
                    <Image
                      className="w-full max-h-[480px] object-cover cursor-pointer hover:opacity-80 rounded-md"
                      src="https://d5ik1gor6xydq.cloudfront.net/buyers/194517/17268433977072098.webp"
                      alt="Brand_Avatar"
                      width={800}
                      height={400}
                      onClick={handleOnBackgroundImgClick}
                    />
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleOnChangeImage}
                    />
                    <div className="absolute top-2 left-2 bg-primary-foreground px-3 rounded-sm text-foreground">
                      <p>Ảnh bìa</p>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSaveChanges}
                size="large"
                variant="gradient"
                className="font-bold h-12"
                loading={loading}
              >
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
