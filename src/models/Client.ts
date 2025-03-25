import { Contact } from './Contact';
    import { ClientType } from './ClientType';
    import { ClientSegmentation } from './ClientSegmentation';

    export interface Client {
      id: number;
      firstName: string;
      lastName: string;
      companyName?: string;
      clientType: string; // ID of ClientType
      clientSegmentation: string; // ID of ClientSegmentation
      contacts: Contact[];
    }
