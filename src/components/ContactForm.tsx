import React, { useState, useEffect } from 'react';
    import { Contact, ContactType, ContactRole } from '../models';
    import FormInput from './ui/FormInput';
    import { useClientContext } from './ClientContext';

    interface ContactFormProps {
      contact?: Contact | null;
      onClose: () => void;
      onSave: (contact: Contact) => void;
    }

    const ContactForm: React.FC<ContactFormProps> = ({ contact, onClose, onSave }) => {
      const { contactTypes, contactRoles } = useClientContext();
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
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
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
              />
              <FormInput
                label="Last Name"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <div className="flex flex-col">
                <label htmlFor="contactType" className="block text-sm font-medium text-gray-700">Contact Type</label>
                <select
                  id="contactType"
                  name="contactType"
                  value={formData.contactType}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Contact Type</option>
                  {contactTypes?.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="contactRole" className="block text-sm font-medium text-gray-700">Contact Role</label>
                <select
                  id="contactRole"
                  name="contactRole"
                  value={formData.contactRole}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Contact Role</option>
                  {contactRoles?.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
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

    export default ContactForm;
