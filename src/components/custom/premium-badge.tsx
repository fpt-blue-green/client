'use client';

import { FC } from 'react';
import Badge, { BadgeProps } from './badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import Link from 'next/link';
import config from '@/config';

interface PremiumBadgeProps extends BadgeProps {
  title?: string;
  description?: string;
}

const PremiumBadge: FC<PremiumBadgeProps> = ({
  title = 'Nâng cấp để mở khóa chức năng nâng cao',
  description = 'Các chức năng tìm kiếm nâng cao, dễ dàng chọn lọc',
  className,
  invisible,
  ...props
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge
          variant="gradient"
          size="small"
          className={cn('cursor-pointer translate-x-0 -translate-y-1/2 text-[10px] leading-3', className)}
          {...props}
          invisible={invisible}
          label="Premium"
        />
      </DialogTrigger>
      {!invisible && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
            <DialogDescription className="text-center">{description}</DialogDescription>
          </DialogHeader>
          <div className="mx-8 bg-gradient rounded-lg py-8 text-8xl text-center">🔒</div>
          <DialogFooter>
            <Button variant="foreground" size="large" fullWidth asChild>
              <Link href={config.routes.brand.pricing}>Khám phá</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default PremiumBadge;
