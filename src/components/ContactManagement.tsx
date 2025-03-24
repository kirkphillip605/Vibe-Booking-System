import React, { useState, useEffect } from 'react';
    import { Plus, Pencil, Trash, Search } from 'lucide-react';
    import { Contact } from '../models';
    import ContactForm from './ContactForm';
    import { useClientContext } from './ClientContext';
    import { useDebounce } from '../utils/hooks';

    interface ContactManagementProps {
      // No props needed, as the component manages its own state for now.
    }

    interface ContactRowProps {
      contact: Contact;
      onEdit: (contact: Contact) => void;
      onDelete: (id: number) => void;
    }

    const ContactRow: React.FC<ContactRowProps> = ({ contact, onEdit, onDelete }) => {
      return (
        <tr key={contact.id}>
          <td>{contact?.firstName} {contact?.lastName}</td>
          <td>{contact?.contactType}</td>
          <td>{contact?.contactRole}</td>
          <td>
            <button
              className="text-blue-500 hover:text-blue-700 mr-2"
              onClick={() => onEdit(contact)}
            >
              <Pencil className="inline-block" size={16} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => onDelete(contact.id)}
            >
              <Trash className="inline-block" size={16} />
            </button>
          </td>
        </tr>
      );
    };

    const ContactManagement: React.FC<ContactManagementProps> = () => {
      const { contacts, onContactsChange, onAddContact, onEditContact, onDeleteContact } = useClientContext();
      const [searchTerm, setSearchTerm] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingContact, setEditingContact] = useState<Contact | null>(null);
      const debouncedSearchTerm = useDebounce(searchTerm, 300);
      const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

      useEffect(() => {
        if (contacts) {
          setFilteredContacts(contacts);
        }
      }, [contacts]);

      useEffect(() => {
        if (contacts) {
          setFilteredContacts(contacts.filter(contact =>
            Object.values(contact).some(value =>
              String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            )
          ));
        }
      }, [contacts, debouncedSearchTerm]);

      const handleAddContactClick = () => {
        setEditingContact(null);
        setIsModalOpen(true);
      };

      const handleEditContact = (contact: Contact) => {
        setEditingContact(contact);
        setIsModalOpen(true);
      };

      const handleDeleteContact = (contactId: number) => {
        onDeleteContact(contactId);
      };

      const handleSaveContact = (contact: Contact) => {
        if (editingContact) {
          onEditContact(contact);
        } else {
          onAddContact(contact);
        }
        setIsModalOpen(false);
        setEditingContact(null);
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Contact Management</h1>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Contacts</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleAddContactClick}
            >
              <Plus className="mr-2" size={16} /> Add Contact
            </button>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts..."
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
                  <th className="text-left">Contact Type</th>
                  <th className="text-left">Contact Role</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map(contact => (
                  <ContactRow
                    key={contact.id}
                    contact={contact}
                    onEdit={handleEditContact}
                    onDelete={handleDeleteContact}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <ContactForm
              contact={editingContact}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveContact}
            />
          )}
        </div>
      );
    };

    export default ContactManagement;
