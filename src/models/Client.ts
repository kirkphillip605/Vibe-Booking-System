import { Contact } from './Contact';
import { Booking } from './Booking';
import { ClientType } from './ClientType';
import { Person } from './Person';
import { ClientSegmentation } from './ClientSegmentation';

export interface Client {
  id: number;
  clientType: ClientType;
  primaryContact: Contact;
  businessName?: string;
  billingAddress?: string;
  website?: string;
  bookingHistory: Booking[];
  paymentHistory?: any[]; // Define a more specific type
  preferences?: { [key: string]: any };
  notes?: string;
  preferredDJs?: Person[];
  paymentTerms?: string;
  clientSegmentations?: ClientSegmentation[];
}
