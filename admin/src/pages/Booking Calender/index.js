import { useState } from "react";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import DynamicCalendar from "../../components/pages/booking calender/DynamicCalendar";

const BookingCalender = () => {
  const [events, setEvents] = useState([
    {
      title: "Booked Slot",
      start: new Date(2025, 6, 9), // July 9, 2025
      end: new Date(2025, 6, 9),
    },
  ]);

  const handleNewBooking = () => {
    // alert("Open new booking form/modal");
  };

  const handleEventClick = (event) => {
    // alert(`Event: ${event.title}`);
  };

  return (
    <PanelLayout>
      <SubHeader
        label="Booking Calendar"
        isBtn={true}
        btnRoute=""
        btnName="+ Add New Booking"
      />

      <DynamicCalendar
        // events={events}
        // onAddNewBooking={handleNewBooking}
        // onSelectEvent={handleEventClick}
      />
    </PanelLayout>
  );
};

export default BookingCalender;
