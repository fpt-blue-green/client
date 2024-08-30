'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerAsInfluencerSchema } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { RegisterAsInfluencerType } from '@/schema-validations/auth.schema';
import Link from 'next/link';
import config from '@/config';

const RegisterAsInfluencerForm = () => {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<RegisterAsInfluencerType>({
    resolver: zodResolver(registerAsInfluencerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const toggleShow = () => {
    setShowPass(!showPass);
  };

  const onSubmit = (values: RegisterAsInfluencerType) => {
    console.log(values);
    alert('You clicked register!');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Họ và tên" {...field} />
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
        <Button type="submit" variant="gradient" size="large" fullWidth>
          <Link href={config.routes.influencer.emailVerification}>Đăng Ký</Link>
        </Button>
      </form>
    </Form>
  );
};

export default RegisterAsInfluencerForm;
