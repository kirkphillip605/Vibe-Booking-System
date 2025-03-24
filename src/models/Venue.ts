import { Contact } from './Contact';

    export interface Venue {
      id: number;
      name: string;
      address: string;
      venueTypes: { id: number; name: string }[]; // Array of VenueType IDs
      contacts: Contact[]; // Array of Contact objects
    }
