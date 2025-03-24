import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { LayoutGrid, Users, Calendar, Store, Settings2, Mic2 } from 'lucide-react';

    const Navigation = () => {
      const location = useLocation();

      return (
        <aside className="w-64 bg-gray-100 shadow-md h-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Eventify</h1>
          </div>
          <nav>
            <ul>
              <li className={`py-2 px-4 hover:bg-gray-200 ${location.pathname === '/' ? 'bg-gray-200' : ''}`}>
                <Link to="/" className="flex items-center">
                  <LayoutGrid className="mr-2" size={20} /> Dashboard
                </Link>
              </li>
              <li className={`py-2 px-4 hover:bg-gray-200 ${location.pathname === '/bookings' ? 'bg-gray-200' : ''}`}>
                <Link to="/bookings" className="flex items-center">
                  <Calendar className="mr-2" size={20} /> Bookings
                </Link>
              </li>
              <li className={`py-2 px-4 hover:bg-gray-200 ${location.pathname === '/clients' ? 'bg-gray-200' : ''}`}>
                <Link to="/clients" className="flex items-center">
                  <Users className="mr-2" size={20} /> Clients
                </Link>
              </li>
              <li className={`py-2 px-4 hover:bg-gray-200 ${location.pathname === '/djs' ? 'bg-gray-200' : ''}`}>
                <Link to="/djs" className="flex items-center">
                  <Mic2 className="mr-2" size={20} /> DJs
                </Link>
              </li>
              <li className={`py-2 px-4 hover:bg-gray-200 ${location.pathname === '/venues' ? 'bg-gray-200' : ''}`}>
                <Link to="/venues" className="flex items-center">
                  <Store className="mr-2" size={20} /> Venues
                </Link>
              </li>
              <li className={`py-2 px-4 hover:bg-gray-200 ${location.pathname === '/scheduling' ? 'bg-gray-200' : ''}`}>
                <Link to="/scheduling" className="flex items-center">
                  <Calendar className="mr-2" size={20} /> Scheduling
                </Link>
              </li>
              <li className={`py-2 px-4 hover:bg-gray-200 ${location.pathname === '/settings' ? 'bg-gray-200' : ''}`}>
                <Link to="/settings" className="flex items-center">
                  <Settings2 className="mr-2" size={20} /> Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      );
    };

    export default Navigation;
