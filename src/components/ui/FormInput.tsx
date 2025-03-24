import React from 'react';

    interface FormInputProps {
      label: string;
      type: string;
      id: string;
      name: string;
      value: string | number | string[];
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
      error?: string;
      children?: React.ReactNode;
      multiple?: boolean;
    }

    const FormInput: React.FC<FormInputProps> = ({ label, type, id, name, value, onChange, error, children, multiple }) => {
      return (
        <div>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {type === 'select' ? (
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              multiple={multiple}
            >
              {children}
            </select>
          ) : type === 'textarea' ? (
            <textarea
              id={id}
              name={name}
              value={value as string}
              onChange={onChange}
              rows={3}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <input
              type={type}
              id={id}
              name={name}
              value={value as string}
              onChange={onChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    };

    export default FormInput;
