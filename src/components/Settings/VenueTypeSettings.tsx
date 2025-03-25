import React, { useState, useEffect } from 'react';
    import { useClientContext } from '../ClientContext';
    import { VenueType } from '../../models';
    import { Plus, Pencil, Trash } from 'lucide-react';

    const VenueTypeSettings: React.FC = () => {
      const { venueTypes, onVenueTypesChange } = useClientContext();
      const [newVenueTypeName, setNewVenueTypeName] = useState('');
      const [editingVenueTypeId, setEditingVenueTypeId] = useState<number | null>(null);
      const [editingVenueTypeName, setEditingVenueTypeName] = useState('');

      const handleAddVenueType = () => {
        if (newVenueTypeName.trim() !== '') {
          const newVenueType: VenueType = {
            id: Date.now(), // In a real app, use a proper ID generation
            name: newVenueTypeName.trim(),
          };
          onVenueTypesChange([...venueTypes, newVenueType]);
          setNewVenueTypeName('');
        }
      };

      const handleEditVenueType = (venueType: VenueType) => {
        setEditingVenueTypeId(venueType.id);
        setEditingVenueTypeName(venueType.name);
      };

      const handleUpdateVenueType = () => {
        if (editingVenueTypeId !== null && editingVenueTypeName.trim() !== '') {
          const updatedVenueTypes = venueTypes.map(type =>
            type.id === editingVenueTypeId ? { ...type, name: editingVenueTypeName.trim() } : type
          );
          onVenueTypesChange(updatedVenueTypes);
          setEditingVenueTypeId(null);
          setEditingVenueTypeName('');
        }
      };

      const handleDeleteVenueType = (id: number) => {
        const updatedVenueTypes = venueTypes.filter(type => type.id !== id);
        onVenueTypesChange(updatedVenueTypes);
      };

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Venue Types</h2>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="New Venue Type"
              className="px-2 py-1 border rounded mr-2"
              value={newVenueTypeName}
              onChange={e => setNewVenueTypeName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleAddVenueType}
            >
              <Plus size={16} className="inline-block mr-1" /> Add
            </button>
          </div>
          {editingVenueTypeId !== null && (
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Edit Venue Type"
                className="px-2 py-1 border rounded mr-2"
                value={editingVenueTypeName}
                onChange={e => setEditingVenueTypeName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleUpdateVenueType}
              >
                Update
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2"
                onClick={() => {
                  setEditingVenueTypeId(null);
                  setEditingVenueTypeName('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <ul>
            {venueTypes?.map(type => (
              <li key={type.id} className="flex items-center justify-between py-1">
                <span>{type.name}</span>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditVenueType(type)}
                  >
                    <Pencil size={16} className="inline-block" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteVenueType(type.id)}
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

    export default VenueTypeSettings;
