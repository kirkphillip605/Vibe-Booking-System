import { Contact } from './Contact';
import { VenueType } from './VenueType';

export interface Venue {
  id: number;
  name: string;
  address: string;
  description?: string;
  capacity?: number;
  venueTypes: VenueType[];
  equipment?: string[]; // Consider linking to an Inventory model
  specifications?: { [key: string]: string }; // Parking, Accessibility, etc.
  images?: string[];
  contacts: Contact[];
}
