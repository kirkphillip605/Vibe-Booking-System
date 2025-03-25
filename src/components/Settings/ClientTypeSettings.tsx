import React, { useState } from 'react';
    import { useClientContext } from '../ClientContext';
    import { ClientType } from '../../models';
    import { Plus, Pencil, Trash } from 'lucide-react';

    const ClientTypeSettings: React.FC = () => {
      const { clientTypes, onClientTypesChange } = useClientContext();
      const [newClientTypeName, setNewClientTypeName] = useState('');
      const [editingClientTypeId, setEditingClientTypeId] = useState<number | null>(null);
      const [editingClientTypeName, setEditingClientTypeName] = useState('');

      const handleAddClientType = () => {
        if (newClientTypeName.trim() !== '') {
          const newClientType: ClientType = {
            id: Date.now(),
            name: newClientTypeName.trim(),
          };
          onClientTypesChange([...clientTypes, newClientType]);
          setNewClientTypeName('');
        }
      };

      const handleEditClientType = (clientType: ClientType) => {
        setEditingClientTypeId(clientType.id);
        setEditingClientTypeName(clientType.name);
      };

      const handleUpdateClientType = () => {
        if (editingClientTypeId !== null && editingClientTypeName.trim() !== '') {
          const updatedClientTypes = clientTypes.map(type =>
            type.id === editingClientTypeId ? { ...type, name: editingClientTypeName.trim() } : type
          );
          onClientTypesChange(updatedClientTypes);
          setEditingClientTypeId(null);
          setEditingClientTypeName('');
        }
      };

      const handleDeleteClientType = (id: number) => {
        const updatedClientTypes = clientTypes.filter(type => type.id !== id);
        onClientTypesChange(updatedClientTypes);
      };

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Client Types</h2>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="New Client Type"
              className="px-2 py-1 border rounded mr-2"
              value={newClientTypeName}
              onChange={e => setNewClientTypeName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleAddClientType}
            >
              <Plus size={16} className="inline-block mr-1" /> Add
            </button>
          </div>
          {editingClientTypeId !== null && (
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Edit Client Type"
                className="px-2 py-1 border rounded mr-2"
                value={editingClientTypeName}
                onChange={e => setEditingClientTypeName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleUpdateClientType}
              >
                Update
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2"
                onClick={() => {
                  setEditingClientTypeId(null);
                  setEditingClientTypeName('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <ul>
            {clientTypes?.map(type => (
              <li key={type.id} className="flex items-center justify-between py-1">
                <span>{type.name}</span>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditClientType(type)}
                  >
                    <Pencil size={16} className="inline-block" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClientType(type.id)}
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

    export default ClientTypeSettings;
