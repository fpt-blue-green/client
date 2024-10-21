import AdminHeader from '@/components/admin-header';
import AdminSideBar from '@/components/admin-sidebar';
import { FC, ReactNode } from 'react';
import { items } from './sidebar-items';
import { ScrollArea } from '@/components/ui/scroll-area';
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<Readonly<AdminLayoutProps>> = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <AdminSideBar items={items} />
      </div>
      <div className="flex-1 flex flex-col h-screen">
        <AdminHeader />
        <ScrollArea className="flex-1 h-[calc(100vh-64px)] mt-6">{children}</ScrollArea>
      </div>
    </div>
  );
};
export default AdminLayout;
