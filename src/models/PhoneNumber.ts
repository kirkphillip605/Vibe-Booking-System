import { PhoneType } from './PhoneType';

    export interface PhoneNumber {
      id: number;
      number: string;
      phoneType?: string; // ID of PhoneType
    }
