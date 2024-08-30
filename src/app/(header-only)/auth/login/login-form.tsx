'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginBodyType, loginSchema } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const onSubmit = async (values: LoginBodyType) => {
    setLoading(true);

    let callbackUrl = searchParams.get('callbackUrl');

    if (!callbackUrl?.startsWith(window.location.origin)) {
      callbackUrl = '/';
    }

    const res = await signIn('credentials', {
      ...values,
      callbackUrl,
      redirect: false,
    });

    setLoading(false);
    if (!res?.error) {
      router.push(callbackUrl);
    } else {
      toast.error('Email hoặc mật khẩu không đúng');
    }
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
        <Button type="submit" variant="gradient" size="large" fullWidth loading={loading}>
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
