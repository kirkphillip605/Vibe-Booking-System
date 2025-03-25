import React, { useState, useEffect } from 'react';

    interface GenericFormProps {
      fields: {
        label: string;
        type: string;
        id: string;
        name: string;
        value: string | number | boolean | string[] | null | undefined;
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
        error?: string;
        options?: { value: string | number; label: string }[];
        multiple?: boolean;
      }[];
      onSubmit: (e: React.FormEvent) => void;
      onCancel: () => void;
      submitText?: string;
      cancelText?: string;
      initialValues?: { [key: string]: string | number | boolean | string[] | null | undefined };
    }

    const GenericForm: React.FC<GenericFormProps> = ({ fields, onSubmit, onCancel, submitText = 'Save', cancelText = 'Cancel', initialValues }) => {
      const [formValues, setFormValues] = useState<{ [key: string]: string | number | boolean | string[] | null | undefined }>(initialValues || {});

      useEffect(() => {
        if (initialValues) {
          setFormValues(initialValues);
        }
      }, [initialValues]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, multiple } = e.target;
        setFormValues(prevValues => ({
          ...prevValues,
          [name]: multiple ? Array.from(e.target.selectedOptions, option => option.value) : value,
        }));
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(field => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.id}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                  multiple={field.multiple}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              {field.error && <p className="text-red-500 text-sm">{field.error}</p>}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              {cancelText}
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {submitText}
            </button>
          </div>
        </form>
      );
    };

    export default GenericForm;
