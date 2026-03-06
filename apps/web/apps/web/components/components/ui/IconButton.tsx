import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-slate-950 hover:bg-primary-600 active:bg-primary-700',
        secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 active:bg-slate-600',
        outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10',
        destructive: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
        ghost: 'text-slate-300 hover:bg-slate-800 active:bg-slate-700',
      },
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={iconButtonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  )
);
IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };