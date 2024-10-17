'use client';
import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SideBarItemModel } from '@/types/sidebar-item';

const AdminMenuItem: FC<SideBarItemModel> = ({ route, content, icon }) => {
  const pathname = usePathname();

  return (
    <Link
      href={route}
      className={clsx(
        'relative font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent  px-6 py-4 mt-2',
        pathname === route ? 'text-foreground bg-accent' : 'text-muted-foreground',
      )}
    >
      <div className="flex gap-2 items-center">
        {icon && icon}
        {content}
      </div>
    </Link>
  );
};

export default AdminMenuItem;
