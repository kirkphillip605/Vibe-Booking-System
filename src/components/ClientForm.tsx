import React, { useState } from 'react';
import { Client } from '../models/Person'; // Import the Client interface
import GenericForm from './ui/GenericForm';

interface Props {
  client?: Client | null;
  onClose: () => void;
  onSave: (client: Client) => void;
}

const ClientForm: React.FC<Props> = ({ client, onClose, onSave }) => {
  const [name, setName] = useState(client?.name || '');
  const [contact, setContact] = useState(client?.contact || '');
  const [bookingHistory, setBookingHistory] = useState(client?.bookingHistory || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!contact.trim()) {
      newErrors.contact = 'Contact is required';
      isValid = false;
    }
    if (!bookingHistory.trim()) {
      newErrors.bookingHistory = 'Booking History is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newClient: Client = {
        id: client?.id || Date.now(),
        name,
        contact,
        bookingHistory,
      };
      onSave(newClient);
      onClose();
      setName('');
      setContact('');
      setBookingHistory('');
      setErrors({});
    }
  };

  const handleCancel = () => {
    onClose();
    setName('');
    setContact('');
    setBookingHistory('');
    setErrors({});
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
      name: 'contact',
      label: 'Contact',
      type: 'text',
      value: contact,
      onChange: setContact,
      required: true,
      error: errors.contact,
    },
    {
      name: 'bookingHistory',
      label: 'Booking History',
      type: 'text',
      value: bookingHistory,
      onChange: setBookingHistory,
      required: true,
      error: errors.bookingHistory,
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {client ? 'Edit Client' : 'Add Client'}
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

export default ClientForm;
