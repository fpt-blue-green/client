import Header from '@/components/header';
import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<Readonly<MainLayoutProps>> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center container">{children}</main>
    </div>
  );
};

export default MainLayout;
