import { Contact } from './Contact';
    import { VenueType } from './VenueType';

    export interface Venue {
      id: number;
      name: string;
      address1: string;
      address2?: string;
      city: string;
      state: string;
      zipCode: string;
      venueTypes: VenueType[];
      capacity?: number;
      description?: string;
      equipment?: string; // Consider a separate Equipment model for more complex inventory
      specifications?: string;
      images?: string[]; // URLs or paths to images
      contacts: Contact[];
    }
