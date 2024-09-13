'use client';

import { FC, useState } from 'react';
import AvatarUploader from '@/components/avatar-uploader';
import Paper from '@/components/custom/paper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import IUser from '@/types/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generalSchema } from '@/schema-validations/influencer.schema';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EGender } from '@/types/enum';
import { Textarea } from '@/components/ui/textarea';
import IInfluencer from '@/types/influencer';
import { avatarSchema } from '@/schema-validations/user.schema';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { influencerRequest } from '@/request';
import { toast } from 'sonner';
interface GeneralProps {
  user: IUser;
  influencer: IInfluencer;
}

const Details: FC<GeneralProps> = ({ user, influencer }) => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const combinedSchema = generalSchema.merge(avatarSchema);
  const { data } = useSession<true>();

  type CombinedFormType = z.infer<typeof combinedSchema>;
  const form = useForm<CombinedFormType>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      fullName: influencer.fullName || '',
      summarise: influencer.summarise || '',
      description: influencer.description || '',
      address: influencer.address || '',
      gender: influencer.gender || EGender.Male,
      slug: influencer.slug || '',
    },
  });

  const avatarRef = form.register('avatar');

  const onSubmit = async (values: CombinedFormType) => {
    setLoading(true);
    try {
      await influencerRequest.updateGeneralInfo(values);
      const avatar = values.avatar[0];
      if (avatar) {
        const avatarRes = await influencerRequest.changeAvatar(avatar);
        if (avatarRes.data) {
          await update({
            ...session,
            user: {
              ...session?.user,
              image: avatarRes.data,
            },
          });
        }
      }
      toast.success('Cập nhật thông tin thành công.');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Paper>
          <div className="flex flex-col h-full items-center">
            <FormField
              control={form.control}
              name="avatar" // ! fix new hook form
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
        </Paper>
        <Paper className="col-span-1 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" className="w-full" type="email" defaultValue={data?.user.email} readOnly disabled />
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Tên</Label>
                  <FormControl>
                    <Input {...field} id="name" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="address">Địa chỉ</Label>
                  <FormControl>
                    <Input {...field} id="address" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
              control={form.control}
              name="summarise"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <Label htmlFor="summarize">Tóm tắt</Label>
                  <FormControl>
                    <Input {...field} id="summarize" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
            <Button type="submit" size="large" variant="gradient" loading={loading}>
              Lưu thay đổi
            </Button>
          </div>
        </Paper>
      </form>
    </Form>
  );
};
export default Details;
