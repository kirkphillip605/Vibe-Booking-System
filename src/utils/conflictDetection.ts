export const detectBookingConflicts = (
      newBooking: { startDate: string; startTime: string; endTime: string; venueId: number },
      existingBookings: {
        startDate: string;
        startTime: string;
        endTime: string;
        venueId: number;
      }[]
    ): boolean => {
      const newStart = new Date(`${newBooking.startDate}T${newBooking.startTime}`);
      const newEnd = new Date(`${newBooking.startDate}T${newBooking.endTime}`);

      for (const booking of existingBookings) {
        if (booking.venueId !== newBooking.venueId) continue;

        const existingStart = new Date(`${booking.startDate}T${booking.startTime}`);
        const existingEnd = new Date(`${booking.startDate}T${booking.endTime}`);

        if (newStart < existingEnd && newEnd > existingStart) {
          return true; // Conflict detected
        }
      }

      return false; // No conflict
    };
