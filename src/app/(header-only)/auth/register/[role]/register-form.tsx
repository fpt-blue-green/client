'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import config from '@/config';
import { registerSchema, RegisterBodyType } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { authRequest } from '@/request';
import { ERole } from '@/types/enum';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface IRegisterFormProps {
  role: string;
}

const RegisterForm: FC<IRegisterFormProps> = ({ role }) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      role: role === 'influencer' ? ERole.Influencer : ERole.Brand,
    },
  });

  const toggleShow = () => {
    setShowPass(!showPass);
  };

  const onSubmit = (values: RegisterBodyType) => {
    setLoading(true);
    authRequest
      .register(values)
      .then(() => router.push(`${config.routes.register.emailVerification}?email=${form.getValues().email}`))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
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
        <Button type="submit" variant="gradient" size="large" loading={loading} fullWidth>
          Đăng Ký
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
