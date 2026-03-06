import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        success: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
        error: 'bg-error-500/20 text-error-400 border border-error-500/30',
        info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        neutral: 'bg-slate-700 text-slate-300 border border-slate-600',
        pending: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
        active: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-xs',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

const DotIndicator = ({ variant }: { variant?: string }) => {
  const colors: Record<string, string> = {
    success: 'bg-primary-400',
    warning: 'bg-yellow-400',
    error: 'bg-error-400',
    info: 'bg-blue-400',
    neutral: 'bg-slate-400',
    pending: 'bg-orange-400',
    active: 'bg-primary-400',
  };
  return <div className={`h-1.5 w-1.5 rounded-full ${colors[variant || 'neutral']}`} />;
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, children, icon, dot, ...props }, ref) => (
    <div
      className={badgeVariants({ variant, size, className })}
      ref={ref}
      {...props}
    >
      {dot && <DotIndicator variant={variant} />}
      {icon && icon}
      <span>{children}</span>
    </div>
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };