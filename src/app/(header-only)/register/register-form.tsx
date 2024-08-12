'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { RegisterBodyType, registerSchema } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });
  const onSubmit = (values: RegisterBodyType) => {
    alert('Dispatched register action!');
  };
  const toggleShow = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tên người dùng" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  type={!isPasswordHidden ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  {...field}
                  endAdornment={
                    <Button type="button" variant="ghost" size="icon" onClick={toggleShow}>
                      {!isPasswordHidden ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Button>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="gradient" size="large" fullWidth>
          Đăng Ký
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
