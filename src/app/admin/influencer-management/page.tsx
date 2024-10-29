import InfluencerTable from './table';

const InfluencerManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Các Nhà Sáng Tạo</h1>
      <div className="mt-4">
        <InfluencerTable />
      </div>
    </div>
  );
};

export default InfluencerManagement;
