import { Metadata } from 'next';
import List from './list';

export const metadata: Metadata = {
  title: 'Chiến dịch của tôi',
  description: 'Danh sách các chiến dịch đã tạo của bạn',
};

const MyCampaigns = () => {
  return (
    <div className="container my-16">
      <List />
    </div>
  );
};
export default MyCampaigns;
