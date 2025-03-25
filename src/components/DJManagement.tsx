import React, { useState, useEffect } from 'react';
    import { Plus, Pencil, Trash, Search } from 'lucide-react';
    import DJForm from './DJForm';
    import { Person } from '../models';
    import { useClientContext } from './ClientContext';

    interface DJRowProps {
      dj: Person;
      onEdit: (dj: Person) => void;
      onDelete: (id: number) => void;
    }

    const DJRow: React.FC<DJRowProps> = ({ dj, onEdit, onDelete }) => {
      return (
        <tr key={dj.id}>
          <td>{dj.fullName}</td>
          <td>{dj.contact}</td>
          <td>
            <button
              className="text-blue-500 hover:text-blue-700 mr-2"
              onClick={() => onEdit(dj)}
            >
              <Pencil className="inline-block" size={16} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => onDelete(dj.id)}
            >
              <Trash className="inline-block" size={16} />
            </button>
          </td>
        </tr>
      );
    };

    const DJManagement: React.FC = () => {
      const { people, onAddDJ, onEditDJ, onDeleteDJ } = useClientContext();
      const [searchTerm, setSearchTerm] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingDJ, setEditingDJ] = useState<Person | null>(null);
      const [filteredDJs, setFilteredDJs] = useState<Person[]>([]);

      useEffect(() => {
        if (people) {
          setFilteredDJs(
            people.filter(dj =>
              Object.values(dj).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
          );
        }
      }, [people, searchTerm]);

      const handleAddDJClick = () => {
        setEditingDJ(null);
        setIsModalOpen(true);
      };

      const handleEditDJ = (dj: Person) => {
        setEditingDJ(dj);
        setIsModalOpen(true);
      };

      const handleDeleteDJ = (djId: number) => {
        onDeleteDJ(djId);
      };

      const handleSaveDJ = (dj: Person) => {
        if (editingDJ) {
          onEditDJ(dj);
        } else {
          onAddDJ(dj);
        }
        setIsModalOpen(false);
        setEditingDJ(null);
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">DJ Management</h1>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">DJs</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleAddDJClick}
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
                  <DJRow
                    key={dj.id}
                    dj={dj}
                    onEdit={handleEditDJ}
                    onDelete={handleDeleteDJ}
                  />
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
