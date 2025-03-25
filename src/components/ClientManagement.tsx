import React, { useState, useEffect } from 'react';
    import { Plus, Pencil, Trash, Search } from 'lucide-react';
    import ClientForm from './ClientForm';
    import { Client, ClientType, Contact, Booking, Person, ClientSegmentation } from '../models';
    import { useClientContext } from './ClientContext';
    import ContactForm from './ContactForm';

    interface ClientRowProps {
      client: Client;
      clientTypes: ClientType[];
      onEdit: (client: Client) => void;
      onDelete: (id: number) => void;
      onAddContact: (client: Client) => void;
    }

    const ClientRow: React.FC<ClientRowProps> = ({ client, clientTypes, onEdit, onDelete, onAddContact }) => {
      const clientTypeName = clientTypes?.find(type => type.id === client?.clientTypeId)?.name || 'Unknown';

      return (
        <tr key={client.id}>
          <td>{client?.businessName || `${client?.primaryContact?.firstName} ${client?.primaryContact?.lastName}`}</td>
          <td>
            {client?.primaryContact && `${client.primaryContact.firstName} ${client.primaryContact.lastName}`}
            <button
              className="text-blue-500 hover:text-blue-700 ml-2"
              onClick={() => onAddContact(client)}
            >
              <Plus className="inline-block" size={16} />
            </button>
          </td>
          <td>{clientTypeName}</td>
          <td>
            <button
              className="text-blue-500 hover:text-blue-700 mr-2"
              onClick={() => onEdit(client)}
            >
              <Pencil className="inline-block" size={16} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => onDelete(client.id)}
            >
              <Trash className="inline-block" size={16} />
            </button>
          </td>
        </tr>
      );
    };

    const ClientManagement: React.FC = () => {
      const {
        clients,
        clientTypes,
        contacts,
        bookings,
        people,
        clientSegmentations,
        onClientsChange,
        onAddClient,
        onEditClient,
        onDeleteClient,
      } = useClientContext();
      const [searchTerm, setSearchTerm] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isContactModalOpen, setIsContactModalOpen] = useState(false);
      const [editingClient, setEditingClient] = useState<Client | null>(null);
      const [editingContact, setEditingContact] = useState<Contact | null>(null);
      const [filteredClients, setFilteredClients] = useState<Client[]>(clients);

      useEffect(() => {
        setFilteredClients(
          clients.filter(client =>
            Object.values(client).some(value =>
              typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (client.businessName && client.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (client.primaryContact && `${client.primaryContact.firstName} ${client.primaryContact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
            )
          )
        );
      }, [clients, searchTerm]);

      const handleAddClientClick = () => {
        setEditingClient(null);
        setIsModalOpen(true);
      };

      const handleEditClient = (client: Client) => {
        setEditingClient(client);
        setIsModalOpen(true);
      };

      const handleDeleteClient = (clientId: number) => {
        onDeleteClient(clientId);
      };

      const handleSaveClient = (client: Client) => {
        if (editingClient) {
          onEditClient(client);
        } else {
          onAddClient(client);
        }
        setIsModalOpen(false);
        setEditingClient(null);
      };

      const handleAddContact = (client: Client) => {
        setEditingContact(null);
        setEditingClient(client);
        setIsContactModalOpen(true);
      };

      const handleEditContact = (contact: Contact) => {
        setEditingContact(contact);
        setIsContactModalOpen(true);
      };

      const handleSaveContact = (contact: Contact) => {
        if (editingClient) {
          const updatedClient = {
            ...editingClient,
            primaryContact: contact,
          };
          onClientsChange(clients.map(c => (c.id === updatedClient.id ? updatedClient : c)));
        }
        setIsContactModalOpen(false);
        setEditingContact(null);
        setEditingClient(null);
      };

      const handleCloseContactModal = () => {
        setIsContactModalOpen(false);
        setEditingContact(null);
        setEditingClient(null);
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Client Management</h1>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Clients</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleAddClientClick}
            >
              <Plus className="mr-2" size={16} /> Add Client
            </button>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
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
                  <th className="text-left">Contact</th>
                  <th className="text-left">Client Type</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <ClientRow
                    key={client.id}
                    client={client}
                    clientTypes={clientTypes}
                    onEdit={handleEditClient}
                    onDelete={handleDeleteClient}
                    onAddContact={handleAddContact}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <ClientForm
              client={editingClient}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveClient}
              clientTypes={clientTypes}
              contacts={contacts}
              bookings={bookings}
              people={people}
              clientSegmentations={clientSegmentations}
            />
          )}
          {isContactModalOpen && editingClient && (
            <ContactForm
              contact={editingContact}
              onClose={handleCloseContactModal}
              onSave={handleSaveContact}
            />
          )}
        </div>
      );
    };

    export default ClientManagement;
