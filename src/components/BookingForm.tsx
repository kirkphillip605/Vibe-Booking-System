import React, { useState, useEffect } from 'react';
    import { Booking, Venue, Person } from '../models';
    import FormInput from './ui/FormInput';

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
        const { selectedOptions } = e.target;
        const selectedDjIds = Array.from(selectedOptions, option => parseInt(option.value, 10));
        setFormData(prevFormData => ({
          ...prevFormData,
          djIds: selectedDjIds,
        }));
        setErrors(prevErrors => ({ ...prevErrors, djIds: '' }));
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
          newErrors.primaryContactId = 'Client is required';
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

        setErrors(newErrors);
        return isValid;
      };

      const venueOptions = venues?.map(venue => ({ value: venue.id, label: venue.name })) || [];
      const clientOptions = people?.map(person => ({ value: person.id, label: person.fullName })) || [];
      const djOptions = people?.map(person => ({ value: person.id, label: person.fullName })) || [];

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{booking ? 'Edit Booking' : 'Add Booking'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Venue"
                type="select"
                id="venueId"
                name="venueId"
                value={formData.venueId}
                onChange={handleChange}
                error={errors.venueId}
              >
                <option value="">Select Venue</option>
                {venueOptions.map(venue => (
                  <option key={venue.value} value={venue.value}>{venue.label}</option>
                ))}
              </FormInput>
              <FormInput
                label="Client"
                type="select"
                id="primaryContactId"
                name```
                value={formData.primaryContactId}
                onChange={handleChange}
                error={errors.primaryContactId}
              >
                <option value="">Select Client</option>
                {clientOptions.map(client => (
                  <option key={client.value} value={client.value}>{client.label}</option>
                ))}
              </FormInput>
              <FormInput
                label="DJ(s)"
                type="select"
                id="djIds"
                name="djIds"
                value={formData.djIds}
                onChange={handleDjChange}
                error={errors.djIds}
                multiple
              >
                {djOptions.map(dj => (
                  <option key={dj.value} value={dj.value}>{dj.label}</option>
                ))}
              </FormInput>
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
                label="Status"
                type="select"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Postponed">Postponed</option>
              </FormInput>
              {/* Add fields for event type, music preferences, special requests, and notes here */}
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
