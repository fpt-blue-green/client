'use client';

import { FC, useState } from 'react';
import AvatarUploader from '@/components/avatar-uploader';
import Paper from '@/components/custom/paper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GeneralBodyType, generalSchema } from '@/schema-validations/influencer.schema';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EGender } from '@/types/enum';
import { Textarea } from '@/components/ui/textarea';
import IInfluencer from '@/types/influencer';
import { AvatarBody, avatarSchema } from '@/schema-validations/user.schema';
import { useSession } from 'next-auth/react';
import { influencerRequest, userRequest } from '@/request';
import { toast } from 'sonner';
import AddressPicker from '@/components/address-picker';
import { KeyedMutator } from 'swr/_internal';

interface GeneralProps {
  influencer: IInfluencer;
  mutate: KeyedMutator<IInfluencer>;
}

const Details: FC<GeneralProps> = ({ influencer, mutate }) => {
  const { data: session, update } = useSession();
  const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const { data } = useSession<true>();

  const avatarForm = useForm<AvatarBody>({
    resolver: zodResolver(avatarSchema),
  });
  const avatarRef = avatarForm.register('avatar');

  const detailsForm = useForm<GeneralBodyType>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      fullName: influencer.fullName || '',
      address: influencer.address || '',
      summarise: influencer.summarise || '',
      slug: influencer.slug || '',
      description: influencer.description || '',
      gender: influencer.gender || EGender.Male,
    },
  });

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
        mutate().then(() => toast.success('Cập nhật ảnh đại diện thành công'));
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingAvatar(false);
    }
  };

  const onSubmitDetails = (values: GeneralBodyType) => {
    setLoadingDetails(true);
    influencerRequest
      .updateGeneralInfo(values)
      .then(() => {
        mutate().then(() => toast.success('Cập nhật thông tin cá nhân thành công'));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingDetails(false));
  };
  return (
    <div className="flex flex-col gap-4">
      <Form {...avatarForm}>
        <form onSubmit={avatarForm.handleSubmit(onSubmitAvatar)}>
          <Paper>
            <div className="flex flex-col h-full items-center">
              <FormField
                control={avatarForm.control}
                name="avatar"
                render={() => (
                  <FormItem className="flex flex-col items-center justify-center gap-4 my-auto">
                    <FormControl>
                      <AvatarUploader defaultSrc={influencer.avatar} {...avatarRef} />
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
            </div>
            <div className="flex justify-end mt-8">
              <Button type="submit" size="large" variant="gradient" className="max-md:w-full" loading={loadingAvatar}>
                Lưu ảnh mới
              </Button>
            </div>
          </Paper>
        </form>
      </Form>
      <Form {...detailsForm}>
        <form onSubmit={detailsForm.handleSubmit(onSubmitDetails)}>
          <Paper className="col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" className="w-full" type="email" defaultValue={data?.user.email} readOnly disabled />
              </div>
              <FormField
                control={detailsForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Họ và tên</Label>
                    <FormControl>
                      <Input {...field} id="name" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="slug">Biệt danh</Label>
                    <FormControl>
                      <Input {...field} id="slug" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="gender">Giới tính</Label>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        defaultValue={field.value.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Giới tính" />
                        </SelectTrigger>
                        <SelectContent defaultValue={influencer.gender}>
                          <SelectItem value={EGender.Male.toString()}>Nam</SelectItem>
                          <SelectItem value={EGender.Female.toString()}>Nữ</SelectItem>
                          <SelectItem value={EGender.Others.toString()}>Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="address">Địa chỉ</Label>
                    <FormControl>
                      <AddressPicker {...field} id="address" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="summarise"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="summarize">Tóm tắt</Label>
                    <FormControl>
                      <Input {...field} id="summarize" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <FormControl>
                      <Textarea {...field} id="description" className="w-full" rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-8 text-right">
              <Button type="submit" size="large" variant="gradient" className="max-md:w-full" loading={loadingDetails}>
                Lưu thay đổi
              </Button>
            </div>
          </Paper>
        </form>
      </Form>
    </div>
  );
};
export default Details;
