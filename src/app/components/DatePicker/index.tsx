import { useState } from "react";

import { DayPicker } from "react-day-picker";
//TODO: пофиксить day picker стили
// import "react-day-picker/style.css";
import 'react-day-picker/dist/style.css';
import "./index.scss";

export function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      showOutsideDays
      weekStartsOn={1}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}