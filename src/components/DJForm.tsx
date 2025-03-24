import React, { useState } from 'react';
import { Person } from '../models/Person'; // Import the Person interface
import GenericForm from './ui/GenericForm';

interface Props {
  dj?: Person | null;
  onClose: () => void;
  onSave: (dj: Person) => void;
}

const DJForm: React.FC<Props> = ({ dj, onClose, onSave }) => {
  const [fullName, setFullName] = useState(dj?.fullName || '');
  const [contact, setContact] = useState(dj?.contact || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }
    if (!contact.trim()) {
      newErrors.contact = 'Contact is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      newErrors.contact = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newDJ: Person = {
        id: dj?.id || Date.now(),
        fullName,
        contact,
        roleIds: [1], // Assuming roleId 1 is DJ
      };
      onSave(newDJ);
      onClose();
      setFullName('');
      setContact('');
      setErrors({});
    }
  };

  const handleCancel = () => {
    onClose();
    setFullName('');
    setContact('');
    setErrors({});
  };

  const formFields = [
    {
      name: 'fullName',
      label: 'Name',
      type: 'text',
      value: fullName,
      onChange: setFullName,
      required: true,
      error: errors.fullName,
    },
    {
      name: 'contact',
      label: 'Contact',
      type: 'text',
      value: contact,
      onChange: setContact,
      required: true,
      error: errors.contact,
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {dj ? 'Edit DJ' : 'Add DJ'}
        </h3>
        <div className="mt-2">
          <GenericForm
            fields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Save"
            cancelButtonText="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default DJForm;
