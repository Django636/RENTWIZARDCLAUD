import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'w-full rounded-lg border transition-all duration-200 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'border-slate-600 bg-slate-800 hover:border-slate-500',
        error: 'border-error-500 bg-slate-800 focus:ring-error-500',
        success: 'border-primary-500 bg-slate-800 focus:ring-primary-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm h-9',
        md: 'px-4 py-2.5 text-base h-10',
        lg: 'px-4 py-3 text-base h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = 'text', ...props }, ref) => (
    <input
      type={type}
      className={inputVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input, inputVariants };