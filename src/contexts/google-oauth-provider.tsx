'use client';

import { FC, ReactNode } from 'react';
import config from '@/config';
import { GoogleOAuthProvider as Provider, GoogleLogin } from '@react-oauth/google';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { constants } from '@/lib/utils';

interface GoogleOAuthProviderProps {
  children: ReactNode;
}

export const GoogleLoginButton = () => {
  const { theme } = useTheme();

  return (
    <div style={{ colorScheme: 'light' }}>
      <GoogleLogin
        onSuccess={(res) => console.log(res)}
        onError={() => toast.error(constants.sthWentWrong)}
        theme={theme === 'light' ? 'outline' : 'filled_black'}
        context="signin"
        text="signin_with"
        width={384}
        login_uri={`${window.location.pathname}/login`}
      />
    </div>
  );
};

const GoogleOAuthProvider: FC<Readonly<GoogleOAuthProviderProps>> = ({ children }) => {
  return <Provider clientId={config.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}>{children}</Provider>;
};

export default GoogleOAuthProvider;
