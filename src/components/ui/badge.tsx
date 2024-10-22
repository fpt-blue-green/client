import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        gradient: 'border-transparent bg-gradient text-primary-foreground shadow',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow',
        success: 'border-transparent bg-success text-success-foreground shadow',
        warning: 'border-transparent bg-warning text-warning-foreground shadow',
        info: 'border-transparent bg-info text-info-foreground shadow',
        outline: 'text-foreground',
      },
      size: {
        small: 'px-1.5 py-1',
        medium: 'px-2 py-1.5',
        large: 'px-3 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
