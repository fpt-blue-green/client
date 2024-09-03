'use client';
import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import config from '@/config';
import { registerAsBrandSchema, RegisterAsBrandType } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface IRegisterAsBrandFormProps {}

const RegisterAsBrandForm: FC<IRegisterAsBrandFormProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [showPass, setShowPass] = useState(false);

  const form = useForm<RegisterAsBrandType>({
    resolver: zodResolver(registerAsBrandSchema),
    defaultValues: {
      fullName: '',
      brandName: '',
      email: '',
      password: '',
    },
  });

  const toggleShow = () => {
    setShowPass(!showPass);
  };

  const onSubmit = (values: RegisterAsBrandType) => {
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
          name="brandName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tên thương hiệu" {...field} />
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
                <Input
                  placeholder="Email"
                  {...field}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    field.onChange(e);
                  }}
                />
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
          <Link href={{ pathname: config.routes.brand.emailVerification, query: { email } }}>Đăng Ký</Link>
        </Button>
      </form>
    </Form>
  );
};

export default RegisterAsBrandForm;
