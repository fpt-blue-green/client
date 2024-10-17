import AdminHeader from '@/components/ui/admin-header';
import AdminSideBar from '@/components/ui/admin-sidebar';
import { FC, ReactNode } from 'react';
import { items } from './sidebar-items';
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<Readonly<AdminLayoutProps>> = ({ children }) => {
  return (
    <div className="flex">
      <AdminSideBar items={items} />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 md:pt-6 pt-3">{children}</main>
      </div>
    </div>
  );
};
export default AdminLayout;
