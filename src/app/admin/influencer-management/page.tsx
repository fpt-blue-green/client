import Table from '@/components/custom/data-table';
import columns from './columns';

const InfluencerManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Các Nhà Sáng Tạo</h1>
      <div>
        <Table columns={columns} url="/Influencers" />
      </div>
    </div>
  );
};

export default InfluencerManagement;
