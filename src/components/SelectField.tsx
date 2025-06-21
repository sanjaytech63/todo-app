import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  containerClass?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, containerClass = '', className = '', options, ...props }, ref) => {
    return (
      <div className={`space-y-1 ${containerClass}`}>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          ref={ref}
          className={`block w-full px-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField;