import { Venue } from './Venue';
import { Person } from './Person';

export interface Booking {
  id: number;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  venueIds: number[]; // Array of venue IDs
  clientId: number;
  djIds: number[];
  eventType: 'DJ' | 'Karaoke' | 'Both';
  musicGenrePreferences?: string;
  specialRequests?: string;
  billedAmount?: number;
  paymentStatus?: 'Paid' | 'Unpaid' | 'Partially Paid';
  notes?: string;
}
