import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BookingManagement from './components/BookingManagement';
import VenueManagement from './components/VenueManagement';
import ClientManagement from './components/ClientManagement';
import DJManagement from './components/DJManagement';
import Scheduling from './components/Scheduling';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<BookingManagement />} />
            <Route path="/venues" element={<VenueManagement />} />
            <Route path="/clients" element={<ClientManagement />} />
            <Route path="/djs" element={<DJManagement />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home if path not found */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
