import React, { useState } from 'react';
    import { useClientContext } from '../ClientContext';
    import { PhoneType } from '../../models';
    import { Plus, Pencil, Trash } from 'lucide-react';

    const PhoneTypeSettings: React.FC = () => {
      const { phoneTypes, onPhoneTypesChange } = useClientContext();
      const [newPhoneTypeName, setNewPhoneTypeName] = useState('');
      const [editingPhoneTypeId, setEditingPhoneTypeId] = useState<number | null>(null);
      const [editingPhoneTypeName, setEditingPhoneTypeName] = useState('');

      const handleAddPhoneType = () => {
        if (newPhoneTypeName.trim() !== '') {
          const newPhoneType: PhoneType = {
            id: Date.now(),
            name: newPhoneTypeName.trim(),
          };
          onPhoneTypesChange([...phoneTypes, newPhoneType]);
          setNewPhoneTypeName('');
        }
      };

      const handleEditPhoneType = (phoneType: PhoneType) => {
        setEditingPhoneTypeId(phoneType.id);
        setEditingPhoneTypeName(phoneType.name);
      };

      const handleUpdatePhoneType = () => {
        if (editingPhoneTypeId !== null && editingPhoneTypeName.trim() !== '') {
          const updatedPhoneTypes = phoneTypes.map(type =>
            type.id === editingPhoneTypeId ? { ...type, name: editingPhoneTypeName.trim() } : type
          );
          onPhoneTypesChange(updatedPhoneTypes);
          setEditingPhoneTypeId(null);
          setEditingPhoneTypeName('');
        }
      };

      const handleDeletePhoneType = (id: number) => {
        const updatedPhoneTypes = phoneTypes.filter(type => type.id !== id);
        onPhoneTypesChange(updatedPhoneTypes);
      };

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Phone Types</h2>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="New Phone Type"
              className="px-2 py-1 border rounded mr-2"
              value={newPhoneTypeName}
              onChange={e => setNewPhoneTypeName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleAddPhoneType}
            >
              <Plus size={16} className="inline-block mr-1" /> Add
            </button>
          </div>
          {editingPhoneTypeId !== null && (
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Edit Phone Type"
                className="px-2 py-1 border rounded mr-2"
                value={editingPhoneTypeName}
                onChange={e => setEditingPhoneTypeName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleUpdatePhoneType}
              >
                Update
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2"
                onClick={() => {
                  setEditingPhoneTypeId(null);
                  setEditingPhoneTypeName('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <ul>
            {phoneTypes?.map(type => (
              <li key={type.id} className="flex items-center justify-between py-1">
                <span>{type.name}</span>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditPhoneType(type)}
                  >
                    <Pencil size={16} className="inline-block" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeletePhoneType(type.id)}
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

    export default PhoneTypeSettings;
