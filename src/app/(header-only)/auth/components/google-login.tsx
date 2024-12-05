'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import IProviderProps from './provider-props';

const GoogleLogin = ({ method, role }: IProviderProps) => {
  const login = () => {
    signIn('google', { callbackUrl: `/two-factor/${method}?p=2${role ? `&r=${role}` : ''}` });
  };

  return (
    <Button variant="outline" startIcon={<FcGoogle />} size="large" fullWidth onClick={login}>
      Đăng {method === 'sign-in' ? 'nhập' : 'ký'} với Google
    </Button>
  );
};

export default GoogleLogin;
