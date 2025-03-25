import { AddressType } from './AddressType';

    export interface Address {
      id: number;
      address1: string;
      address2?: string;
      city: string;
      state: string;
      zipCode: string;
      addressType?: string; // ID of AddressType
    }
