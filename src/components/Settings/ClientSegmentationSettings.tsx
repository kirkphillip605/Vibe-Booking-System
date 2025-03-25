import React, { useState } from 'react';
    import { useClientContext } from '../ClientContext';
    import { ClientSegmentation } from '../../models';
    import { Plus, Pencil, Trash } from 'lucide-react';

    const ClientSegmentationSettings: React.FC = () => {
      const { clientSegmentations, onClientSegmentationsChange } = useClientContext();
      const [newClientSegmentationName, setNewClientSegmentationName] = useState('');
      const [editingClientSegmentationId, setEditingClientSegmentationId] = useState<number | null>(null);
      const [editingClientSegmentationName, setEditingClientSegmentationName] = useState('');

      const handleAddClientSegmentation = () => {
        if (newClientSegmentationName.trim() !== '') {
          const newClientSegmentation: ClientSegmentation = {
            id: Date.now(),
            name: newClientSegmentationName.trim(),
          };
          onClientSegmentationsChange([...clientSegmentations, newClientSegmentation]);
          setNewClientSegmentationName('');
        }
      };

      const handleEditClientSegmentation = (clientSegmentation: ClientSegmentation) => {
        setEditingClientSegmentationId(clientSegmentation.id);
        setEditingClientSegmentationName(clientSegmentation.name);
      };

      const handleUpdateClientSegmentation = () => {
        if (editingClientSegmentationId !== null && editingClientSegmentationName.trim() !== '') {
          const updatedClientSegmentations = clientSegmentations.map(segmentation =>
            segmentation.id === editingClientSegmentationId ? { ...segmentation, name: editingClientSegmentationName.trim() } : segmentation
          );
          onClientSegmentationsChange(updatedClientSegmentations);
          setEditingClientSegmentationId(null);
          setEditingClientSegmentationName('');
        }
      };

      const handleDeleteClientSegmentation = (id: number) => {
        const updatedClientSegmentations = clientSegmentations.filter(segmentation => segmentation.id !== id);
        onClientSegmentationsChange(updatedClientSegmentations);
      };

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Client Segmentations</h2>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="New Client Segmentation"
              className="px-2 py-1 border rounded mr-2"
              value={newClientSegmentationName}
              onChange={e => setNewClientSegmentationName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleAddClientSegmentation}
            >
              <Plus size={16} className="inline-block mr-1" /> Add
            </button>
          </div>
          {editingClientSegmentationId !== null && (
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Edit Client Segmentation"
                className="px-2 py-1 border rounded mr-2"
                value={editingClientSegmentationName}
                onChange={e => setEditingClientSegmentationName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleUpdateClientSegmentation}
              >
                Update
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2"
                onClick={() => {
                  setEditingClientSegmentationId(null);
                  setEditingClientSegmentationName('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <ul>
            {clientSegmentations?.map(segmentation => (
              <li key={segmentation.id} className="flex items-center justify-between py-1">
                <span>{segmentation.name}</span>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditClientSegmentation(segmentation)}
                  >
                    <Pencil size={16} className="inline-block" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClientSegmentation(segmentation.id)}
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

    export default ClientSegmentationSettings;
