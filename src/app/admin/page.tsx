import OverviewChart from './components/chart';
import Paper from '@/components/custom/paper';
import { Metadata } from 'next';
import AnalyticsCards from './analytics-cards';
import { PieChartRoleCount } from './piechart-role-count';
import { PieChartJobStatus } from './piechart-jobstatus-count';
import UserCards from './user-cards';

export const metadata: Metadata = {
  title: 'Số liệu thống kê',
};

const Overview = () => {
  return (
    <div className="container pb-20">
      <h1 className="text-xl font-bold">Chào Mừng Trở Lại!</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là số liệu phân tích của hệ thống gần đây!</p>
      <AnalyticsCards />
      <div className="grid grid-cols-1 lg:grid-cols-12 mt-4 gap-4">
        <Paper className="md:col-span-8">
          <OverviewChart />
        </Paper>
        <Paper className="md:col-span-4">
          <PieChartJobStatus />
        </Paper>
        <Paper className="md:col-span-4">
          <PieChartRoleCount />
        </Paper>
        <Paper className="md:col-span-8">
          <h3 className="font-semibold">Danh sách những nhà sáng tạo có doanh thu hàng đầu</h3>
          <p className="text-muted-foreground text-sm">Phân tích 5 người cao nhất tháng này.</p>
          <UserCards />
        </Paper>
      </div>
    </div>
  );
};

export default Overview;
