'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FaFacebook } from 'react-icons/fa6';

const FacebookLogin = () => {
  const login = () => {
    signIn('facebook', { callbackUrl: '/' });
  };

  return (
    <Button
      variant="outline"
      startIcon={<FaFacebook className="text-[#0866FF]" />}
      size="large"
      fullWidth
      onClick={login}
    >
      Đăng nhập với Facebook
    </Button>
  );
};

export default FacebookLogin;
