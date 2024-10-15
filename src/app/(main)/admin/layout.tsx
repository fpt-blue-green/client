import { FC, ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<Readonly<AdminLayoutProps>> = ({ children }) => {
  return <div>{children}</div>;
};
export default AdminLayout;
