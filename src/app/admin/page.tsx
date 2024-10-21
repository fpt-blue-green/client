import { FaBox, FaGlobe, FaPeopleGroup } from 'react-icons/fa6';
import Card from './components/card';
import { FluctuationType } from '@/types/enum';
import { FaProjectDiagram } from 'react-icons/fa';
import OverviewChart from './components/chart';

// Mock
const details = {
  quantity: 1000000,
  fluctuationValue: 20,
  fluctuationType: FluctuationType.ASC,
};

const Overview = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-bold">Phân Tích Số Liệu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card title="Nhãn Hàng" icon={<FaGlobe className="text-muted-foreground" />} details={details} />
        <Card title="Nhà Sáng Tạo" icon={<FaPeopleGroup className="text-muted-foreground" />} details={details} />
        <Card title="Chiến Dịch" icon={<FaProjectDiagram className="text-muted-foreground" />} details={details} />
        <Card title="Gói" icon={<FaBox className="text-muted-foreground" />} details={details} />
      </div>
    </div>
  );
};

export default Overview;
