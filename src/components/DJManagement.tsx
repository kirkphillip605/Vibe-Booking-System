import React, { useState } from 'react';
import { Plus, Pencil, Trash, Search } from 'lucide-react';
import { Person } from '../models/Person'; // Import the Person interface
import DJForm from './DJForm'; // Import the DJForm component

const DJManagement = () => {
  const [djs, setDJs] = useState<Person[]>([
    { id: 1, fullName: 'DJ John Doe', contact: 'john.doe@example.com', roleIds: [1] },
    { id: 2, fullName: 'DJ Jane Smith', contact: 'jane.smith@example.com', roleIds: [1] },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDJ, setEditingDJ] = useState<Person | null>(null);

  const handleAddDJ = () => {
    setEditingDJ(null);
    setIsModalOpen(true);
  };

  const handleEditDJ = (dj: Person) => {
    setEditingDJ(dj);
    setIsModalOpen(true);
  };

  const handleDeleteDJ = (id: number) => {
    setDJs(djs.filter(dj => dj.id !== id));
  };

  const handleSaveDJ = (dj: Person) => {
    if (editingDJ) {
      setDJs(djs.map(d => (d.id === dj.id ? dj : d)));
    } else {
      setDJs([...djs, { ...dj, id: Date.now(), roleIds: [1] }]); // Assuming roleId 1 is DJ
    }
    setIsModalOpen(false);
    setEditingDJ(null);
  };

  const filteredDJs = djs.filter(dj =>
    Object.values(dj).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DJ Management</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">DJs</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={handleAddDJ}
        >
          <Plus className="mr-2" size={16} /> Add DJ
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search DJs..."
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
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDJs.map(dj => (
              <tr key={dj.id}>
                <td>{dj.fullName}</td>
                <td>{dj.contact}</td>
                <td>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditDJ(dj)}
                  >
                    <Pencil className="inline-block" size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteDJ(dj.id)}
                  >
                    <Trash className="inline-block" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <DJForm
          dj={editingDJ}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveDJ}
        />
      )}
    </div>
  );
};

export default DJManagement;
