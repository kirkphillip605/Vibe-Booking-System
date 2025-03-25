import React, { useState } from 'react';
    import { useClientContext } from '../ClientContext';
    import { EmailType } from '../../models';
    import { Plus, Pencil, Trash } from 'lucide-react';

    const EmailTypeSettings: React.FC = () => {
      const { emailTypes, onEmailTypesChange } = useClientContext();
      const [newEmailTypeName, setNewEmailTypeName] = useState('');
      const [editingEmailTypeId, setEditingEmailTypeId] = useState<number | null>(null);
      const [editingEmailTypeName, setEditingEmailTypeName] = useState('');

      const handleAddEmailType = () => {
        if (newEmailTypeName.trim() !== '') {
          const newEmailType: EmailType = {
            id: Date.now(),
            name: newEmailTypeName.trim(),
          };
          onEmailTypesChange([...emailTypes, newEmailType]);
          setNewEmailTypeName('');
        }
      };

      const handleEditEmailType = (emailType: EmailType) => {
        setEditingEmailTypeId(emailType.id);
        setEditingEmailTypeName(emailType.name);
      };

      const handleUpdateEmailType = () => {
        if (editingEmailTypeId !== null && editingEmailTypeName.trim() !== '') {
          const updatedEmailTypes = emailTypes.map(type =>
            type.id === editingEmailTypeId ? { ...type, name: editingEmailTypeName.trim() } : type
          );
          onEmailTypesChange(updatedEmailTypes);
          setEditingEmailTypeId(null);
          setEditingEmailTypeName('');
        }
      };

      const handleDeleteEmailType = (id: number) => {
        const updatedEmailTypes = emailTypes.filter(type => type.id !== id);
        onEmailTypesChange(updatedEmailTypes);
      };

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Email Types</h2>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="New Email Type"
              className="px-2 py-1 border```
rounded mr-2"
              value={newEmailTypeName}
              onChange={e => setNewEmailTypeName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleAddEmailType}
            >
              <Plus size={16} className="inline-block mr-1" /> Add
            </button>
          </div>
          {editingEmailTypeId !== null && (
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Edit Email Type"
                className="px-2 py-1 border rounded mr-2"
                value={editingEmailTypeName}
                onChange={e => setEditingEmailTypeName(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleUpdateEmailType}
              >
                Update
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded ml-2"
                onClick={() => {
                  setEditingEmailTypeId(null);
                  setEditingEmailTypeName('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <ul>
            {emailTypes?.map(type => (
              <li key={type.id} className="flex items-center justify-between py-1">
                <span>{type.name}</span>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditEmailType(type)}
                  >
                    <Pencil size={16} className="inline-block" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteEmailType(type.id)}
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

    export default EmailTypeSettings;
