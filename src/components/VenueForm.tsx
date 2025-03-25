import React, { useState, useEffect } from 'react';
    import { Venue, Contact } from '../models';
    import FormInput from './ui/FormInput';
    import { useClientContext } from './ClientContext';
    import GenericForm from './ui/GenericForm';
    import { ContactType, ContactRole } from '../models';

    interface VenueFormProps {
      venue?: Venue | null;
      onClose: () => void;
      onSave: (venue: Venue) => void;
    }

    const VenueForm: React.FC<VenueFormProps> = ({ venue, onClose, onSave }) => {
      const {  contactTypes, contactRoles, onAddContact, contacts } = useClientContext();
      const [formData, setFormData] = useState<Venue>({
        id: venue?.id || 0,
        name: venue?.name || '',
        address: venue?.address || '',
        venueType: venue?.venueType || '',
        contact: venue?.contact || { id: 0, firstName: '', lastName: '', contactType: '', contactRole: '', phoneNumbers: [], emailAddresses: [], addresses: [] },
      });
      const [errors, setErrors] = useState<{ [key: string]: string }>({});
      const [isContactFormOpen, setIsContactFormOpen] = useState(false);
      const [newContact, setNewContact] = useState<Contact | null>(null);

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

      const handleContactChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setFormData(prevFormData => ({
          ...prevFormData,
          contact: { ...formData.contact, id: value },
        }));
        setErrors(prevErrors => ({ ...prevErrors, contact: '' }));
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
          newErrors.name = 'Venue name is required';
          isValid = false;
        }
        if (!formData.address) {
          newErrors.address = 'Address is required';
          isValid = false;
        }
        if (!formData.contact?.id) {
          newErrors.contact = 'Contact is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      const handleCreateNewContact = () => {
        setNewContact({ id: 0, firstName: '', lastName: '', contactType: '', contactRole: '', phoneNumbers: [], emailAddresses: [], addresses: [] });
        setIsContactFormOpen(true);
      };

      const handleSaveNewContact = (contact: Contact) => {
        onAddContact(contact);
        setNewContact(contact);
        setFormData(prevFormData => ({
          ...prevFormData,
          contact: { ...contact, id: contact.id }, // Ensure the contact has an ID
        }));
        setIsContactFormOpen(false);
      };

      const handleCancelNewContact = () => {
        setIsContactFormOpen(false);
      };

      const contactFormFields = [
        { label: 'First Name', type: 'text', id: 'firstName', name: 'firstName', value: newContact?.firstName, onChange: (e) => setNewContact({ ...newContact, firstName: e.target.value }) },
        { label: 'Last Name', type: 'text', id: 'lastName', name: 'lastName', value: newContact?.lastName, onChange: (e) => setNewContact({ ...newContact, lastName: e.target.value }) },
        { label: 'Contact Type', type: 'select', id: 'contactType', name: 'contactType', value: newContact?.contactType, onChange: (e) => setNewContact({ ...newContact, contactType: e.target.value }), options: contactTypes?.map(ct => ({ value: ct.id, label: ct.name })) },
        { label: 'Contact Role', type: 'select', id: 'contactRole', name: 'contactRole', value: newContact?.contactRole, onChange: (e) => setNewContact({ ...newContact, contactRole: e.target.value }), options: contactRoles?.map(cr => ({ value: cr.id, label: cr.name })) },
      ];

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{venue ? 'Edit Venue' : 'Add Venue'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Venue Name"
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
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                <select
                  id="contact"
                  name="contact"
                  value={formData.contact?.id}
                  onChange={handleContactChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Contact</option>
                  {contacts?.map(contact => (
                    <option key={contact.id} value={contact.id}>{contact.firstName} {contact.lastName}</option>
                  ))}
                  {newContact && newContact.id !== 0 && (
                    <option key={newContact.id} value={newContact.id}>{newContact.firstName} {newContact.lastName} (New)</option>
                  )}
                </select>
                <button type="button" onClick={handleCreateNewContact} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Create New Contact
                </button>
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
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
            {isContactFormOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                  <h3 className="text-xl font-bold mb-4">Create New Contact</h3>
                  <GenericForm
                    fields={contactFormFields}
                    onSubmit={handleSaveNewContact}
                    onCancel={handleCancelNewContact}
                    submitText="Save Contact"
                    cancelText="Cancel"
                    initialValues={newContact}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    export default VenueForm;
