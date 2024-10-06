'use client';

import { FC } from 'react';
import Badge, { BadgeProps } from './badge';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface PremiumBadgeProps extends BadgeProps {}

const PremiumBadge: FC<PremiumBadgeProps> = ({ className, ...props }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge
          variant="gradient"
          size="small"
          className={cn('cursor-pointer translate-x-0 -translate-y-1/2', className)}
          {...props}
          label="Premium"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div>Bạn cần trở thành Premium Brand</div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumBadge;
