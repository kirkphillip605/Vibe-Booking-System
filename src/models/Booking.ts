import { Venue } from './Venue';
    import { Person } from './Person';

    export interface Booking {
      id: number;
      venueId: number;
      primaryContactId: number;
      djIds: number[];
      startDate: string;
      startTime: string;
      endTime: string;
      description?: string;
      status: 'Draft' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed';
    }
