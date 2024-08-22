import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<Readonly<AuthLayoutProps>> = async ({ children }) => {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }

  return <>{children}</>;
};

export default AuthLayout;
