import React, { useState } from 'react';
    import { useClientContext } from '../ClientContext';
    import { ContactType } from '../../models';
    import { Plus, Pencil, Trash } from 'lucide-react';

    const ContactTypeSettings: React.FC = () => {
      const { contactTypes, onContactTypesChange } = useClientContext();
      const [newContactTypeName, setNewContactTypeName] = useState('');
      const [editingContactTypeId, setEditingContactTypeId] = useState<number | null>(null);
      const [editingContactTypeName, setEditingContactTypeName] = useState('');

      const handleAddContactType = () => {
        if (newContactTypeName.trim() !== '') {
          const newContactType: ContactType = {
            id: Date.now(),
            name: newContactTypeName.trim(),
          };
          onContactTypesChange([...contactTypes, newContactType]);
          setNewContactTypeName('');
        }
      };

      const handleEditContactType = (contactType: ContactType) => {
        setEditingContactTypeId(contactType.id);
        setEditingContactTypeName(contactType.name);
      };

      const handleUpdateContactType = () => {
        if (editingContactTypeId !== null && editingContactTypeName.trim() !== '') {
          const updatedContactTypes = contactTypes.map(type =>
            type.id === editingContactTypeId ? { ...type, name: editingContactTypeName.trim() } : type
          );
          onContactTypesChange(updatedContactTypes);
          setEditingContactTypeId(null);
          setEditingContactTypeName('');
        }
      };

      const handleDeleteContactType = (id: number) => {
        const updatedContactTypes = contactTypes.filter(type => type.id !== id);
        onContactTypesChange(updatedContactTypes);
      };

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Contact Types</h2>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="New Contact Type"
              className="px-2 py-1 border rounded mr-2"
              value={newContactTypeName}
              onChange={e => setNewContactTypeName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleAddContactType}
            >
              <Plus size={16} className="inline-block mr-1" /> Add
            </button>
          </div>
          {editingContactTypeId !== null && (
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Edit Contact Type"
                className="px-2 py-1 border rounded mr-2"
                value={editingContactTypeName}
                onChange={e => setEditingContactTypeName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleUpdateContactType}
              >
                Update
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2"
                onClick={() => {
                  setEditingContactTypeId(null);
                  setEditingContactTypeName('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <ul>
            {contactTypes?.map(type => (
              <li key={type.id} className="flex items-center justify-between py-1">
                <span>{type.name}</span>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditContactType(type)}
                  >
                    <Pencil size={16} className="inline-block" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteContactType(type.id)}
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

    export default ContactTypeSettings;
