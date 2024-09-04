import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, inputClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center gap-2 h-12 w-96 px-3 py-1 max-w-full rounded-md border shadow-sm border-input text-sm focus-within:ring-1 focus-within:ring-ring',
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
Input.displayName = 'Input';

export { Input };
