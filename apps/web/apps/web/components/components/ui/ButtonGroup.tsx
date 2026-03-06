import React from 'react';

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  vertical?: boolean;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, vertical = false, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex gap-2 ${vertical ? 'flex-col' : 'flex-row'} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
);
ButtonGroup.displayName = 'ButtonGroup';