import { message } from "antd";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { pipViewDate2 } from "../../utils/pip";

const MultiDatePicker = ({ onDateSelect, min_stay_duration = 1, max_stay_duration, blockedDates = [], minDate }) => {
  const [startDate, setStartDate] = useState(minDate || new Date());
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (minDate) {
      setStartDate(minDate);
      setEndDate(null);
    }
  }, [minDate]);

  const onChange = (dates) => {
    const [start, end] = dates;

    // If user hasn't picked an end date yet
    if (!end) {
      setStartDate(start);
      setEndDate(null);
      return;
    }

    // Calculate difference in days
    const diffInTime = end.getTime() - start.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays < min_stay_duration) {
      // ❌ Reset end date and alert user
      toast.error(`Minimum stay is ${min_stay_duration} nights`);
      setStartDate(start);
      setEndDate(null);
      return;
    }

    if (max_stay_duration && diffInDays > max_stay_duration) {
      // ❌ Reset end date and alert user
      toast.error(`Maximum stay is ${max_stay_duration} nights`);
      setStartDate(start);
      setEndDate(null);
      return;
    }

    // ✅ Valid selection
    setStartDate(start);
    setEndDate(end);

    const data = {
      start_date: pipViewDate2(start),
      end_date: pipViewDate2(end),
    };
    onDateSelect(data);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      selectsDisabledDaysInRange
      inline
      minDate={minDate || new Date()}
      excludeDates={blockedDates.map(date => new Date(date))} 
    />
  );
};

export default MultiDatePicker;
