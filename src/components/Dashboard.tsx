import React from 'react';
import { Calendar, List, Plus, Users, Store } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Upcoming Bookings */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center"><Calendar className="mr-2" size={20} /> Upcoming Bookings</h2>
          <ul>
            <li>Booking 1 - Venue A - Client X</li>
            <li>Booking 2 - Venue B - Client Y</li>
            <li>Booking 3 - Venue C - Client Z</li>
          </ul>
        </div>

        {/* Pending Requests */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center"><List className="mr-2" size={20} /> Pending Requests</h2>
          <ul>
            <li>Booking Request 1 - Client A</li>
            <li>Availability Request - DJ 1</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center"><Plus className="mr-2" size={20} /> Quick Actions</h2>
          <ul className="flex flex-col space-y-2">
            <li>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <Plus className="mr-2" size={16} /> Create Booking
              </button>
            </li>
            <li>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <Users className="mr-2" size={16} /> Add Client
              </button>
            </li>
            <li>
              <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <Store className="mr-2" size={16} /> Add Venue
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
