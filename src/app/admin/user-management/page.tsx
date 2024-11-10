import { Metadata } from 'next';
import InfluencerTable from './table';

export const metadata: Metadata = {
  title: 'Quản Lí Người Dùng',
};

const InfluencerManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Người Dùng</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ người dùng của hệ thống!</p>
      <div className="mt-4">
        <InfluencerTable />
      </div>
    </div>
  );
};

export default InfluencerManagement;
