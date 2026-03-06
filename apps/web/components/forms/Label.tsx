import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={`block text-sm font-semibold text-slate-200 mb-2 ${className || ''}`}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-error-500">*</span>}
    </label>
  )
);
Label.displayName = 'Label';

export { Label };