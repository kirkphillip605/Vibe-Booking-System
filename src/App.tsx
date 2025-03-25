import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Dashboard from './components/Dashboard';
    import BookingManagement from './components/BookingManagement';
    import VenueManagement from './components/VenueManagement';
    import ClientManagement from './components/ClientManagement';
    import DJManagement from './components/DJManagement';
    import Scheduling from './components/Scheduling';
    import Settings from './components/Settings';
    import Navigation from './components/Navigation';
    import { ClientProvider } from './components/ClientContext';
    import ContactManagement from './components/ContactManagement';

    function App() {
      return (
        <ClientProvider>
          <Router>
            <div className="flex h-screen">
              {/* Sidebar - Navigation */}
              <div className="w-64 bg-gray-100 hidden md:block"> {/* Hide on smaller screens */}
                <Navigation />
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bookings" element={<BookingManagement />} />
                  <Route path="/venues" element={<VenueManagement />} />
                  <Route path="/clients" element={<ClientManagement />} />
                  <Route path="/djs" element={<DJManagement />} />
                  <Route path="/scheduling" element={<Scheduling />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/contacts" element={<ContactManagement />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ClientProvider>
      );
    }

    export default App;
