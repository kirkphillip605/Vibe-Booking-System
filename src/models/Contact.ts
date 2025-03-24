import { ContactMethod } from './ContactMethod';
import { ContactRole } from './ContactRole';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  contactMethods: ContactMethod[];
  contactRoles: ContactRole[];
  notes?: string;
}
