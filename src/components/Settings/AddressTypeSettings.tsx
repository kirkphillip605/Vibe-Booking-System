import React, { useState } from 'react';
    import { useClientContext } from '../ClientContext';
    import { AddressType } from '../../models';
    import { Plus, Pencil, Trash } from 'lucide-react';

    const AddressTypeSettings: React.FC = () => {
      const { addressTypes, onAddressTypesChange } = useClientContext();
      const [newAddressTypeName, setNewAddressTypeName] = useState('');
      const [editingAddressTypeId, setEditingAddressTypeId] = useState<number | null>(null);
      const [editingAddressTypeName, setEditingAddressTypeName] = useState('');

      const handleAddAddressType = () => {
        if (newAddressTypeName.trim() !== '') {
          const newAddressType: AddressType = {
            id: Date.now(),
            name: newAddressTypeName.trim(),
          };
          onAddressTypesChange([...addressTypes, newAddressType]);
          setNewAddressTypeName('');
        }
      };

      const handleEditAddressType = (addressType: AddressType) => {
        setEditingAddressTypeId(addressType.id);
        setEditingAddressTypeName(addressType.name);
      };

      const handleUpdateAddressType = () => {
        if (editingAddressTypeId !== null && editingAddressTypeName.trim() !== '') {
          const updatedAddressTypes = addressTypes.map(type =>
            type.id === editingAddressTypeId ? { ...type, name: editingAddressTypeName.trim() } : type
          );
          onAddressTypesChange(updatedAddressTypes);
          setEditingAddressTypeId(null);
          setEditingAddressTypeName('');
        }
      };

      const handleDeleteAddressType = (id: number) => {
        const updatedAddressTypes = addressTypes.filter(type => type.id !== id);
        onAddressTypesChange(updatedAddressTypes);
      };

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Address Types</h2>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="New Address Type"
              className="px-2 py-1 border rounded mr-2"
              value={newAddressTypeName}
              onChange={e => setNewAddressTypeName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleAddAddressType}
            >
              <Plus size={16} className="inline-block mr-1" /> Add
            </button>
          </div>
          {editingAddressTypeId !== null && (
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Edit Address Type"
                className="px-2 py-1 border rounded mr-2"
                value={editingAddressTypeName}
                onChange={e => setEditingAddressTypeName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleUpdateAddressType}
              >
                Update
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2"
                onClick={() => {
                  setEditingAddressTypeId(null);
                  setEditingAddressTypeName('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <ul>
            {addressTypes?.map(type => (
              <li key={type.id} className="flex items-center justify-between py-1">
                <span>{type.name}</span>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditAddressType(type)}
                  >
                    <Pencil size={16} className="inline-block" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteAddressType(type.id)}
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

    export default AddressTypeSettings;
