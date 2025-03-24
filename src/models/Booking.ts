export interface Booking {
      id: number;
      venueId: number;
      primaryContactId: number;
      djIds: number[];
      startDate: string;
      startTime: string;
      status: 'Draft' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed';
    }
