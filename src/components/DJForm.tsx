import React, { useState, useEffect } from 'react';
    import { Person } from '../models';
    import FormInput from './ui/FormInput';

    interface DJFormProps {
      dj?: Person | null;
      onClose: () => void;
      onSave: (dj: Person) => void;
    }

    const DJForm: React.FC<DJFormProps> = ({ dj, onClose, onSave }) => {
      const [formData, setFormData] = useState<Person>({
        id: dj?.id || 0,
        firstName: dj?.firstName || '',
        lastName: dj?.lastName || '',
        email: dj?.email || '',
        phone: dj?.phone || '',
        role: 'DJ',
      });

      useEffect(() => {
        if (dj) {
          setFormData(dj);
        }
      }, [dj]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{dj ? 'Edit DJ' : 'Add DJ'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="First Name"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <FormInput
                label="Last Name"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <FormInput
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormInput
                label="Phone"
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    export default DJForm;
