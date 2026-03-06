import React from 'react';
import { Label, type LabelProps } from './Label';
import { Input, type InputProps } from './Input';
import { Select, type SelectProps } from './Select';
import { ErrorMessage } from './ErrorMessage';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  (
    { className, children, label, error, required = false, helperText, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={`flex flex-col gap-1 ${className || ''}`}
      {...props}
    >
      {label && <Label required={required}>{label}</Label>}
      {children}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && (
        <p className="text-xs text-slate-400 mt-1">{helperText}</p>
      )}
    </div>
  )
);
FormGroup.displayName = 'FormGroup';

export { FormGroup };