import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: boolean;
}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ className, children, icon = true, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center gap-2 mt-1.5 text-sm text-error-400 ${className || ''}`}
      {...props}
    >
      {icon && <AlertCircle size={16} />}
      <span>{children}</span>
    </div>
  )
);
ErrorMessage.displayName = 'ErrorMessage';

export { ErrorMessage };