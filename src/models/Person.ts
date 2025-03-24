import { Contact } from './Contact';

export interface Person extends Contact {
  fullName: string;
  roleIds: number[];
  bio?: string;
  profilePicture?: string;
  hourlyRate?: number;
  eventRate?: number;
  availability?: {
    days: string[]; // e.g., ['Monday', 'Wednesday']
    startTime: string;
    endTime: string;
  };
}
