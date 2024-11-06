import AdminActionTable from './table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý hành động quản trị viên',
  description: 'Theo dõi các hành động của quản trị viên',
};

const ActionManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Các Hoạt Động</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ hoạt động của Admin!</p>
      <div className="mt-4">
        <AdminActionTable />
      </div>
    </div>
  );
};

export default ActionManagement;
