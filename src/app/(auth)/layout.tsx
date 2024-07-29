import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<Readonly<MainLayoutProps>> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-96">{children}</main>
    </div>
  );
};

export default MainLayout;
