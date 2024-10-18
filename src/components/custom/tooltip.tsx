import { FC, ReactNode } from 'react';
import { Tooltip as ShadeTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface TooltipProps {
  children: ReactNode;
  label: string | ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ children, label, position = 'top', disabled }) => {
  return (
    <>
      {disabled ? (
        children
      ) : (
        <TooltipProvider delayDuration={250}>
          <ShadeTooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent className="bg-foreground text-background" side={position}>
              {label}
            </TooltipContent>
          </ShadeTooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default Tooltip;
