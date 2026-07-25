"use client";
import {
  isPast,
  isBefore,
  startOfDay,
  endOfDay,
  addMonths,
  addDays,
} from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

export default function DateSelector({ onSelectDate }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDay(day);
      onSelectDate(day);
    }
  };

  const today = startOfDay(new Date());

  return (
    <div className="flex flex-col justify-between ">
      <DayPicker
        required
        disabled={(date) => {
          const todayStart = startOfDay(new Date());

          const maxDate = addMonths(todayStart, 1);

          const isBeforeToday = isBefore(
            date,
            addDays(startOfDay(new Date()), 1)
          );

          const isAfterMax = date > maxDate;
          const isSundayOrMonday = date.getDay() === 0 || date.getDay() === 1;

          return isAfterMax || isBeforeToday || isSundayOrMonday;
        }}
        className="pt-12 place-self-center text-black font-serif text-md  md:text-lg xl:text-xl notranslate"
        styles={{
          day: {
            width: "3rem",
            height: "3rem",
          },
        }}
        numberOfMonths={1}
        mode="single"
        hidden={{
          before: today,
        }}
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
