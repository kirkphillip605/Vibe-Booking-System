import React, { useState, useEffect } from 'react';
    import { Booking, Venue, Person } from '../models';
    import FormInput from './ui/FormInput';
    import { useClientContext } from './ClientContext';
    import { detectBookingConflicts } from '../utils/conflictDetection';

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
        bookingName: booking?.bookingName || '',
        startDate: booking?.startDate || '',
        startTime: booking?.startTime || '',
        endDate: booking?.endDate || '',
        endTime: booking?.endTime || '',
        status: booking?.status || 'Draft',
        venueId: booking?.venueId || 0,
        primaryContactId: booking?.primaryContactId || 0,
        djIds: booking?.djIds || [],
        eventType: booking?.eventType || 'dj',
        musicGenrePreferences: booking?.musicGenrePreferences || '',
        specialRequests: booking?.specialRequests || '',
        notes: booking?.notes || '',
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

      const handleVenueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setFormData(prevFormData => ({
          ...prevFormData,
          venueId: value,
        }));
        setErrors(prevErrors => ({ ...prevErrors, venueId: '' }));
      };

      const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setFormData(prevFormData => ({
          ...prevFormData,
          primaryContactId: value,
        }));
        setErrors(prevErrors => ({ ...prevErrors, primaryContactId: '' }));
      };

      const handleDJChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData(prevFormData => ({
          ...prevFormData,
          djIds: selectedOptions,
        }));
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
          if (isBookingConflicting()) {
            alert('This booking conflicts with an existing booking.');
            return;
          }
          onSave(formData);
        }
      };

      const validateForm = () => {
        let isValid = true;
        const newErrors: { [key: string]: string } = {};

        if (!formData.bookingName) {
          newErrors.bookingName = 'Booking name is required';
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
        if (!formData.venueId) {
          newErrors.venueId = 'Venue is required';
          isValid = false;
        }
        if (!formData.primaryContactId) {
          newErrors.primaryContactId = 'Client is required';
          isValid = false;
        }
        if (!formData.endDate) {
          newErrors.endDate = 'End date is required';
          isValid = false;
        }
        if (!formData.endTime) {
          newErrors.endTime = 'End time is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      const isBookingConflicting = () => {
        if (!bookings || !formData.venueId || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
          return false; // Not enough data to check
        }

        const newBooking = {
          startDate: formData.startDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          venueId: formData.venueId,
        };

        const existingBookingsForVenue = bookings.filter(booking => booking.venueId === formData.venueId);

        return detectBookingConflicts(
          newBooking,
          existingBookingsForVenue.map(booking => ({
            startDate: booking.startDate,
            startTime: booking.startTime,
            endTime: booking.endTime,
            venueId: booking.venueId,
          }))
        );
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{booking ? 'Edit Booking' : 'Add Booking'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Booking Name"
                type="text"
                id="bookingName"
                name="bookingName"
                value={formData.bookingName}
                onChange={handleChange}
                error={errors.bookingName}
              />
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
                label="End Date"
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                error={errors.endDate}
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
              <div className="flex flex-col">
                <label htmlFor="venueId" className="block text-sm font-medium text-gray-700">Venue</label>
                <select
                  id="venueId"
                  name="venueId"
                  value={formData.venueId}
                  onChange={handleVenueChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Venue</option>
                  {venues?.map(venue => (
                    <option key={venue.id} value={venue.id}>{venue.name}</option>
                  ))}
                </select>
                {errors.venueId && <p className="text-red-500 text-sm">{errors.venueId}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="primaryContactId" className="block text-sm font-medium text-gray-700">Client</label>
                <select
                  id="primaryContactId"
                  name="primaryContactId"
                  value={formData.primaryContactId}
                  onChange={handleClientChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Client</option>
                  {people?.map(person => (
                    <option key={person.id} value={person.id}>{person.firstName} {person.lastName}</option>
                  ))}
                </select>
                {errors.primaryContactId && <p className="text-red-500 text-sm">{errors.primaryContactId}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="djIds" className="block text-sm font-medium text-gray-700">DJ(s)</label>
                <select
                  id="djIds"
                  name="djIds"
                  multiple
                  value={formData.djIds}
                  onChange={handleDJChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {people?.map(person => (
                    <option key={person.id} value={person.id}>{person.firstName} {person.lastName}</option>
                  ))}
                </select>
              </div>
              <FormInput
                label="Event Type"
                type="text"
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
              />
              <FormInput
                label="Music Genre Preferences"
                type="text"
                id="musicGenrePreferences"
                name="musicGenrePreferences"
                value={formData.musicGenrePreferences}
                onChange={handleChange}
              />
              <FormInput
                label="Special Requests"
                type="text"
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
              />
              <FormInput
                label="Notes"
                type="text"
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
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
