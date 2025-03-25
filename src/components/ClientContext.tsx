import React, { createContext, useState, useContext, useEffect } from 'react';
    import { Client, Venue, Person, Booking, ClientType, ClientSegmentation, ContactRole, ContactType, PhoneNumber, EmailAddress, Address, Contact, ContactMethod } from '../models';
    import { detectBookingConflicts } from '../utils/conflictDetection';

    interface ClientContextType {
      clients: Client[];
      venues: Venue[];
      people: Person[];
      bookings: Booking[];
      clientTypes: ClientType[];
      clientSegmentations: ClientSegmentation[];
      contactRoles: ContactRole[];
      contactTypes: ContactType[];
      phoneNumbers: PhoneNumber[];
      emailAddresses: EmailAddress[];
      addresses: Address[];
      contacts: Contact[];
      contactMethods: ContactMethod[];
      onAddClient: (client: Client) => void;
      onEditClient: (client: Client) => void;
      onDeleteClient: (id: number) => void;
      onAddDJ: (dj: Person) => void;
      onEditDJ: (dj: Person) => void;
      onDeleteDJ: (id: number) => void;
      onAddBooking: (booking: Booking) => void;
      onEditBooking: (booking: Booking) => void;
      onDeleteBooking: (id: number) => void;
    }

    const ClientContext = createContext<ClientContextType | undefined>(undefined);

    interface ClientProviderProps {
      children: React.ReactNode;
    }

    export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
      const [clients, setClients] = useState<Client[]>([]);
      const [venues, setVenues] = useState<Venue[]>([]);
      const [people, setPeople] = useState<Person[]>([]);
      const [bookings, setBookings] = useState<Booking[]>([]);
      const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
      const [clientSegmentations, setClientSegmentations] = useState<ClientSegmentation[]>([]);
      const [contactRoles, setContactRoles] = useState<ContactRole[]>([]);
      const [contactTypes, setContactTypes] = useState<ContactType[]>([]);
      const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
      const [emailAddresses, setEmailAddresses] = useState<EmailAddress[]>([]);
      const [addresses, setAddresses] = useState<Address[]>([]);
      const [contacts, setContacts] = useState<Contact[]>([]);
      const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);

      // Mock data for demonstration
      useEffect(() => {
        // Client Types
        setClientTypes([
          { id: '1', name: 'Corporate' },
          { id: '2', name: 'Private' },
        ]);

        // Client Segmentations
        setClientSegmentations([
          { id: '1', name: 'Platinum' },
          { id: '2', name: 'Gold' },
          { id: '3', name: 'Silver' },
        ]);

        // Contact Roles
        setContactRoles([
          { id: '1', name: 'Primary Contact' },
          { id: '2', name: 'Secondary Contact' },
        ]);

        // Contact Types
        setContactTypes([
          { id: '1', name: 'Phone' },
          { id: '2', name: 'Email' },
          { id: '3', name: 'Address' },
        ]);

        // Phone Numbers
        setPhoneNumbers([
          { id: 1, contactId: 1, phoneNumber: '123-456-7890', phoneType: 'Mobile' },
        ]);

        // Email Addresses
        setEmailAddresses([
          { id: 1, contactId: 1, emailAddress: 'test@example.com', emailType: 'Personal' },
        ]);

        // Addresses
        setAddresses([
          { id: 1, contactId: 1, addressLine1: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '91234', addressType: 'Home' },
        ]);

        // Contacts
        setContacts([
          { id: 1, clientId: 1, contactRoleId: '1', contactTypeId: '1', contactValue: '123-456-7890' },
        ]);

        // Contact Methods
        setContactMethods([
          { id: 1, contactId: 1, method: 'Phone', value: '123-456-7890' },
        ]);

        // Clients
        setClients([
          { id: 1, firstName: 'John', lastName: 'Doe', companyName: 'Acme Corp', clientType: '1', clientSegmentation: '1', contacts: [{ id: 1, contactRoleId: '1', contactTypeId: '1', contactValue: '123-456-7890' }] },
          { id: 2, firstName: 'Jane', lastName: 'Smith', companyName: 'Beta Inc', clientType: '2', clientSegmentation: '2', contacts: [{ id: 1, contactRoleId: '1', contactTypeId: '2', contactValue: 'test@example.com' }] },
        ]);

        // Venues
        setVenues([
          { id: 1, name: 'The Grand Ballroom', address: '123 Main St', venueType: 'Ballroom', contact: { id: 1, contactRoleId: '1', contactTypeId: '1', contactValue: '123-456-7890' } },
          { id: 2, name: 'The Cozy Pub', address: '456 Oak Ave', venueType: 'Pub', contact: { id: 2, contactRoleId: '1', contactTypeId: '2', contactValue: 'test@example.com' } },
        ]);

        // People (DJs and Clients - simplified)
        setPeople([
          { id: 1, firstName: 'DJ', lastName: 'Awesome', fullName: 'DJ Awesome', contact: 'dj.awesome@example.com' },
          { id: 2, firstName: 'Client', lastName: 'Regular', fullName: 'Client Regular', contact: 'client.regular@example.com' },
        ]);

        // Bookings
        setBookings([
          {
            id: 1,
            bookingName: 'Awesome Party',
            startDate: '2024-07-20',
            startTime: '19:00',
            endDate: '2024-07-20',
            endTime: '23:00',
            status: 'confirmed',
            venueId: 1,
            primaryContactId: 2,
            djIds: [1],
            eventType: 'dj',
            musicGenrePreferences: 'House, Techno',
            specialRequests: 'Smoke machine',
            notes: 'VIP area required',
          },
        ]);
      }, []);

      const onAddClient = (newClient: Client) => {
        setClients(prevClients => [...prevClients, { ...newClient, id: Math.max(0, ...prevClients.map(c => c.id)) + 1 }]);
      };

      const onEditClient = (updatedClient: Client) => {
        setClients(prevClients =>
          prevClients.map(client => (client.id === updatedClient.id ? updatedClient : client))
        );
      };

      const onDeleteClient = (id: number) => {
        setClients(prevClients => prevClients.filter(client => client.id !== id));
      };

      const onAddDJ = (newDJ: Person) => {
        setPeople(prevPeople => [...prevPeople, { ...newDJ, id: Math.max(0, ...prevPeople.map(p => p.id)) + 1 }]);
      };

      const onEditDJ = (updatedDJ: Person) => {
        setPeople(prevPeople =>
          prevPeople.map(dj => (dj.id === updatedDJ.id ? updatedDJ : dj))
        );
      };

      const onDeleteDJ = (id: number) => {
        setPeople(prevPeople => prevPeople.filter(dj => dj.id !== id));
      };

      const onAddBooking = (newBooking: Booking) => {
        // Basic conflict detection
        const existingBookingsForVenue = bookings.filter(booking => booking.venueId === newBooking.venueId);
        const isConflicting = detectBookingConflicts(
          {
            startDate: newBooking.startDate,
            startTime: newBooking.startTime,
            endTime: newBooking.endTime,
            venueId: newBooking.venueId,
          },
          existingBookingsForVenue.map(booking => ({
            startDate: booking.startDate,
            startTime: booking.startTime,
            endTime: booking.endTime,
            venueId: booking.venueId,
          }))
        );

        if (isConflicting) {
          alert('This booking conflicts with an existing booking.');
          return;
        }

        setBookings(prevBookings => [...prevBookings, { ...newBooking, id: Math.max(0, ...prevBookings.map(b => b.id)) + 1 }]);
      };

      const onEditBooking = (updatedBooking: Booking) => {
        setBookings(prevBookings =>
          prevBookings.map(booking => (booking.id === updatedBooking.id ? updatedBooking : booking))
        );
      };

      const onDeleteBooking = (id: number) => {
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
      };

      const value = {
        clients,
        venues,
        people,
        bookings,
        clientTypes,
        clientSegmentations,
        contactRoles,
        contactTypes,
        phoneNumbers,
        emailAddresses,
        addresses,
        contacts,
        contactMethods,
        onAddClient,
        onEditClient,
        onDeleteClient,
        onAddDJ,
        onEditDJ,
        onDeleteDJ,
        onAddBooking,
        onEditBooking,
        onDeleteBooking,
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
