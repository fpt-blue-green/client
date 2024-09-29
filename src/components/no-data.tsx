'use client';

import { cn } from '@/lib/utils';
import { FC } from 'react';
import { PiCloudXFill } from 'react-icons/pi';

interface NoDataProps {
  description?: string;
  className?: string;
}
const NoData: FC<NoDataProps> = ({ className, description }) => {
  return (
    <div className={cn('flex flex-col items-center gap-2 p-8 text-muted-foreground', className)}>
      <div>
        <PiCloudXFill className="size-20" />
      </div>
      <div className="font-medium">{description || 'Không tìm thấy kết quả'}</div>
    </div>
  );
};
export default NoData;
