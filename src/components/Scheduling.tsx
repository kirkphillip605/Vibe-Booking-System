import React, { useState, useEffect } from 'react';
    import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
    import moment from 'moment';
    import 'react-big-calendar/lib/css/react-big-calendar.css';
    import { useClientContext } from './ClientContext';
    import { Booking } from '../models';

    const localizer = momentLocalizer(moment);

    interface Event extends Booking {
      title: string;
      start: Date;
      end: Date;
    }

    const Scheduling: React.FC = () => {
      const { bookings, venues, people } = useClientContext();
      const [events, setEvents] = useState<Event[]>([]);

      useEffect(() => {
        if (bookings) {
          const formattedEvents: Event[] = bookings.map(booking => {
            const venue = venues?.find(v => v.id === booking.venueId);
            const client = people?.find(p => p.id === booking.primaryContactId);
            const djNames = people?.filter(p => booking.djIds.includes(p.id)).map(dj => dj.firstName + ' ' + dj.lastName).join(', ');

            return {
              ...booking,
              title: `${booking.bookingName} - ${venue?.name || 'Unknown Venue'} - ${client?.firstName || ''} ${client?.lastName || ''} - ${djNames}`,
              start: moment(`${booking.startDate} ${booking.startTime}`).toDate(),
              end: moment(`${booking.endDate} ${booking.endTime}`).toDate(),
            };
          });
          setEvents(formattedEvents);
        }
      }, [bookings, venues, people]);

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Scheduling</h1>
          <div className="bg-white shadow rounded p-4">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              style={{ height: 500 }}
            />
          </div>
        </div>
      );
    };

    export default Scheduling;
