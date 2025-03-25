export const detectBookingConflicts = (
      newBooking: { startDate: string; startTime: string; endTime: string; venueId: number },
      existingBookings: {
        startDate: string;
        startTime: string;
        endTime: string;
        venueId: number;
      }[]
    ): boolean => {
      if (!newBooking.startDate || !newBooking.startTime || !newBooking.endTime) {
        return false; // If any time-related field is missing, don't consider it a conflict
      }

      const newStart = new Date(`${newBooking.startDate}T${newBooking.startTime}`);
      const newEnd = new Date(`${newBooking.startDate}T${newBooking.endTime}`);

      for (const booking of existingBookings) {
        if (booking.venueId !== newBooking.venueId) continue;

        if (!booking.startDate || !booking.startTime || !booking.endTime) {
          continue; // Skip bookings with missing time data
        }

        const existingStart = new Date(`${booking.startDate}T${booking.startTime}`);
        const existingEnd = new Date(`${booking.startDate}T${booking.endTime}`);

        if (newStart < existingEnd && newEnd > existingStart) {
          return true; // Conflict detected
        }
      }

      return false; // No conflict
    };
