import React, { useState } from 'react';
    import { useClientContext } from '../ClientContext';
    import { ContactRole } from '../../models';
    import { Plus, Pencil, Trash } from 'lucide-react';

    const ContactRoleSettings: React.FC = () => {
      const { contactRoles, onContactRolesChange } = useClientContext();
      const [newContactRoleName, setNewContactRoleName] = useState('');
      const [editingContactRoleId, setEditingContactRoleId] = useState<number | null>(null);
      const [editingContactRoleName, setEditingContactRoleName] = useState('');

      const handleAddContactRole = () => {
        if (newContactRoleName.trim() !== '') {
          const newContactRole: ContactRole = {
            id: Date.now(),
            name: newContactRoleName.trim(),
          };
          onContactRolesChange([...contactRoles, newContactRole]);
          setNewContactRoleName('');
        }
      };

      const handleEditContactRole = (contactRole: ContactRole) => {
        setEditingContactRoleId(contactRole.id);
        setEditingContactRoleName(contactRole.name);
      };

      const handleUpdateContactRole = () => {
        if (editingContactRoleId !== null && editingContactRoleName.trim() !== '') {
          const updatedContactRoles = contactRoles.map(role =>
            role.id === editingContactRoleId ? { ...role, name: editingContactRoleName.trim() } : role
          );
          onContactRolesChange(updatedContactRoles);
          setEditingContactRoleId(null);
          setEditingContactRoleName('');
        }
      };

      const handleDeleteContactRole = (id: number) => {
        const updatedContactRoles = contactRoles.filter(role => role.id !== id);
        onContactRolesChange(updatedContactRoles);
      };

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Contact Roles</h2>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="New Contact Role"
              className="px-2 py-1 border rounded mr-2"
              value={newContactRoleName}
              onChange={e => setNewContactRoleName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleAddContactRole}
            >
              <Plus size={16} className="inline-block mr-1" /> Add
            </button>
          </div>
          {editingContactRoleId !== null && (
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Edit Contact Role"
                className="px-2 py-1 border rounded mr-2"
                value={editingContactRoleName}
                onChange={e => setEditingContactRoleName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleUpdateContactRole}
              >
                Update
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2"
                onClick={() => {
                  setEditingContactRoleId(null);
                  setEditingContactRoleName('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <ul>
            {contactRoles?.map(role => (
              <li key={role.id} className="flex items-center justify-between py-1">
                <span>{role.name}</span>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditContactRole(role)}
                  >
                    <Pencil size={16} className="inline-block" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteContactRole(role.id)}
                  >
                    <Trash size={16} className="inline-block" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default ContactRoleSettings;
