'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn, constants } from '@/lib/utils';
import IOffer from '@/types/offer';
import { FC } from 'react';

interface JobOfferProps {
  offer: IOffer;
}

const JobOffer: FC<JobOfferProps> = ({ offer }) => {
  const { Icon, color } = constants.offerStatus[offer.status];

  const styles = (isBigCircle = false) =>
    cn({
      'bg-success text-success-foreground': color === 'success',
      'bg-warning text-warning-foreground': color === 'warning',
      'bg-info text-info-foreground': color === 'info',
      'bg-destructive text-destructive-foreground': color === 'destructive',
      'bg-secondary text-secondary-foreground': color === 'secondary',
      'bg-success/20': isBigCircle && color === 'success',
      'bg-warning/20': isBigCircle && color === 'warning',
      'bg-info/20': isBigCircle && color === 'info',
      'bg-destructive/20': isBigCircle && color === 'destructive',
      'bg-secondary/20': isBigCircle && color === 'secondary',
    });

  return (
    <Dialog>
      <DialogTrigger>Test</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Lời đề nghị</DialogTitle>
          <DialogDescription className="sr-only">Lời đề nghị</DialogDescription>
        </DialogHeader>
        <div className="text-center">
          <div className={cn('size-28 p-6 rounded-full', styles(true))}>
            <div className={cn('flex items-center justify-center size-full rounded-full', styles(false))}>
              <Icon />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default JobOffer;
