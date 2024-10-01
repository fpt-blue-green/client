import { FC, ReactNode } from 'react';
import { Badge as SBadge, BadgeProps as SBadgeProps } from '../ui/badge';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('absolute transition-all', {
  variants: {
    position: {
      'top-right': 'top-0 right-0 translate-x-3/4 -translate-y-3/4',
      'top-left': 'top-0 left-0 -translate-x-3/4 -translate-y-3/4',
      'bottom-right': 'bottom-0 right-0 translate-x-3/4 translate-y-3/4',
      'bottom-left': 'bottom-0 left-0 -translate-x-3/4 translate-y-3/4',
    },
  },
});

interface BadgeProps extends SBadgeProps, VariantProps<typeof badgeVariants> {
  children: ReactNode;
  label?: string | number;
  invisible?: boolean;
  max?: number;
  size?: 'large' | 'medium' | 'small';
  dot?: boolean;
}

const Badge: FC<BadgeProps> = ({
  children,
  label,
  max,
  dot,
  position = 'top-right',
  invisible,
  className,
  ...props
}) => {
  const content = !dot && label && typeof label === 'number' ? (max && label > max ? `${max}+` : label) : label;

  return (
    <div className="relative inline-block">
      {children}
      {(label || dot) && (
        <SBadge
          className={cn(
            badgeVariants({ position }),
            { 'size-2 p-0': dot },
            invisible ? 'scale-0' : 'scale-100',
            className,
          )}
          {...props}
        >
          {content}
        </SBadge>
      )}
    </div>
  );
};

export default Badge;
