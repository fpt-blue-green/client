import { FC, ReactNode } from 'react';
import { Badge as SBadge, BadgeProps as SBadgeProps } from '../ui/badge';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('absolute h-5 px-1.5 transition-all', {
  variants: {
    position: {
      'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
      'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
      'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    },
  },
});

interface BadgeProps extends SBadgeProps, VariantProps<typeof badgeVariants> {
  children: ReactNode;
  label: number;
  invisible?: boolean;
  max?: number;
  dot?: boolean;
}

const Badge: FC<BadgeProps> = ({ children, label, max, dot, position = 'top-right', invisible, ...props }) => {
  const content = !dot && (max && label > max ? `${max}+` : label);

  return (
    <div className="relative inline-block">
      {children}
      {
        <SBadge
          className={cn(badgeVariants({ position }), props.className, { 'size-2 p-0': dot, hidden: invisible })}
          {...props}
        >
          {content}
        </SBadge>
      }
    </div>
  );
};

export default Badge;
