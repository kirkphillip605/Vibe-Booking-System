import React from 'react';

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
    }

    const GenericForm: React.FC<GenericFormProps> = ({ fields, onSubmit, onCancel, submitText = 'Save', cancelText = 'Cancel' }) => {
      return (
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map(field => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.id}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
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
                  value={field.value}
                  onChange={field.onChange}
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
