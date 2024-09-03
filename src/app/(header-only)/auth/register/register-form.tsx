'use client';
import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import config from '@/config';
import { registerSchema, RegisterType } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { authRequest } from '@/request';

interface IRegisterFormProps {}

const RegisterForm: FC<IRegisterFormProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<string>();
  const [loading, setIsLoading] = useState<boolean>(false);

  const useParams = useSearchParams();
  const currentRole = useParams.get('role');

  useEffect(() => {
    setRole(currentRole!);
  }, [currentRole]);

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      role: 0,
    },
  });

  const toggleShow = () => {
    setShowPass(!showPass);
  };

  const onSubmit = async (values: RegisterType) => {
    setIsLoading(true);

    const submitForm = {
      ...values,
      role: +role!,
    };

    const res = await authRequest.register(submitForm);
    console.log('res', res);
    setIsLoading(false);

    // if () {
    // } else {
    //   toast.error('Đã gặp sự cố trong quá trình đăng ký!');
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tên hiển thị" {...field} />
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
        <Button type="submit" variant="gradient" size="large" loading={loading} fullWidth>
          <Link href={{ pathname: config.routes.register.emailVerification, query: { email } }}>Đăng Ký</Link>
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
