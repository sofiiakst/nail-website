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

// Ensure you're in client mode

export default function DateSelector({ onSelectDate }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDay(day);
      onSelectDate(day); // Pass formatted date directly to parent
    }
  };

  const today = startOfDay(new Date());
  const twoWeeksLater = addDays(today, 13);
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
          const start = new Date(date.getFullYear(), 7, 10);
          const end = new Date(date.getFullYear(), 7, 25);

          const start1 = new Date(date.getFullYear(), 7, 1);
          const end1 = new Date(date.getFullYear(), 7, 2);
          const start2 = new Date(date.getFullYear(), 7, 7);
          const end2 = new Date(date.getFullYear(), 7, 9);

          const october28th = new Date(date.getFullYear(), 9, 28);
          const december13th = new Date(date.getFullYear(), 11, 13);
          const start3 = new Date(date.getFullYear(), 10, 4);
          const end3 = new Date(date.getFullYear(), 10, 5);

          const isInDisabledRange = date >= start && date <= end;
          const isInDisabledRange1 = date >= start1 && date <= end1;
          const isInDisabledRange2 = date >= start2 && date <= end2;
          const isInDisabledRange3 = date >= start3 && date <= end3;
          const isOctober28th =
            date.toDateString() === october28th.toDateString();

          const isDec13th = date.toDateString() === december13th.toDateString();

          return (
            isBeforeToday ||
            isAfterMax ||
            isSundayOrMonday ||
            isInDisabledRange ||
            isInDisabledRange1 ||
            isInDisabledRange2 ||
            isInDisabledRange3 ||
            isOctober28th ||
            isDec13th
          );
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
        hidden={{
          before: today,
          after: twoWeeksLater,
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
