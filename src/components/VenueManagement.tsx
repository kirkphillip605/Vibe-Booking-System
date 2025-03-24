import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash, Search } from 'lucide-react';
import VenueForm from './VenueForm';
import { Venue, VenueType, Contact } from '../models'; // Import Venue and VenueType
import { ContactForm } from './ContactForm';

interface VenueManagementProps {
  venues: Venue[];
  venueTypes: VenueType[];
  contacts: Contact[];
  onVenuesChange: (venues: Venue[]) => void;
  onVenueTypesChange: (venueTypes: VenueType[]) => void;
  onContactsChange: (contacts: Contact[]) => void;
}

const VenueManagement: React.FC<VenueManagementProps> = ({
  venues,
  venueTypes,
  contacts,
  onVenuesChange,
  onVenueTypesChange,
  onContactsChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(venues);

  useEffect(() => {
    setFilteredVenues(
      venues.filter(venue =>
        Object.values(venue).some(value =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (Array.isArray(value) && value.some(item => typeof item === 'string' && item.toLowerCase().includes(searchTerm.toLowerCase()))) ||
          venue.venueTypes.some(type => type.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          venue.contacts.some(contact =>
            `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
    );
  }, [venues, searchTerm]);

  const handleAddVenue = () => {
    setEditingVenue(null);
    setIsModalOpen(true);
  };

  const handleEditVenue = (venue: Venue) => {
    setEditingVenue(venue);
    setIsModalOpen(true);
  };

  const handleDeleteVenue = (id: number) => {
    onVenuesChange(venues.filter(venue => venue.id !== id));
  };

  const handleSaveVenue = (venue: Venue) => {
    if (editingVenue) {
      onVenuesChange(venues.map(v => (v.id === venue.id ? venue : v)));
    } else {
      onVenuesChange([...venues, { ...venue, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingVenue(null);
  };

  const handleAddContact = (venue: Venue) => {
    setEditingContact(null);
    setEditingVenue(venue);
    setIsContactModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsContactModalOpen(true);
  };

  const handleSaveContact = (contact: Contact) => {
    if (editingVenue) {
      const updatedVenue = {
        ...editingVenue,
        contacts: editingVenue.contacts ? [...editingVenue.contacts, contact] : [contact],
      };
      onVenuesChange(venues.map(v => (v.id === updatedVenue.id ? updatedVenue : v)));
    }
    setIsContactModalOpen(false);
    setEditingContact(null);
    setEditingVenue(null);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setEditingContact(null);
    setEditingVenue(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Venue Management</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Venues</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={handleAddVenue}
        >
          <Plus className="mr-2" size={16} /> Add Venue
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search venues..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="text-gray-400" size={16} />
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Address</th>
              <th className="text-left">Venue Types</th>
              <th className="text-left">Contacts</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVenues.map(venue => (
              <tr key={venue.id}>
                <td>{venue.name}</td>
                <td>{venue.address}</td>
                <td>
                  {venue.venueTypes.map(type => (
                    <span key={type.id} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
                      {type.name}
                    </span>
                  ))}
                </td>
                <td>
                  {venue.contacts && venue.contacts.length > 0 ? (
                    venue.contacts.map(contact => (
                      <div key={contact.id}>
                        {contact.firstName} {contact.lastName}
                      </div>
                    ))
                  ) : (
                    <span>No contacts</span>
                  )}
                  <button
                    className="text-blue-500 hover:text-blue-700 ml-2"
                    onClick={() => handleAddContact(venue)}
                  >
                    <Plus className="inline-block" size={16} />
                  </button>
                </td>
                <td>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditVenue(venue)}
                  >
                    <Pencil className="inline-block" size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteVenue(venue.id)}
                  >
                    <Trash className="inline-block" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VenueForm
          venue={editingVenue}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveVenue}
          venueTypes={venueTypes}
        />
      )}
      {isContactModalOpen && editingVenue && (
        <ContactForm
          contact={editingContact}
          onClose={handleCloseContactModal}
          onSave={handleSaveContact}
        />
      )}
    </div>
  );
};

export default VenueManagement;
