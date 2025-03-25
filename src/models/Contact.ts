import { ContactMethod } from './ContactMethod';

    export interface Contact {
      id: number;
      firstName: string;
      lastName: string;
      contactType: string;
      contactRole: string;
      phoneNumbers?: ContactMethod[];
      emailAddresses?: ContactMethod[];
      addresses?: ContactMethod[];
    }
