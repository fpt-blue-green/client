import { Metadata } from 'next';
import TabList from './tabs-list';

export const metadata: Metadata = {
  title: 'Quản Lí Người Dùng',
};

const InfluencerManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Người Dùng</h1>
      <TabList />
    </div>
  );
};

export default InfluencerManagement;
