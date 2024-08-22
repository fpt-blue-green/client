'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  const login = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <Button variant="outline" startIcon={<FcGoogle />} size="large" fullWidth onClick={login}>
      Đăng nhập với Google
    </Button>
  );
};

export default GoogleLogin;
