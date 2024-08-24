import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface PaperProps {
  children: ReactNode;
  className?: string;
}

const Paper: FC<Readonly<PaperProps>> = ({ children, className }) => {
  return <div className={cn('p-6 bg-popover overflow-hidden rounded-lg shadow', className)}>{children}</div>;
};
export default Paper;
