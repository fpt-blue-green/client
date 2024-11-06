import { FC, ReactNode } from 'react';
import { Tooltip as ShadeTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';

interface TooltipProps {
  children: ReactNode;
  label: string | ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
  className?: string;
}

const Tooltip: FC<TooltipProps> = ({ children, label, position = 'top', disabled, className }) => {
  return (
    <>
      {disabled ? (
        children
      ) : (
        <TooltipProvider delayDuration={250}>
          <ShadeTooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent className={cn('bg-foreground text-background', className)} side={position}>
              {label}
            </TooltipContent>
          </ShadeTooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default Tooltip;
