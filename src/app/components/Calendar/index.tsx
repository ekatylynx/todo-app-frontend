import React, { useState } from "react";
import DateCalc from '../DateCalc';
import './index.scss';

export function Calendar() {
  const [date, setDate] = useState({
    date: new Date(),
    currentDate: new Date(),
    selectedDate: null,
  });

  return (
      <div className='calendar'>
        <DateCalc />
      </div>
  );
}

export default Calendar;