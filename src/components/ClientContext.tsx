import React, { createContext, useState, useContext } from 'react';
    import { Client, ClientType, Contact, Booking, Person, ClientSegmentation } from '../models';

    interface ClientContextType {
      clients: Client[];
      clientTypes: ClientType[];
      contacts: Contact[];
      bookings: Booking[];
      people: Person[];
      clientSegmentations: ClientSegmentation[];
      onClientsChange: (clients: Client[]) => void;
      onClientTypesChange: (clientTypes: ClientType[]) => void;
      onContactsChange: (contacts: Contact[]) => void;
      onBookingsChange: (bookings: Booking[]) => void;
      onPeopleChange: (people: Person[]) => void;
      onClientSegmentationsChange: (clientSegmentations: ClientSegmentation[]) => void;
    }

    const ClientContext = createContext<ClientContextType | undefined>(undefined);

    interface ClientProviderProps {
      children: React.ReactNode;
      clients: Client[];
      clientTypes: ClientType[];
      contacts: Contact[];
      bookings: Booking[];
      people: Person[];
      clientSegmentations: ClientSegmentation[];
      onClientsChange: (clients: Client[]) => void;
      onClientTypesChange: (clientTypes: ClientType[]) => void;
      onContactsChange: (contacts: Contact[]) => void;
      onBookingsChange: (bookings: Booking[]) => void;
      onPeopleChange: (people: Person[]) => void;
      onClientSegmentationsChange: (clientSegmentations: ClientSegmentation[]) => void;
    }

    export const ClientProvider: React.FC<ClientProviderProps> = ({
      children,
      clients,
      clientTypes,
      contacts,
      bookings,
      people,
      clientSegmentations,
      onClientsChange,
      onClientTypesChange,
      onContactsChange,
      onBookingsChange,
      onPeopleChange,
      onClientSegmentationsChange,
    }) => {
      const value: ClientContextType = {
        clients,
        clientTypes,
        contacts,
        bookings,
        people,
        clientSegmentations,
        onClientsChange,
        onClientTypesChange,
        onContactsChange,
        onBookingsChange,
        onPeopleChange,
        onClientSegmentationsChange,
      };

      return (
        <ClientContext.Provider value={value}>
          {children}
        </ClientContext.Provider>
      );
    };

    export const useClientContext = () => {
      const context = useContext(ClientContext);
      if (!context) {
        throw new Error('useClientContext must be used within a ClientProvider');
      }
      return context;
    };

    export default ClientContext;
