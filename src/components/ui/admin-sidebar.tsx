import config from '@/config';
import { SideBarItemModel } from '@/types/sidebar-item';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import AdminMenuItem from '../admin-menu-item';

interface AdminSideBarProps {
  items?: SideBarItemModel[];
}

const AdminSideBar: FC<AdminSideBarProps> = ({ items }) => {
  return (
    <div className="w-64 flex flex-col border-r-[1px]">
      <Link href={config.routes.home} className="font-semibold px-4 py-3 border-b-[0.5px]">
        <div className="flex gap-2">
          <Image src="/logo.png" alt="adfusion" className="size-12" width={200} height={200} />
          <div className="flex flex-col gap-2">
            <h4>AdFusion Admin</h4>
            <p className="text-muted-foreground text-sm">Nền tảng kết nối</p>
          </div>
        </div>
      </Link>
      {items &&
        items.map((item, index) => (
          <AdminMenuItem key={index} route={item.route} icon={item.icon} content={item.content}></AdminMenuItem>
        ))}
    </div>
  );
};

export default AdminSideBar;
