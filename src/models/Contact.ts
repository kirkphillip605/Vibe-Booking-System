import { PhoneNumber } from './PhoneNumber';
    import { EmailAddress } from './EmailAddress';
    import { Address } from './Address';
    import { ContactType } from './ContactType';
    import { ContactRole } from './ContactRole';

    export interface Contact {
      id: number;
      firstName: string;
      lastName: string;
      contactType: string; // ID of ContactType
      contactRole: string; // ID of ContactRole
      phoneNumbers: PhoneNumber[];
      emailAddresses: EmailAddress[];
      addresses: Address[];
    }
