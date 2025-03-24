import React, { useState, useEffect } from 'react';
import { Contact } from '../models';
import GenericForm from './ui/GenericForm';

interface Props {
  contact?: Contact | null;
  onClose: () => void;
  onSave: (contact: Contact) => void;
}

export const ContactForm: React.FC<Props> = ({ contact, onClose, onSave }) => {
  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
    }
  }, [contact]);

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newContact: Contact = {
        id: contact?.id || Date.now(),
        firstName,
        lastName,
        contactMethods: [],
        contactRoles: [],
        notes: '',
      };
      onSave(newContact);
      onClose();
      setFirstName('');
      setLastName('');
      setErrors({});
    }
  };

  const handleCancel = () => {
    onClose();
    setFirstName('');
    setLastName('');
    setErrors({});
  };

  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      value: firstName,
      onChange: setFirstName,
      required: true,
      error: errors.firstName,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      value: lastName,
      onChange: setLastName,
      required: true,
      error: errors.lastName,
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {contact ? 'Edit Contact' : 'Add Contact'}
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
