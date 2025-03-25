import { ClientType } from './ClientType';
    import { ClientSegmentation } from './ClientSegmentation';
    import { Person } from './Person';

    export interface Client {
      id: number;
      businessName: string;
      clientTypeId: number;
      primaryContact: Person | null;
      clientSegmentationId?: number;
    }
