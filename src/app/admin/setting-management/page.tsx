import { Metadata } from 'next';
import SettingCards from './setting-cards';

export const metadata: Metadata = {
  title: 'Quản lý cấu hình và cài đặt',
};

const SystemSettings = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Cầu Hình Và Cài Đặt Của Hệ Thống</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là toàn bộ những cấu hình và cài đặt của hệ thống!</p>
      <SettingCards />
    </div>
  );
};

export default SystemSettings;
