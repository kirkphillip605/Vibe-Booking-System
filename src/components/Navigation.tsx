import React from 'react';
    import { Link } from 'react-router-dom';
    import { Home, Calendar, Users, Mic2, MapPin, Settings2, PhoneCall } from 'lucide-react';

    const Navigation: React.FC = () => {
      return (
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <Link to="/" className="flex items-center p-2 rounded hover:bg-gray-200">
                  <Home className="mr-2" size={20} />
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/bookings" className="flex items-center p-2 rounded hover:bg-gray-200">
                  <Calendar className="mr-2" size={20} />
                  Bookings
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/venues" className="flex items-center p-2 rounded hover:bg-gray-200">
                  <MapPin className="mr-2" size={20} />
                  Venues
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/clients" className="flex items-center p-2 rounded hover:bg-gray-200">
                  <Users className="mr-2" size={20} />
                  Clients
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/djs" className="flex items-center p-2 rounded hover:bg-gray-200">
                  <Mic2 className="mr-2" size={20} />
                  DJs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/scheduling" className="flex items-center p-2 rounded hover:bg-gray-200">
                  <Calendar className="mr-2" size={20} />
                  Scheduling
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacts" className="flex items-center p-2 rounded hover:bg-gray-200">
                  <PhoneCall className="mr-2" size={20} />
                  Contacts
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/settings" className="flex items-center p-2 rounded hover:bg-gray-200">
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
