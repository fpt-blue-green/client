'use client';

import { useState } from 'react';
import Paper from '@/components/custom/paper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangePasswordBodyType, changePasswordSchema } from '@/schema-validations/influencer-account.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';

const Security = () => {
  const [showPass, setShowPass] = useState(false);

  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const toggleShow = () => {
    setShowPass(!showPass);
  };

  const onSubmit = async (values: ChangePasswordBodyType) => {
    console.log(values);
  };

  return (
    <Paper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Mật khẩu cũ"
                    className="w-full"
                    {...field}
                    endAdornment={
                      <Button type="button" variant="ghost" size="icon" onClick={toggleShow} tabIndex={-1}>
                        {showPass ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Mật khẩu mới"
                    className="w-full"
                    {...field}
                    endAdornment={
                      <Button type="button" variant="ghost" size="icon" onClick={toggleShow} tabIndex={-1}>
                        {showPass ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Xác nhận mật khẩu"
                    className="w-full"
                    {...field}
                    endAdornment={
                      <Button type="button" variant="ghost" size="icon" onClick={toggleShow} tabIndex={-1}>
                        {showPass ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Lưu thay đổi</Button>
          </div>
        </form>
      </Form>
    </Paper>
  );
};
export default Security;
