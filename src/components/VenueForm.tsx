import React, { useState, useEffect } from 'react';
    import { Venue, VenueType } from '../models';
    import FormInput from './ui/FormInput';

    interface VenueFormProps {
      venue?: Venue | null;
      onClose: () => void;
      onSave: (venue: Venue) => void;
      venueTypes: VenueType[];
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
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Clear error on change
      };

      const handleVenueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value, selectedOptions } = e.target;
        const selectedVenueTypeIds = Array.from(selectedOptions, option => parseInt(option.value, 10));
        setFormData(prevFormData => ({
          ...prevFormData,
          venueTypes: selectedVenueTypeIds.map(id => ({ id, name: '' })), // Assuming we only need the ID
        }));
        setErrors(prevErrors => ({ ...prevErrors, venueTypes: '' })); // Clear error on change
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
        if (formData.venueTypes.length === 0) {
          newErrors.venueTypes = 'Venue types are required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      const venueTypeOptions = venueTypes?.map(venueType => ({ value: venueType.id, label: venueType.name })) || [];

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
              <FormInput
                label="Venue Types"
                type="select"
                id="venueTypes"
                name="venueTypes"
                value={formData.venueTypes.map(type => type.id)}
                onChange={handleVenueTypeChange}
                error={errors.venueTypes}
                multiple
              >
                {venueTypeOptions.map(venueType => (
                  <option key={venueType.value} value={venueType.value}>{venueType.label}</option>
                ))}
              </FormInput>
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
