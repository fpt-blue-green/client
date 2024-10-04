'use client';

import { FC, Fragment, ReactNode } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { cn } from '@/lib/utils';

export interface IBreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbsProps {
  items: IBreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, separator = '/', className }) => {
  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem key={index}>
              {item.icon}
              {item.href ? (
                <BreadcrumbLink href={item.href} className="hover:underline">
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
