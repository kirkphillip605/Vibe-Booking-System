import React, { useState, useEffect } from 'react';
    import { Client, ClientType, ClientSegmentation } from '../models';
    import FormInput from './ui/FormInput';
    import { useClientContext } from './ClientContext';

    interface ClientFormProps {
      client?: Client | null;
      onClose: () => void;
      onSave: (client: Client) => void;
    }

    const ClientForm: React.FC<ClientFormProps> = ({ client, onClose, onSave }) => {
      const { clientTypes, clientSegmentations } = useClientContext();
      const [formData, setFormData] = useState<Client>({
        id: client?.id || 0,
        firstName: client?.firstName || '',
        lastName: client?.lastName || '',
        companyName: client?.companyName || '',
        clientType: client?.clientType || '',
        clientSegmentation: client?.clientSegmentation || '',
        contacts: client?.contacts || [],
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

        if (!formData.firstName) {
          newErrors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName) {
          newErrors.lastName = 'Last name is required';
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
                label="Company Name"
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
              <div className="flex flex-col">
                <label htmlFor="clientType" className="block text-sm font-medium text-gray-700">Client Type</label>
                <select
                  id="clientType"
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Client Type</option>
                  {clientTypes?.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="clientSegmentation" className="block text-sm font-medium text-gray-700">Client Segmentation</label>
                <select
                  id="clientSegmentation"
                  name="clientSegmentation"
                  value={formData.clientSegmentation}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Client Segmentation</option>
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
