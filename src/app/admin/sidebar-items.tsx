import config from '@/config';
import { DashboardIcon, GlobeIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import { FaPeopleGroup, FaTag } from 'react-icons/fa6';

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
    icon: <GlobeIcon />,
    content: 'Nhà Sáng Tạo',
  },
  {
    route: config.routes.admin.brand,
    icon: <FaPeopleGroup />,
    content: 'Nhãn Hàng',
  },
  {
    route: config.routes.admin.campaign,
    icon: <FaProjectDiagram />,
    content: 'Chiến Dịch',
  },
  {
    route: config.routes.admin.tag,
    icon: <FaTag />,
    content: 'Thẻ',
  },
];
