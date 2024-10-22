import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Paper: FC<Readonly<PaperProps>> = ({ children, className, ...props }) => {
  return (
    <div className={cn('p-6 border bg-popover overflow-hidden rounded-lg shadow', className)} {...props}>
      {children}
    </div>
  );
};
export default Paper;
