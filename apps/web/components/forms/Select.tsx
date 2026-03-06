import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error = false, options, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={`w-full rounded-lg border transition-all duration-200 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed appearance-none px-4 py-2.5 text-base h-10 bg-slate-800 pr-10 ${
          error
            ? 'border-error-500 focus:ring-error-500'
            : 'border-slate-600 hover:border-slate-500'
        } ${className || ''}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    </div>
  )
);
Select.displayName = 'Select';

export { Select };