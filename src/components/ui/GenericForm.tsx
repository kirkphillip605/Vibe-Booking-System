import React, { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  value: any;
  onChange: (value: any) => void;
  required?: boolean;
  options?: { value: any; label: string }[]; // For select fields
  error?: string;
}

interface GenericFormProps {
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitButtonText: string;
  cancelButtonText: string;
}

const GenericForm: React.FC<GenericFormProps> = ({ fields, onSubmit, onCancel, submitButtonText, cancelButtonText }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === 'text' && (
            <input
              type="text"
              id={field.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              required={field.required}
            />
          )}
          {field.type === 'number' && (
            <input
              type="number"
              id={field.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={field.value}
              onChange={e => field.onChange(Number(e.target.value))}
              required={field.required}
            />
          )}
          {field.type === 'date' && (
            <input
              type="date"
              id={field.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              required={field.required}
            />
          )}
          {field.type === 'time' && (
            <input
              type="time"
              id={field.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              required={field.required}
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              id={field.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
            />
          )}
          {field.type === 'select' && field.options && (
            <select
              id={field.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              required={field.required}
            >
              <option value="" disabled>Select an option</option>
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {field.error && <p className="mt-1 text-red-500 text-sm">{field.error}</p>}
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
        >
          {cancelButtonText}
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default GenericForm;
