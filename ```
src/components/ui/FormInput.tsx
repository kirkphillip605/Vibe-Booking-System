import React from 'react';

    interface FormInputProps {
      label: string;
      type: string;
      id: string;
      name: string;
      value: string | number | boolean | string[] | null | undefined;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
      error?: string;
      options?: { value: string | number; label: string }[];
      multiple?: boolean;
    }

    const sanitizeInput = (value: string): string => {
      // Basic sanitization: remove HTML tags and escape special characters.
      let sanitizedValue = value.replace(/<[^>]*>/g, ''); // Remove HTML tags
      sanitizedValue = sanitizedValue.replace(/&/g, '&amp;')
                                     .replace(/</g, '<')
                                     .replace(/>/g, '>')
                                     .replace(/"/g, '&quot;')
                                     .replace(/'/g, '&#39;');
      return sanitizedValue;
    };

    const FormInput: React.FC<FormInputProps> = ({ label, type, id, name, value, onChange, error, options, multiple }) => {
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let newValue = e.target.value;
        if (type === 'text' || type === 'textarea') {
          newValue = sanitizeInput(newValue);
        }
        onChange(e);
      };

      return (
        <div className="mb-4">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {type === 'select' ? (
            <select
              id={id}
              name={name}
              value={value}
              onChange={handleChange}
              multiple={multiple}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              id={id}
              name={name}
              value={value}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    };

    export default FormInput;
