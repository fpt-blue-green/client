import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LuLoader2 } from 'react-icons/lu';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        foreground: 'bg-foreground text-background shadow-sm hover:bg-foreground/80',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient text-primary-foreground shadow hover:opacity-80',
      },
      size: {
        medium: 'h-9 px-4 py-2',
        small: 'h-8 px-3 text-xs',
        large: 'h-10 px-8 text-base',
        icon: 'h-9 w-9',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, fullWidth, loading, disabled, children, startIcon, endIcon, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const loadingComponent = <LuLoader2 className="size-4 animate-spin" />;
    const startEl = loading && startIcon ? loadingComponent : startIcon;
    const endEl = loading && endIcon ? loadingComponent : endIcon;
    const el = loading && !startIcon && !endIcon ? loadingComponent : children;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {startEl}
        <Slottable>{el}</Slottable>
        {endEl}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
