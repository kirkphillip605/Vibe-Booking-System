import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Store, Mic2, List, Settings2 } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: List },
  { to: '/bookings', label: 'Bookings', icon: Calendar },
  { to: '/venues', label: 'Venues', icon: Store },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/djs', label: 'DJs', icon: Mic2 },
  { to: '/scheduling', label: 'Scheduling', icon: Calendar },
  { to: '/settings', label: 'Settings', icon: Settings2 },
];

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        {navItems.map(item => (
          <li key={item.to}>
            <Link to={item.to} className="flex items-center hover:text-gray-300">
              <item.icon className="mr-2" size={20} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
