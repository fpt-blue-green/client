import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2 h-12 px-3 py-1 rounded-md border shadow-sm border-input focus-within:ring-1 focus-within:ring-ring">
        {startAdornment}
        <input
          type={type}
          className={cn(
            'w-full bg-transparent text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
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
