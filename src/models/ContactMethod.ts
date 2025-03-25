import { PhoneType } from './PhoneType';
    import { EmailType } from './EmailType';
    import { AddressType } from './AddressType';

    export type ContactMethod =
      | { type: 'phone'; value: string; phoneType?: PhoneType }
      | { type: 'email'; value: string; emailType?: EmailType }
      | { type: 'address'; value: string; addressType?: AddressType; }
