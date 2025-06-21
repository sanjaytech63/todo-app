import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  containerClass?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, containerClass = '', className = '', ...props }, ref) => {
    return (
      <div className={`space-y-1 ${containerClass}`}>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`block w-full px-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;