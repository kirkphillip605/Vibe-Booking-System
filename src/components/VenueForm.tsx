import React, { useState, useEffect } from 'react';
    import { Venue, VenueType } from '../models';
    import FormInput from './ui/FormInput';

    interface VenueFormProps {
      venue?: Venue | null;
      onClose: () => void;
      onSave: (venue: Venue) => void;
      venueTypes?: VenueType[];
    }

    const VenueForm: React.FC<VenueFormProps> = ({ venue, onClose, onSave, venueTypes }) => {
      const [formData, setFormData] = useState<Venue>({
        id: venue?.id || 0,
        name: venue?.name || '',
        address: venue?.address || '',
        venueTypes: venue?.venueTypes || [],
        contacts: venue?.contacts || [],
      });
      const [errors, setErrors] = useState<{ [key: string]: string }>({});

      useEffect(() => {
        if (venue) {
          setFormData(venue);
        }
      }, [venue]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      };

      const handleVenueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData(prevFormData => ({
          ...prevFormData,
          venueTypes: selectedOptions,
        }));
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

        if (!formData.name) {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        if (!formData.address) {
          newErrors.address = 'Address is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{venue ? 'Edit Venue' : 'Add Venue'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Name"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <FormInput
                label="Address"
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
              />
              <div className="flex flex-col">
                <label htmlFor="venueTypes" className="block text-sm font-medium text-gray-700">Venue Types</label>
                <select
                  id="venueTypes"
                  name="venueTypes"
                  multiple
                  value={formData.venueTypes}
                  onChange={handleVenueTypeChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {venueTypes?.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
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

    export default VenueForm;
