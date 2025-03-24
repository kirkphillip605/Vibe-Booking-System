import { Booking } from '../models/Booking';
import { Person } from '../models/Person';

export const isDJAvailable = (
  djId: number,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  bookings: Booking[],
  people: Person[]
): boolean => {
  const djBookings = bookings.filter(booking => booking.djIds.includes(djId));

  for (const booking of djBookings) {
    if (booking.status !== 'Cancelled' && booking.status !== 'Postponed') {
      const bookingStart = new Date(`${booking.startDate}T${booking.startTime}`);
      const bookingEnd = new Date(`${booking.endDate}T${booking.endTime}`);
      const newBookingStart = new Date(`${startDate}T${startTime}`);
      const newBookingEnd = new Date(`${endDate}T${endTime}`);

      if (newBookingStart < bookingEnd && newBookingEnd > bookingStart) {
        return false; // Conflict found
      }
    }
  }

  return true; // No conflict
};
