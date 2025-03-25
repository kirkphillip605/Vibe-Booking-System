import React from 'react';

    interface FormInputProps {
      label: string;
      type: string;
      id: string;
      name: string;
      value: string | number | undefined | null;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
      error?: string;
    }

    const FormInput: React.FC<FormInputProps> = ({ label, type, id, name, value, onChange, error }) => {
      return (
        <div>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    };

    export default FormInput;
