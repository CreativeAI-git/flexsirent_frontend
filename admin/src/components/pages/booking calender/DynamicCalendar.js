import "./index.css"
// components/BookingCalendar.jsx
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DynamicCalendar = ({
  events = [],
  onSelectEvent = () => {},
  onAddNewBooking = () => {},
  defaultDate = new Date(),
}) => {
  return (
    <div className="calendar-container">
   
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={defaultDate}
        style={{ height: 600 }}
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
};

export default DynamicCalendar;
