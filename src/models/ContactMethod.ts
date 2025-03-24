import { PhoneType } from './PhoneType';
import { EmailType } from './EmailType';
import { AddressType } from './AddressType';

export interface ContactMethod {
  type: 'phone' | 'email' | 'address';
  value: string;
  phoneType?: PhoneType;
  emailType?: EmailType;
  addressType?: AddressType;
}
