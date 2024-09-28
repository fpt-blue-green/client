import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  inputClassName?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, startAdornment, endAdornment, inputClassName, fullWidth, 'aria-invalid': ariaInvalid, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'flex items-center gap-2 h-10 w-96 px-3 py-1 max-w-full rounded-md border shadow-sm border-input text-sm transition-colors focus-within:ring-1 focus-within:ring-ring',
          {
            'ring-1 ring-destructive': ariaInvalid,
            'w-full': fullWidth,
            'cursor-not-allowed opacity-50': props.disabled,
          },
          className,
        )}
      >
        {startAdornment}
        <input
          type={type}
          className={cn(
            'w-full h-full bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed',
            inputClassName,
          )}
          ref={ref}
          aria-invalid={ariaInvalid}
          {...props}
        />
        {endAdornment}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
