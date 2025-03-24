import React, { useState, useEffect } from 'react';
    import { Contact } from '../models';
    import FormInput from './ui/FormInput';

    interface ContactFormProps {
      contact?: Contact | null;
      onClose: () => void;
      onSave: (contact: Contact) => void;
    }

    const ContactForm: React.FC<ContactFormProps> = ({ contact, onClose, onSave }) => {
      const [formData, setFormData] = useState<Contact>({
        id: contact?.id || 0,
        firstName: contact?.firstName || '',
        lastName: contact?.lastName || '',
        contactType: contact?.contactType || '',
        contactRole: contact?.contactRole || '',
        phoneNumbers: contact?.phoneNumbers || [],
        emailAddresses: contact?.emailAddresses || [],
        addresses: contact?.addresses || [],
      });
      const [errors, setErrors] = useState<{ [key: string]: string }>({});

      useEffect(() => {
        if (contact) {
          setFormData(contact);
        }
      }, [contact]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

        if (!formData.firstName) {
          newErrors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName) {
          newErrors.lastName = 'Last name is required';
          isValid = false;
        }
        if (!formData.contactType) {
          newErrors.contactType = 'Contact type is required';
          isValid = false;
        }
        if (!formData.contactRole) {
          newErrors.contactRole = 'Contact role is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{contact ? 'Edit Contact' : 'Add Contact'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="First Name"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <FormInput
                label="Last Name"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
              <FormInput
                label="Contact Type"
                type="text"
                id="contactType"
                name="contactType"
                value={formData.contactType}
                onChange={handleChange}
                error={errors.contactType}
              />
              <FormInput
                label="Contact Role"
                type="text"
                id="contactRole"
                name="contactRole"
                value={formData.contactRole}
                onChange={handleChange}
                error={errors.contactRole}
              />
              {/* Add input fields for phoneNumbers, emailAddresses, and addresses here */}
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

    export default ContactForm;
