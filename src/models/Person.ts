import { ContactMethod } from './ContactMethod';
    import { Role } from './Role';

    export interface Person {
      id: number;
      fullName: string;
      contact: string;
      roleIds?: number[];
    }
