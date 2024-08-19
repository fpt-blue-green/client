import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const InputWithoutOutline = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, inputClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center h-12 w-96 px-3 py-1 rounded-md border border-none text-md focus-within:ring-0 ',
          className,
        )}
      >
        {startAdornment}
        <input
          type={type}
          className={cn(
            'w-full bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            inputClassName,
          )}
          ref={ref}
          {...props}
        />
        {endAdornment}
      </div>
    );
  },
);
InputWithoutOutline.displayName = 'Input';

export { InputWithoutOutline };
