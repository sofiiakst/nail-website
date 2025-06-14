"use client";
import { isPast } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

// Ensure you're in client mode

export default function DateSelector({ onSelectDate }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDay(day);
      onSelectDate(day); // Pass formatted date directly to parent
    }
  };
  return (
    <div className="flex flex-col justify-between ">
      <DayPicker
        required
        disabled={(date) => {
          const isBeforeToday = isPast(date);
          const isSundayOrMonday = date.getDay() === 0 || date.getDay() === 1;
          const start = new Date(date.getFullYear(), 7, 9);
          const end = new Date(date.getFullYear(), 7, 26);
          const isInDisabledRange = date >= start && date <= end;

          return isBeforeToday || isSundayOrMonday || isInDisabledRange;
        }}
        className="pt-12 place-self-center text-black font-serif text-md  md:text-lg xl:text-xl notranslate"
        styles={{
          day: {
            width: "3rem", // Customize width of each day cell
            height: "3rem", // Customize height of each day cell
          },
        }}
        numberOfMonths={1}
        mode="single"
        onSelect={handleDateSelect}
        selected={selectedDay}
        modifiersClassNames={{
          selected: "bg-black rounded-full  text-white",
          disabled: "text-primary-400",
        }}
      />
    </div>
  );
}
