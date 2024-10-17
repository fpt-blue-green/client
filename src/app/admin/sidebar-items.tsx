import config from '@/config';
import { SideBarItemModel } from '@/types/sidebar-item';
import { DashboardIcon } from '@radix-ui/react-icons';
import { FaPeopleGroup } from 'react-icons/fa6';

export const items: SideBarItemModel[] = [
  {
    route: config.routes.admin.statistic,
    icon: <DashboardIcon />,
    content: 'Tổng Quan',
  },
  {
    route: config.routes.admin.influencer,
    icon: <FaPeopleGroup />,
    content: 'Nhà Sáng Tạo',
  },
  {
    route: config.routes.admin.brand,
    icon: <FaPeopleGroup />,
    content: 'Nhãn Hàng',
  },
  {
    route: config.routes.admin.campaign,
    icon: <FaPeopleGroup />,
    content: 'Chiến Dịch',
  },
];
