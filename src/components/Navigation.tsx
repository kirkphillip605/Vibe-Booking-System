import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { LayoutGrid, Users, Calendar, Store, Settings2, User2, Music2 } from 'lucide-react';

    const Navigation = () => {
      const location = useLocation();

      const isActive = (path: string) => {
        return location.pathname === path;
      };

      return (
        <aside className="bg-gray-100 w-64 p-4">
          <nav>
            <ul>
              <li className={`mb-2 ${isActive('/') ? 'font-bold' : ''}`}>
                <Link to="/" className="flex items-center py-2 px-2 rounded hover:bg-gray-200">
                  <LayoutGrid className="mr-2" size={20} />
                  Dashboard
                </Link>
              </li>
              <li className={`mb-2 ${isActive('/bookings') ? 'font-bold' : ''}`}>
                <Link to="/bookings" className="flex items-center py-2 px-2 rounded hover:bg-gray-200">
                  <Calendar className="mr-2" size={20} />
                  Bookings
                </Link>
              </li>
              <li className={`mb-2 ${isActive('/clients') ? 'font-bold' : ''}`}>
                <Link to="/clients" className="flex items-center py-2 px-2 rounded hover:bg-gray-200">
                  <Users className="mr-2" size={20} />
                  Clients
                </Link>
              </li>
              <li className={`mb-2 ${isActive('/djs') ? 'font-bold' : ''}`}>
                <Link to="/djs" className="flex items-center py-2 px-2 rounded hover:bg-gray-200">
                  <Music2 className="mr-2" size={20} />
                  DJs
                </Link>
              </li>
              <li className={`mb-2 ${isActive('/venues') ? 'font-bold' : ''}`}>
                <Link to="/venues" className="flex items-center py-2 px-2 rounded hover:bg-gray-200">
                  <Store className="mr-2" size={20} />
                  Venues
                </Link>
              </li>
              <li className={`mb-2 ${isActive('/scheduling') ? 'font-bold' : ''}`}>
                <Link to="/scheduling" className="flex items-center py-2 px-2 rounded hover:bg-gray-200">
                  <Calendar className="mr-2" size={20} />
                  Scheduling
                </Link>
              </li>
              <li className={`mb-2 ${isActive('/settings') ? 'font-bold' : ''}`}>
                <Link to="/settings" className="flex items-center py-2 px-2 rounded hover:bg-gray-200">
                  <Settings2 className="mr-2" size={20} />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      );
    };

    export default Navigation;
