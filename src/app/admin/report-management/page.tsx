import ReportTable from './table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý báo cáo',
};

const TagManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Các Báo Cáo</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ báo cáo của hệ thống!</p>
      <div className="mt-4">
        <ReportTable />
      </div>
    </div>
  );
};

export default TagManagement;
