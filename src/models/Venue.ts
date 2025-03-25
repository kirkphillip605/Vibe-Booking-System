import { VenueType } from './VenueType';
    import { Contact } from './Contact';

    export interface Venue {
      id: number;
      name: string;
      address: string;
      venueTypes: number[]; // Array of VenueType IDs
      contacts: Contact[];
    }
