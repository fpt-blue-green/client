import { Metadata } from 'next';
import InfluencerTable from './table';

export const metadata: Metadata = {
  title: 'Quản Lí Người Dùng',
};

const InfluencerManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Người Dùng</h1>
      <div className="mt-4">
        <InfluencerTable />
      </div>
    </div>
  );
};

export default InfluencerManagement;
