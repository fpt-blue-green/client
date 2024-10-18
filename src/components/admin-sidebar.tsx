'use client';

import config from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import AdminMenuItem from './admin-menu-item';
import { SideBarItemModel } from '@/app/admin/sidebar-items';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface AdminSideBarProps {
  items: SideBarItemModel[];
}

const AdminSideBar: FC<AdminSideBarProps> = ({ items }) => {
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <aside className={cn('flex flex-col border-r w-64 h-screen transition-all', { 'w-14': collapse })}>
      <Link href={config.routes.admin.base} className="flex items-center gap-2 h-16 px-3">
        <Image
          src="/logo.png"
          alt="adfusion"
          className={cn('size-10 transition-all', { 'size-8': collapse })}
          width={200}
          height={200}
        />
        <div className={cn('flex flex-col gap-1', { hidden: collapse })}>
          <h4 className="font-semibold">adfusion</h4>
          <p className="text-muted-foreground text-sm">Nền tảng kết nối</p>
        </div>
      </Link>
      <div className="relative">
        <ScrollArea className="flex-1 pt-2 border-t h-[calc(100vh-64px)]">
          <nav className="flex flex-col gap-1">
            {items.map((item, index) => (
              <AdminMenuItem key={index} item={item} collapse={collapse} />
            ))}
          </nav>
        </ScrollArea>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rounded-full z-1"
          onClick={handleCollapse}
        >
          {collapse ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSideBar;
