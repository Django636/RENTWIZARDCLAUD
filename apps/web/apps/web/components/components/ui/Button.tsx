import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-slate-950 hover:bg-primary-600 active:bg-primary-700 shadow-lg hover:shadow-xl',
        secondary:
          'bg-slate-800 text-slate-100 hover:bg-slate-700 active:bg-slate-600 border border-slate-700',
        outline:
          'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 active:bg-primary-500/20',
        destructive:
          'bg-error-500 text-white hover:bg-error-600 active:bg-error-700 shadow-lg hover:shadow-xl',
        ghost:
          'text-slate-300 hover:bg-slate-800 active:bg-slate-700 hover:text-slate-100',
      },
      size: {
        xs: 'px-2.5 py-1.5 text-xs h-8',
        sm: 'px-3 py-2 text-sm h-9',
        md: 'px-4 py-2.5 text-base h-10',
        lg: 'px-6 py-3 text-base h-12',
        xl: 'px-8 py-3.5 text-lg h-14',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      loading: {
        true: 'opacity-70 cursor-wait',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  }
);

const LoadingSpinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, isLoading, children, disabled, ...props },
    ref
  ) => (
    <button
      className={buttonVariants({
        variant,
        size,
        fullWidth,
        loading: isLoading,
        className,
      })}
      disabled={disabled || isLoading}
      ref={ref}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </button>
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };