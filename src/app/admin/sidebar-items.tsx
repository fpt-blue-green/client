import config from '@/config';
import { DashboardIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { FaPeopleGroup } from 'react-icons/fa6';

export interface SideBarItemModel {
  route: string;
  icon: ReactNode;
  content: string;
}

export const items: SideBarItemModel[] = [
  {
    route: config.routes.admin.base,
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
