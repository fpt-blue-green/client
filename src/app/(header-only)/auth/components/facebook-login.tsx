'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FaFacebook } from 'react-icons/fa6';
import IProviderProps from './provider-props';

const FacebookLogin = ({ method, role }: IProviderProps) => {
  const login = () => {
    signIn('facebook', { callbackUrl: `/two-factor/${method}?p=3${role ? `&r=${role}` : ''}` });
  };

  return (
    <Button
      variant="outline"
      startIcon={<FaFacebook className="text-[#0866FF]" />}
      size="large"
      fullWidth
      onClick={login}
    >
      Đăng {method === 'sign-in' ? 'nhập' : 'ký'} với Facebook
    </Button>
  );
};

export default FacebookLogin;
