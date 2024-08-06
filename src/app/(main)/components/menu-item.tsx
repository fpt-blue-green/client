'use client';
import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  href: string;
  children: string;
}

const MenuItem: FC<MenuItemProps> = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        'relative font-medium hover:text-foreground hover:after:w-full hover:after:left-0',
        'after:absolute after:-bottom-1 after:rounded-full after:h-0.5 after:bg-primary after:transition-all duration-500',
        pathname === href
          ? 'after:w-full after:left-0 text-foreground'
          : 'after:w-0 after:left-1/2 text-muted-foreground',
      )}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
