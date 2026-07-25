"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function TimeSelector({
  onSelectTime,
  selectedTech,
  selectedDate,
  selectedService,
}) {
  const [availableHours, setAvailableHours] = useState([]);

  // Live query — re-runs automatically whenever appointments for this tech change.
  const appointments = useQuery(
    api.appointments.getAppsByTech,
    selectedTech ? { tech: selectedTech.name } : "skip"
  );

  useEffect(() => {
    // Still loading, or no tech/date picked yet — don't compute anything.
    if (!selectedTech || !selectedDate || appointments === undefined) {
      return;
    }

    updateAvailableHours(selectedDate, appointments);
  }, [selectedTech, selectedDate, selectedService, appointments]);

  const updateAvailableHours = (selectedDate, appointments) => {
    if (!selectedDate) {
      setAvailableHours([]);
      return;
    }

    const selectedDayUTC = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );
    const selectedDateStr = selectedDayUTC.toISOString().split("T")[0];

    // Fixed window, no more per-tech/day-of-week/Dec31 branching.
    const startHour = 10;
    const endHour = 20;

    let slots = [];

    for (let hour = startHour; hour < endHour; hour += 0.5) {
      const h = Math.floor(hour);
      const m = hour % 1 === 0 ? "00" : "30";
      const timeStr = `${String(h).padStart(2, "0")}:${m}`;
      slots.push(timeStr);
    }

    const blockedSlots = new Set();

    appointments.forEach((appointment) => {
      const start = new Date(appointment.appointmentDate);
      const duration = appointment.duration || 1;
      const dateStr = start.toISOString().split("T")[0];

      if (dateStr === selectedDateStr) {
        for (let i = 0; i < duration; i++) {
          const blockedTime = new Date(start.getTime() + i * 30 * 60 * 1000);
          const h = String(blockedTime.getUTCHours()).padStart(2, "0");
          const m = String(blockedTime.getUTCMinutes()).padStart(2, "0");
          blockedSlots.add(`${h}:${m}`);
        }
      }
    });

    const filteredSlots = slots.filter((slot) => {
      const [hourStr, minStr] = slot.split(":");
      const slotStartHour = parseInt(hourStr, 10);
      const slotStartMin = parseInt(minStr, 10);

      const totalMinutes = slotStartHour * 60 + slotStartMin;

      for (let i = 0; i < selectedService.duration; i++) {
        const minutes = totalMinutes + i * 30;
        const h = String(Math.floor(minutes / 60)).padStart(2, "0");
        const m = String(minutes % 60).padStart(2, "0");
        const timeStr = `${h}:${m}`;

        if (blockedSlots.has(timeStr)) {
          return false;
        }
      }

      const endMinutes = totalMinutes + selectedService.duration * 30;
      return endMinutes <= endHour * 60;
    });

    setAvailableHours(filteredSlots);
  };

  const handleTimeSelect = (event) => {
    const selectedTime = event.target.value;
    console.log("Selected Time:", selectedTime);
    onSelectTime(selectedTime);
  };

  return (
    <div className="space-y-4 space-x-4 ml-12 sm:ml-56 lg:ml-0">
      <label className="text-primary-900 text-lg">Pick hour:</label>
      <select
        required
        className="text-primary-500 w-1/2 px-5 py-3 bg-primary-50 shadow-sm rounded-md"
        onChange={handleTimeSelect}
      >
        {availableHours.length ? (
          <option value="">Pick hour...</option>
        ) : (
          <option value="">No time available.</option>
        )}

        {availableHours.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
}
