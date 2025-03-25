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
        fullName: dj?.fullName || '',
        contact: dj?.contact || '',
        roleIds: dj?.roleIds || [],
      });
      const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
          onSave(formData);
        }
      };

      const validateForm = () => {
        let isValid = true;
        const newErrors: { [key: string]: string } = {};

        if (!formData.fullName) {
          newErrors.fullName = 'Full name is required';
          isValid = false;
        }
        if (!formData.contact) {
          newErrors.contact = 'Contact is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{dj ? 'Edit DJ' : 'Add DJ'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Full Name"
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              <FormInput
                label="Contact"
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                error={errors.contact}
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
