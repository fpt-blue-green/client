'use client';

import { FC, ReactNode } from 'react';
import config from '@/config';
import { GoogleOAuthProvider as Provider } from '@react-oauth/google';

interface GoogleOAuthProviderProps {
  children: ReactNode;
}

const GoogleOAuthProvider: FC<Readonly<GoogleOAuthProviderProps>> = ({ children }) => {
  return <Provider clientId={config.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}>{children}</Provider>;
};

export default GoogleOAuthProvider;
