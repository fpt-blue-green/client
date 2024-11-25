import OverviewChart from './components/chart';
import CardCampaign from './components/card-campaign';
import Paper from '@/components/custom/paper';
import { Metadata } from 'next';
import AnalyticsCards from './analytics-cards';
import { PieChartsRoleCount } from './piechart-role-count';
import { PieChartsJobStatusCount } from './piechart-jobstatus-count';

// Mock
const campaignCardDetails = {
  imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiU10iYCU6v7GfydlzEq30Ctqj85cZr-C4bg&s',
  title: 'MPA Project',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam earum quo culpa, quas sed est cumque sit esse reprehenderit quasi repellat fugit cupiditate consequuntur distinctio voluptatem consectetur porro tenetur odit!',
  budget: 500000,
};
// Mock data

export const metadata: Metadata = {
  title: 'Số liệu thống kê',
};

const Overview = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-bold">Chào Mừng Trở Lại!</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là số liệu phân tích của hệ thống gần đây!</p>
      <AnalyticsCards />
      <div className="grid grid-cols-1 lg:grid-cols-11 mt-4 gap-4">
        <Paper className="md:col-span-7">
          <OverviewChart />
        </Paper>
        <Paper className="md:col-span-4">
          <PieChartsJobStatusCount />
        </Paper>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-11 my-8 gap-4">
        <Paper className="md:col-span-7">
          <h3 className="font-semibold">Danh sách người dùng có doanh thu hàng đầu</h3>
          <p className="text-muted-foreground text-sm">Khoảng 110 chiến dịch tháng này.</p>
          <div className="mt-8 flex flex-col gap-8">
            <CardCampaign details={campaignCardDetails} />
            <CardCampaign details={campaignCardDetails} />
            <CardCampaign details={campaignCardDetails} />
            <CardCampaign details={campaignCardDetails} />
            <CardCampaign details={campaignCardDetails} />
          </div>
        </Paper>
        <Paper className="md:col-span-4">
          <PieChartsRoleCount />
        </Paper>
      </div>
    </div>
  );
};

export default Overview;
