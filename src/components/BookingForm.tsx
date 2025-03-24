import React, { useState } from 'react';
import { Booking } from '../models/Booking';
import { Venue } from '../models/Venue';
import { Person } from '../models/Person';
import { isDJAvailable } from '../utils/conflictDetection';
import GenericForm from './ui/GenericForm';

interface Props {
  booking?: Booking | null;
  onClose: () => void;
  onSave: (booking: Booking) => void;
  venues: Venue[];
  people: Person[];
  bookings: Booking[];
}

const BookingForm: React.FC<Props> = ({ booking, onClose, onSave, venues, people, bookings }) => {
  const [venueId, setVenueId] = useState(booking?.venueId || 0);
  const [primaryContactId, setPrimaryContactId] = useState(booking?.primaryContactId || 0);
  const [djIds, setDjIds] = useState(booking?.djIds || []);
  const [name, setName] = useState(booking?.name || '');
  const [type, setType] = useState(booking?.type || '');
  const [description, setDescription] = useState(booking?.description || '');
  const [startDate, setStartDate] = useState(booking?.startDate || '');
  const [startTime, setStartTime] = useState(booking?.startTime || '');
  const [endDate, setEndDate] = useState(booking?.endDate || '');
  const [endTime, setEndTime] = useState(booking?.endTime || '');
  const [billedAmount, setBilledAmount] = useState(booking?.billedAmount || 0);
  const [paymentStatus, setPaymentStatus] = useState(booking?.paymentStatus || 'Unpaid');
  const [status, setStatus] = useState(booking?.status || 'Draft');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!venueId) {
      newErrors.venueId = 'Venue is required';
      isValid = false;
    }
    if (!primaryContactId) {
      newErrors.primaryContactId = 'Client is required';
      isValid = false;
    }
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!type.trim()) {
      newErrors.type = 'Type is required';
      isValid = false;
    }
    if (!startDate.trim()) {
      newErrors.startDate = 'Start Date is required';
      isValid = false;
    }
    if (!startTime.trim()) {
      newErrors.startTime = 'Start Time is required';
      isValid = false;
    }
    if (!endDate.trim()) {
      newErrors.endDate = 'End Date is required';
      isValid = false;
    }
    if (!endTime.trim()) {
      newErrors.endTime = 'End Time is required';
      isValid = false;
    }

    // DJ Availability Check
    if (djIds.length > 0) {
      for (const djId of djIds) {
        if (!isDJAvailable(djId, startDate, startTime, endDate, endTime, bookings, people)) {
          newErrors.djAvailability = `DJ is not available on the selected date and time.`;
          isValid = false;
          break;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newBooking: Booking = {
        id: booking?.id || Date.now(),
        venueId,
        primaryContactId,
        djIds,
        name,
        type,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        billedAmount,
        paymentStatus,
        status,
      };

      onSave(newBooking);
      onClose();
      setName('');
      setType('');
      setDescription('');
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');
      setBilledAmount(0);
      setPaymentStatus('Unpaid');
      setStatus('Draft');
      setErrors({});
    }
  };

  const handleCancel = () => {
    onClose();
    setName('');
    setType('');
    setDescription('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setBilledAmount(0);
    setPaymentStatus('Unpaid');
    setStatus('Draft');
    setErrors({});
  };

  const handleDjChange = (djId: number, isChecked: boolean) => {
    setDjIds(prevDjIds => {
      if (isChecked) {
        return [...prevDjIds, djId];
      } else {
        return prevDjIds.filter(id => id !== djId);
      }
    });
  };

  const formFields = [
    {
      name: 'venueId',
      label: 'Venue',
      type: 'select',
      value: venueId,
      onChange: setVenueId,
      required: true,
      options: venues.map(venue => ({ value: venue.id, label: venue.name })),
      error: errors.venueId,
    },
    {
      name: 'primaryContactId',
      label: 'Client',
      type: 'select',
      value: primaryContactId,
      onChange: setPrimaryContactId,
      required: true,
      options: people.filter(person => person.roleIds.includes(2)).map(client => ({ value: client.id, label: client.fullName })), // Assuming roleId 2 is Client
      error: errors.primaryContactId,
    },
    {
      name: 'name',
      label: 'Booking Name',
      type: 'text',
      value: name,
      onChange: setName,
      required: true,
      error: errors.name,
    },
    {
      name: 'type',
      label: 'Booking Type',
      type: 'text',
      value: type,
      onChange: setType,
      required: true,
      error: errors.type,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      value: description,
      onChange: setDescription,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      value: startDate,
      onChange: setStartDate,
      required: true,
      error: errors.startDate,
    },
    {
      name: 'startTime',
      label: 'Start Time',
      type: 'time',
      value: startTime,
      onChange: setStartTime,
      required: true,
      error: errors.startTime,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      value: endDate,
      onChange: setEndDate,
      required: true,
      error: errors.endDate,
    },
    {
      name: 'endTime',
      label: 'End Time',
      type: 'time',
      value: endTime,
      onChange: setEndTime,
      required: true,
      error: errors.endTime,
    },
    {
      name: 'billedAmount',
      label: 'Billed Amount',
      type: 'number',
      value: billedAmount,
      onChange: setBilledAmount,
    },
    {
      name: 'paymentStatus',
      label: 'Payment Status',
      type: 'select',
      value: paymentStatus,
      onChange: setPaymentStatus,
      options: [
        { value: 'Paid', label: 'Paid' },
        { value: 'Unpaid', label: 'Unpaid' },
        { value: 'Partially Paid', label: 'Partially Paid' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      value: status,
      onChange: setStatus,
      options: [
        { value: 'Draft', label: 'Draft' },
        { value: 'Confirmed', label: 'Confirmed' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Cancelled', label: 'Cancelled' },
        { value: 'Postponed', label: 'Postponed' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {booking ? 'Edit Booking' : 'Add Booking'}
        </h3>
        <div className="mt-2">
          <GenericForm
            fields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Save"
            cancelButtonText="Cancel"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">DJs</label>
            <div>
              {people.filter(person => person.roleIds.includes(1)).map(dj => ( // Assuming roleId 1 is DJ
                <label key={dj.id} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    checked={djIds.includes(dj.id)}
                    onChange={e => handleDjChange(dj.id, e.target.checked)}
                  />
                  <span className="ml-2 text-gray-700">{dj.fullName}</span>
                </label>
              ))}
            </div>
            {errors.djAvailability && <p className="mt-1 text-red-500 text-sm">{errors.djAvailability}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
