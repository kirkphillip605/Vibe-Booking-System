import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Dashboard from './components/Dashboard';
    import BookingManagement from './components/BookingManagement';
    import ClientManagement from './components/ClientManagement';
    import DJManagement from './components/DJManagement';
    import Scheduling from './components/Scheduling';
    import VenueManagement from './components/VenueManagement';
    import Settings from './components/Settings';
    import Navigation from './components/Navigation';
    import './index.css';
    import { ClientProvider } from './components/ClientContext';
    import { Client, ClientType, Contact, Booking, Person, ClientSegmentation, Venue, VenueType } from './models';

    function App() {
      const [clients, setClients] = useState<Client[]>([]);
      const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
      const [contacts, setContacts] = useState<Contact[]>([]);
      const [bookings, setBookings] = useState<Booking[]>([]);
      const [people, setPeople] = useState<Person[]>([]);
      const [clientSegmentations, setClientSegmentations] = useState<ClientSegmentation[]>([]);
      const [venues, setVenues] = useState<Venue[]>([]);
      const [venueTypes, setVenueTypes] = useState<VenueType[]>([]);

      useEffect(() => {
        // Mock Data Initialization
        const mockClientTypes: ClientType[] = [
          { id: 1, name: 'Corporate' },
          { id: 2, name: 'Private' },
        ];
        setClientTypes(mockClientTypes);

        const mockClientSegmentations: ClientSegmentation[] = [
          { id: 1, name: 'Platinum' },
          { id: 2, name: 'Gold' },
        ];
        setClientSegmentations(mockClientSegmentations);

        const mockPeople: Person[] = [
          { id: 1, fullName: 'DJ John Doe', contact: 'john.doe@example.com', roleIds: [1] },
          { id: 2, fullName: 'DJ Jane Smith', contact: 'jane.smith@example.com', roleIds: [1] },
          { id: 3, fullName: 'Client Mike Brown', contact: 'mike.brown@example.com', roleIds: [2] },
        ];
        setPeople(mockPeople);

        const mockVenues: Venue[] = [
          { id: 1, name: 'The Grand Ballroom', address: '123 Main St', venueTypes: [{ id: 1, name: 'Ballroom' }], contacts: [] },
          { id: 2, name: 'The Cozy Lounge', address: '456 Oak Ave', venueTypes: [{ id: 2, name: 'Lounge' }], contacts: [] },
        ];
        setVenues(mockVenues);

        const mockVenueTypes: VenueType[] = [
          { id: 1, name: 'Ballroom' },
          { id: 2, name: 'Lounge' },
        ];
        setVenueTypes(mockVenueTypes);

        const mockClients: Client[] = [
          { id: 1, businessName: 'Acme Corp', clientTypeId: 1, primaryContact: mockPeople[2], clientSegmentationId: 1 },
        ];
        setClients(mockClients);

        const mockBookings: Booking[] = [
          { id: 1, venueId: 1, primaryContactId: 3, djIds: [1, 2], startDate: '2024-03-15', startTime: '19:00', endTime: '23:00', description: 'Corporate Event', status: 'Confirmed' },
        ];
        setBookings(mockBookings);
      }, [setClients, setClientTypes, setClientSegmentations, setPeople, setVenues, setVenueTypes, setBookings]);

      const handleAddClient = (newClient: Client) => {
        setClients([...clients, { ...newClient, id: Date.now() }]);
      };

      const handleEditClient = (updatedClient: Client) => {
        setClients(clients.map(client => (client.id === updatedClient.id ? { ...updatedClient } : client)));
      };

      const handleDeleteClient = (clientId: number) => {
        setClients(clients.filter(client => client.id !== clientId));
      };

      const handleAddDJ = (newDJ: Person) => {
        setPeople([...people, { ...newDJ, id: Date.now() }]);
      };

      const handleEditDJ = (updatedDJ: Person) => {
        setPeople(people.map(dj => (dj.id === updatedDJ.id ? { ...updatedDJ } : dj)));
      };

      const handleDeleteDJ = (djId: number) => {
        setPeople(people.filter(dj => dj.id !== djId));
      };

      const handleAddVenue = (newVenue: Venue) => {
        setVenues([...venues, { ...newVenue, id: Date.now() }]);
      };

      const handleEditVenue = (updatedVenue: Venue) => {
        setVenues(venues.map(venue => (venue.id === updatedVenue.id ? { ...updatedVenue } : venue)));
      };

      const handleDeleteVenue = (venueId: number) => {
        setVenues(venues.filter(venue => venue.id !== venueId));
      };

      const handleAddBooking = (newBooking: Booking) => {
        setBookings([...bookings, { ...newBooking, id: Date.now() }]);
      };

      const handleEditBooking = (updatedBooking: Booking) => {
        setBookings(bookings.map(booking => (booking.id === updatedBooking.id ? { ...updatedBooking } : booking)));
      };

      const handleDeleteBooking = (bookingId: number) => {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      };

      return (
        <ClientProvider
          clients={clients}
          clientTypes={clientTypes}
          contacts={contacts}
          bookings={bookings}
          people={people}
          clientSegmentations={clientSegmentations}
          venues={venues}
          venueTypes={venueTypes}
          onClientsChange={setClients}
          onClientTypesChange={setClientTypes}
          onContactsChange={setContacts}
          onBookingsChange={setBookings}
          onPeopleChange={setPeople}
          onClientSegmentationsChange={setClientSegmentations}
          onVenuesChange={setVenues}
          onVenueTypesChange={setVenueTypes}
          onAddClient={handleAddClient}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
          onAddDJ={handleAddDJ}
          onEditDJ={handleEditDJ}
          onDeleteDJ={handleDeleteDJ}
          onAddVenue={handleAddVenue}
          onEditVenue={handleEditVenue}
          onDeleteVenue={handleDeleteVenue}
          onAddBooking={handleAddBooking}
          onEditBooking={handleEditBooking}
          onDeleteBooking={handleDeleteBooking}
        >
          <Router>
            <div className="flex h-screen">
              <Navigation />
              <main className="flex-1 overflow-y-auto p-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bookings" element={<BookingManagement />} />
                  <Route path="/clients" element={<ClientManagement />} />
                  <Route path="/djs" element={<DJManagement />} />
                  <Route path="/scheduling" element={<Scheduling />} />
                  <Route path="/venues" element={<VenueManagement />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ClientProvider>
      );
    }

    export default App;
