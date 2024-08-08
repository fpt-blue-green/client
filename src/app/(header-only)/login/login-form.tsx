'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { LoginBodyType, loginSchema } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toggleShow = () => {
    setShowPass(!showPass);
  };

  const onSubmit = (values: LoginBodyType) => {
    login(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  {...field}
                  endAdornment={
                    <Button type="button" variant="ghost" size="icon" onClick={toggleShow}>
                      {showPass ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Button>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="gradient" size="large" fullWidth loading={isLoading}>
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
