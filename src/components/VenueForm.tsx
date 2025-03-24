import React, { useState, useEffect } from 'react';
import { VenueType, Venue } from '../models';
import GenericForm from './ui/GenericForm';

interface Props {
  venue?: Venue | null;
  onClose: () => void;
  onSave: (venue: Venue) => void;
  venueTypes: VenueType[];
}

const VenueForm: React.FC<Props> = ({ venue, onClose, onSave, venueTypes }) => {
  const [name, setName] = useState(venue?.name || '');
  const [address, setAddress] = useState(venue?.address || '');
  const [description, setDescription] = useState(venue?.description || '');
  const [capacity, setCapacity] = useState(venue?.capacity || 0);
  const [selectedVenueTypes, setSelectedVenueTypes] = useState(venue?.venueTypes || []);
  const [equipment, setEquipment] = useState(venue?.equipment || []);
  const [specifications, setSpecifications] = useState(venue?.specifications || {});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (venue) {
      setName(venue.name);
      setAddress(venue.address);
      setDescription(venue.description || '');
      setCapacity(venue.capacity || 0);
      setSelectedVenueTypes(venue.venueTypes || []);
      setEquipment(venue.equipment || []);
      setSpecifications(venue.specifications || {});
    }
  }, [venue]);

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newVenue: Venue = {
        id: venue?.id || Date.now(),
        name,
        address,
        description,
        capacity,
        venueTypes: selectedVenueTypes,
        equipment,
        specifications,
        contacts: venue?.contacts || [],
      };
      onSave(newVenue);
      onClose();
      setName('');
      setAddress('');
      setDescription('');
      setCapacity(0);
      setSelectedVenueTypes([]);
      setEquipment([]);
      setSpecifications({});
      setErrors({});
    }
  };

  const handleCancel = () => {
    onClose();
    setName('');
    setAddress('');
    setDescription('');
    setCapacity(0);
    setSelectedVenueTypes([]);
    setEquipment([]);
    setSpecifications({});
    setErrors({});
  };

  const handleVenueTypeChange = (type: VenueType, isChecked: boolean) => {
    setSelectedVenueTypes(prevTypes => {
      if (isChecked) {
        return [...prevTypes, type];
      } else {
        return prevTypes.filter(prevType => prevType.id !== type.id);
      }
    });
  };

  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      value: name,
      onChange: setName,
      required: true,
      error: errors.name,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      value: address,
      onChange: setAddress,
      required: true,
      error: errors.address,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      value: description,
      onChange: setDescription,
    },
    {
      name: 'capacity',
      label: 'Capacity',
      type: 'number',
      value: capacity,
      onChange: setCapacity,
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {venue ? 'Edit Venue' : 'Add Venue'}
        </h3>
        <div className="mt-2">
          <GenericForm
            fields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Save"
            cancelButtonText="Cancel"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Venue Types</label>
            <div className="mt-1">
              {venueTypes.map(type => (
                <label key={type.id} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    checked={selectedVenueTypes.some(selectedType => selectedType.id === type.id)}
                    onChange={e => handleVenueTypeChange(type, e.target.checked)}
                  />
                  <span className="ml-2 text-gray-700">{type.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueForm;
