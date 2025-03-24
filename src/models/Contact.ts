export interface Contact {
      id: number;
      firstName: string;
      lastName: string;
      contactType: string; // e.g., Venue, Client, DJ
      contactRole: string; // e.g., Manager, Event Coordinator
      phoneNumbers: { type: string; number: string }[];
      emailAddresses: { type: string; address: string }[];
      addresses: { type: string; street: string; city: string; state: string; zip: string; country: string }[];
    }
