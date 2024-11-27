import config from '@/config';
import { DashboardIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { SettingsIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import { FaPeopleGroup, FaTag } from 'react-icons/fa6';
import { GiExecutionerHood } from 'react-icons/gi';
import { PiNotificationFill } from 'react-icons/pi';

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
    route: config.routes.admin.action,
    icon: <GiExecutionerHood />,
    content: 'Các Hoạt Động',
  },
  {
    route: config.routes.admin.user,
    icon: <FaPeopleGroup />,
    content: 'Người dùng',
  },
  {
    route: config.routes.admin.tag,
    icon: <FaTag />,
    content: 'Thẻ',
  },
  {
    route: config.routes.admin.report,
    icon: <PaperPlaneIcon />,
    content: 'Báo cáo',
  },
  {
    route: config.routes.admin.setting,
    icon: <SettingsIcon size={16} />,
    content: 'Cài đặt hệ thống',
  },
];
