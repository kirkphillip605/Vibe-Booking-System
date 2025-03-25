import React, { useState, useEffect } from 'react';
    import { Booking, Venue, Person } from '../models';
    import FormInput from './ui/FormInput';
    import { useClientContext } from './ClientContext';

    interface BookingFormProps {
      booking?: Booking | null;
      onClose: () => void;
      onSave: (booking: Booking) => void;
      venues?: Venue[];
      people?: Person[];
      bookings?: Booking[];
    }

    const BookingForm: React.FC<BookingFormProps> = ({ booking, onClose, onSave, venues, people, bookings }) => {
      const [formData, setFormData] = useState<Booking>({
        id: booking?.id || 0,
        venueId: booking?.venueId || 0,
        primaryContactId: booking?.primaryContactId || 0,
        djIds: booking?.djIds || [],
        startDate: booking?.startDate || '',
        startTime: booking?.startTime || '',
        endTime: booking?.endTime || '',
        description: booking?.description || '',
        status: booking?.status || 'Draft',
      });
      const [errors, setErrors] = useState<{ [key: string]: string }>({});

      useEffect(() => {
        if (booking) {
          setFormData(booking);
        }
      }, [booking]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      };

      const handleDjChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData(prevFormData => ({
          ...prevFormData,
          djIds: selectedOptions,
        }));
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

        if (!formData.venueId) {
          newErrors.venueId = 'Venue is required';
          isValid = false;
        }
        if (!formData.primaryContactId) {
          newErrors.primaryContactId = 'Primary Contact is required';
          isValid = false;
        }
        if (!formData.startDate) {
          newErrors.startDate = 'Start date is required';
          isValid = false;
        }
        if (!formData.startTime) {
          newErrors.startTime = 'Start time is required';
          isValid = false;
        }
        if (!formData.endTime) {
          newErrors.endTime = 'End time is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{booking ? 'Edit Booking' : 'Add Booking'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Start Date"
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                error={errors.startDate}
              />
              <FormInput
                label="Start Time"
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                error={errors.startTime}
              />
              <FormInput
                label="End Time"
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                error={errors.endTime}
              />
              <FormInput
                label="Description"
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <div className="flex flex-col">
                <label htmlFor="venueId" className="block text-sm font-medium text-gray-700">Venue</label>
                <select
                  id="venueId"
                  name="venueId"
                  value={formData.venueId}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>Select a venue</option>
                  {venues?.map(venue => (
                    <option key={venue.id} value={venue.id}>{venue.name}</option>
                  ))}
                </select>
                {errors.venueId && <p className="text-red-500 text-sm">{errors.venueId}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="primaryContactId" className="block text-sm font-medium text-gray-700">Primary Contact</label>
                <select
                  id="primaryContactId"
                  name="primaryContactId"
                  value={formData.primaryContactId}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>Select a contact</option>
                  {people?.map(person => (
                    <option key={person.id} value={person.id}>{person.fullName}</option>
                  ))}
                </select>
                {errors.primaryContactId && <p className="text-red-500 text-sm">{errors.primaryContactId}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="djIds" className="block text-sm font-medium text-gray-700">DJs</label>
                <select
                  id="djIds"
                  name="djIds"
                  multiple
                  value={formData.djIds}
                  onChange={handleDjChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {people?.map(person => (
                    <option key={person.id} value={person.id}>{person.fullName}</option>
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

    export default BookingForm;
