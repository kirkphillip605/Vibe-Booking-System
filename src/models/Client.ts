import { Contact } from './Contact';

    export interface Client {
      id: number;
      clientType: string; // Individual or Business
      businessName?: string;
      primaryContact?: Contact;
      // Add other client-specific fields here
    }
