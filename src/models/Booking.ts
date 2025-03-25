import { Venue } from './Venue';
    import { Client } from './Client';
    import { Person } from './Person';

    export interface Booking {
      id: number;
      bookingName: string;
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
      status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
      venues: Venue[];
      client: Client;
      djs: Person[];
      eventType: 'dj' | 'karaoke' | 'both';
      musicGenrePreferences?: string;
      specialRequests?: string;
      notes?: string;
      invoiceDetails?: Invoice;
    }

    export interface Invoice {
      amount: number;
      paymentStatus: 'paid' | 'unpaid' | 'partial';
      dueDate: string;
    }
