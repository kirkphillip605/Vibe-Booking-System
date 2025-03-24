import React, { useState, useEffect } from 'react';
    import { Plus, Pencil, Trash, Search } from 'lucide-react';
    import { Booking } from '../models/Booking';
    import { Venue } from '../models/Venue';
    import { Person } from '../models/Person';
    import { isDJAvailable } from '../utils/conflictDetection';
    import BookingForm from './BookingForm'; // Import the BookingForm component

    interface Props {
      venues: Venue[];
      people: Person[];
      bookings: Booking[];
      onBookingsChange: (bookings: Booking[]) => void;
    }

    const BookingManagement: React.FC<Props> = ({
      venues = [], // Default to empty array
      people = [], // Default to empty array
      bookings = [], // Default to empty array
      onBookingsChange,
    }) => {
      const [searchTerm, setSearchTerm] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
      const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings || []);

      useEffect(() => {
        if (bookings) {
          setFilteredBookings(
            bookings.filter(booking =>
              Object.values(booking).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
          );
        }
      }, [bookings, searchTerm]);

      const handleAddBooking = () => {
        setEditingBooking(null);
        setIsModalOpen(true);
      };

      const handleEditBooking = (booking: Booking) => {
        setEditingBooking(booking);
        setIsModalOpen(true);
      };

      const handleDeleteBooking = (id: number) => {
        if (bookings) {
          const updatedBookings = bookings.filter(booking => booking.id !== id);
          onBookingsChange(updatedBookings);
        }
      };

      const handleSaveBooking = (booking: Booking) => {
        if (editingBooking) {
          if (bookings) {
            const updatedBookings = bookings.map(b => (b.id === booking.id ? booking : b));
            onBookingsChange(updatedBookings);
          }
        } else {
          const newBooking = { ...booking, id: Date.now() };
          onBookingsChange([...(bookings || []), newBooking]);
        }
        setIsModalOpen(false);
        setEditingBooking(null);
      };

      const handleStatusChange = (bookingId: number, newStatus: Booking['status']) => {
        if (bookings) {
          const updatedBookings = bookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          );
          onBookingsChange(updatedBookings);
        }
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Booking Management</h1>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Bookings</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleAddBooking}
            >
              <Plus className="mr-2" size={16} /> Add Booking
            </button>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="text-gray-400" size={16} />
              </div>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Venue</th>
                <th className="text-left">Client</th>
                <th className="text-left">DJ</th>
                <th className="text-left">Date</th>
                <th className="text-left">Time</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => {
                const venue = venues.find(v => v.id === booking.venueId);
                const client = people.find(p => p.id === booking.primaryContactId);
                const djNames = people.filter(p => booking.djIds.includes(p.id)).map(dj => dj.fullName).join(', ');
                return (
                  <tr key={booking.id}>
                    <td>{venue?.name}</td>
                    <td>{client?.fullName}</td>
                    <td>{djNames}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.startTime}</td>
                    <td>
                      {booking.status}
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Postponed">Postponed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleEditBooking(booking)}
                      >
                        <Pencil className="inline-block" size={16} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        <Trash className="inline-block" size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <BookingForm
            booking={editingBooking}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveBooking}
            venues={venues}
            people={people}
            bookings={bookings}
          />
        )}
      </div>
    );
  };

  export default BookingManagement;
