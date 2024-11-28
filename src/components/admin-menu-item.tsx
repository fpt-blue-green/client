'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SideBarItemModel } from '@/app/admin/sidebar-items';
import { cn } from '@/lib/utils';
import Tooltip from './custom/tooltip';

interface AdminMenuItemProps {
  item: SideBarItemModel;
  collapse?: boolean;
}

const AdminMenuItem: FC<AdminMenuItemProps> = ({ item, collapse }) => {
  const pathname = usePathname();

  return (
    <Tooltip label={item.content} position="right" disabled={!collapse}>
      <Link
        href={item.route}
        className={cn(
          'flex items-center gap-2 h-12 font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent px-6 transition-colors',
          { 'text-foreground bg-accent font-semibold': pathname === item.route, 'px-0 justify-center': collapse },
        )}
      >
        <span className="text-base">{item.icon}</span>
        <span className={cn({ 'sr-only': collapse })}>{item.content}</span>
      </Link>
    </Tooltip>
  );
};

export default AdminMenuItem;
