import { EmailType } from './EmailType';

    export interface EmailAddress {
      id: number;
      address: string;
      emailType?: string; // ID of EmailType
    }
