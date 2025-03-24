import React, { useState, useEffect } from 'react';
    import { Booking } from '../models/Booking';
    import { Person } from '../models/Person';
    import { Venue } from '../models/Venue';

    interface Props {
      bookings: Booking[];
      venues: Venue[];
      people: Person[];
    }

    const Scheduling: React.FC<Props> = ({
      bookings = [],
      venues = [],
      people = [],
    }) => {
      const [events, setEvents] = useState<any[]>([]);

      useEffect(() => {
        if (bookings && venues && people) {
          const formattedEvents = bookings.map(booking => {
            const venue = venues.find(v => v.id === booking.venueId);
            const djNames = people.filter(p => booking.djIds.includes(p.id)).map(dj => dj.fullName).join(', ');
            return {
              id: booking.id,
              date: booking.startDate,
              time: booking.startTime,
              venue: venue?.name || 'Unknown Venue',
              dj: djNames,
              description: booking.description,
            };
          });
          setEvents(formattedEvents);
        } else {
          setEvents([]); // Ensure events is an empty array if data is not available
        }
      }, [bookings, venues, people]);

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Scheduling</h1>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Scheduled Events</h2>
            <ul>
              {events.map(event => (
                <li key={event.id} className="py-2 border-b">
                  <strong>{event.date} {event.time}</strong> - {event.venue} - {event.dj} - {event.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

    export default Scheduling;
