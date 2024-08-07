'use client';

import { FC, ReactNode } from 'react';
import config from '@/config';
import { GoogleOAuthProvider as Provider, GoogleLogin } from '@react-oauth/google';
import { useTheme } from 'next-themes';

interface GoogleOAuthProviderProps {
  children: ReactNode;
}

export const GoogleLoginButton = () => {
  const { theme } = useTheme();

  return (
    <GoogleLogin
      onSuccess={(res) => console.log(res)}
      theme={theme === 'light' ? 'outline' : 'filled_black'}
      width={384}
    />
  );
};

const GoogleOAuthProvider: FC<Readonly<GoogleOAuthProviderProps>> = ({ children }) => {
  return <Provider clientId={config.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}>{children}</Provider>;
};

export default GoogleOAuthProvider;
