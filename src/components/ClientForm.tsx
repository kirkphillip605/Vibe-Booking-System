import React, { useState, useEffect } from 'react';
    import { Client, ClientType, Contact, Booking, Person, ClientSegmentation } from '../models';
    import FormInput from './ui/FormInput';

    interface ClientFormProps {
      client?: Client | null;
      onClose: () => void;
      onSave: (client: Client) => void;
      clientTypes: ClientType[];
      contacts: Contact[];
      bookings: Booking[];
      people: Person[];
      clientSegmentations: ClientSegmentation[];
    }

    const ClientForm: React.FC<ClientFormProps> = ({
      client,
      onClose,
      onSave,
      clientTypes,
      contacts,
      bookings,
      people,
      clientSegmentations,
    }) => {
      const [formData, setFormData] = useState<Client>({
        id: client?.id || 0,
        clientType: client?.clientType || '',
        businessName: client?.businessName || '',
        primaryContact: client?.primaryContact,
      });
      const [errors, setErrors] = useState<{ [key: string]: string }>({});

      useEffect(() => {
        if (client) {
          setFormData(client);
        }
      }, [client]);

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

        if (!formData.clientType) {
          newErrors.clientType = 'Client type is required';
          isValid = false;
        }

        if (formData.clientType === 'Business' && !formData.businessName) {
          newErrors.businessName = 'Business name is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      const clientTypeOptions = clientTypes?.map(clientType => ({ value: clientType.name, label: clientType.name })) || [];

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{client ? 'Edit Client' : 'Add Client'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Client Type"
                type="select"
                id="clientType"
                name="clientType"
                value={formData.clientType}
                onChange={handleChange}
                error={errors.clientType}
              >
                <option value="">Select Client Type</option>
                {clientTypeOptions.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </FormInput>
              {formData.clientType === 'Business' && (
                <FormInput
                  label="Business Name"
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  error={errors.businessName}
                />
              )}
              {/* Add fields for primary contact, booking history, payment history, preferences, and notes here */}
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

    export default ClientForm;
