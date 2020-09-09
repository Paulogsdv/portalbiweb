import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptbrLocale from '@fullcalendar/core/locales/pt-br';

import { APP, CALENDAR } from './styles';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

export default function Calendar({ data, submitDate, submitEvent }) {
   const [calendarWeekends] = useState(true);
   const [calendarEvents] = useState(data);
   const calendarComponentRef = useRef();

   function handleDateClick(date) {
      submitDate(date.date);
   }

   function handleEventClick({ event }) {
      submitEvent(event.extendedProps);
   }

   function mobileCheck() {
      if (window.innerWidth >= 768) {
         return 'dayGridMonth';
      }
      return 'dayGrid';
   }

   return (
      <APP>
         <CALENDAR>
            <FullCalendar
               defaultView={mobileCheck()}
               header={{
                  left: 'prev',
                  center: 'title',
                  right: 'next',
               }}
               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
               ref={calendarComponentRef}
               weekends={calendarWeekends}
               events={calendarEvents}
               locale={ptbrLocale}
               eventTextColor="#FFF"
               displayEventTime={false}
               dateClick={date => handleDateClick(date)}
               eventClick={event => handleEventClick(event)}
               editable
            />
         </CALENDAR>
      </APP>
   );
}

Calendar.propTypes = {
   data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
   submitEvent: PropTypes.func.isRequired,
   submitDate: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
   data: {},
};
