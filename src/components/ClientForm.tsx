import React, { useState, useEffect } from 'react';
    import { Client, ClientType, Person, ClientSegmentation } from '../models';
    import FormInput from './ui/FormInput';
    import { useClientContext } from './ClientContext';

    interface ClientFormProps {
      client?: Client | null;
      onClose: () => void;
      onSave: (client: Client) => void;
      clientTypes?: ClientType[];
      contacts?: Person[];
      bookings?: any[]; // Assuming bookings is not used in this component
      people?: Person[];
      clientSegmentations?: ClientSegmentation[];
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
        businessName: client?.businessName || '',
        clientTypeId: client?.clientTypeId || 0,
        primaryContact: client?.primaryContact || null,
        clientSegmentationId: client?.clientSegmentationId || 0,
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

        if (!formData.businessName) {
          newErrors.businessName = 'Business name is required';
          isValid = false;
        }
        if (!formData.clientTypeId) {
          newErrors.clientTypeId = 'Client type is required';
          isValid = false;
        }
        if (!formData.primaryContact) {
          newErrors.primaryContact = 'Primary contact is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{client ? 'Edit Client' : 'Add Client'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Business Name"
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                error={errors.businessName}
              />
              <div className="flex flex-col">
                <label htmlFor="clientTypeId" className="block text-sm font-medium text-gray-700">Client Type</label>
                <select
                  id="clientTypeId"
                  name="clientTypeId"
                  value={formData.clientTypeId}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>Select a client type</option>
                  {clientTypes?.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                {errors.clientTypeId && <p className="text-red-500 text-sm">{errors.clientTypeId}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="primaryContact" className="block text-sm font-medium text-gray-700">Primary Contact</label>
                <select
                  id="primaryContact"
                  name="primaryContact"
                  value={formData.primaryContact?.id || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>Select a contact</option>
                  {people?.map(person => (
                    <option key={person.id} value={person.id}>{person.fullName}</option>
                  ))}
                </select>
                {errors.primaryContact && <p className="text-red-500 text-sm">{errors.primaryContact}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="clientSegmentationId" className="block text-sm font-medium text-gray-700">Client Segmentation</label>
                <select
                  id="clientSegmentationId"
                  name="clientSegmentationId"
                  value={formData.clientSegmentationId}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>Select a segmentation</option>
                  {clientSegmentations?.map(segmentation => (
                    <option key={segmentation.id} value={segmentation.id}>{segmentation.name}</option>
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

    export default ClientForm;
