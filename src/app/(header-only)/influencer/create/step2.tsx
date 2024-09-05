'use client';

import AvatarUploader from '@/components/avatar-uploader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { AvatarBody, avatarSchema } from '@/schema-validations/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ProgressHeading from './progress-heading';

const Step2 = () => {
  const form = useForm<AvatarBody>({
    resolver: zodResolver(avatarSchema),
  });

  const avatarRef = form.register('avatar');

  const onSubmit = (values: AvatarBody) => {
    const formData = new FormData();
    formData.append('avatar', values.avatar[0]);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <ProgressHeading step={2} title="Ảnh đại diện" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="avatar"
            render={() => (
              <FormItem className="flex flex-col items-center justify-center gap-4 my-auto">
                <FormControl>
                  <AvatarUploader {...avatarRef} />
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
          <Button type="submit" variant="gradient" size="large" fullWidth>
            Tiếp tục
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Step2;
