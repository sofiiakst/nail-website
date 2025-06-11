"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/db";
import { getApps } from "../lib/dataServices";

export default function TimeSelector({
  onSelectTime,
  selectedTech,
  selectedDate,
}) {
  const [availableHours, setAvailableHours] = useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data: appointments, error } = await supabase
          .from("Appointments")
          .select("appointmentDate")
          .eq("tech", selectedTech.name);
        if (error) {
          throw new Error("Failed to fetch appointments");
        }

        appointments.forEach((appointment) => {
          console.log("Appointment Date (UTC):", appointment.appointmentDate);
          const localDate = new Date(appointment.appointmentDate); // Convert to local date
          console.log("Appointment Hour (local):", localDate.getHours());
        });

        // Extract occupied hours from appointments
        const occupiedHoursAndDays = appointments.map((appointment) => {
          const utcDate = new Date(appointment.appointmentDate);

          return {
            dateString: utcDate.toISOString().split("T")[0], // e.g., '2025-07-05'
            hour: utcDate.getUTCHours(), // Use UTC hour
          };
        });

        const normalizeToUTC = (date) => {
          return new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
          );
        };

        const updateAvailableHours = (selectedDate) => {
          if (!selectedDate) {
            setAvailableHours([]);
            return;
          }

          // Normalize selectedDate to UTC
          const selectedDayUTC = new Date(
            Date.UTC(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate()
            )
          );
          const selectedDateString = selectedDayUTC.toISOString().split("T")[0];

          /*const hours = [...Array(11).keys()].map((hour) => hour + 10);*/ // 10 AM to 8 PM
          let startHour = 10;
          let endHour = 20;
          if (selectedDate.getDay() === 6) {
            endHour = 18;
          }

          let hours = [];
          for (let hour = startHour; hour < endHour; hour += 2) {
            hours.push(hour);
          }
          // Filter hours for the selected day
          const filteredHours = hours.filter((hour) => {
            return !occupiedHoursAndDays.some(
              (occupied) =>
                occupied.dateString === selectedDateString &&
                occupied.hour === hour
            );
          });

          setAvailableHours(filteredHours);
        };

        // Update hours when a day is selected (if you have a `selectedDay` state)
        if (selectedDate) {
          updateAvailableHours(selectedDate);
        } else {
          setAvailableHours([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAvailableHours([]); // Reset available hours on error
      }
    };

    fetchAppointments();
  }, [selectedTech, selectedDate]);
  const handleTimeSelect = (event) => {
    const selectedTime = event.target.value;

    console.log("Selected Time:", selectedTime); // Log selected time
    onSelectTime(selectedTime); // Pass the selected time to the parent component
  };
  return (
    <div className="space-y-4 space-x-4 ml-12 sm:ml-56 lg:ml-0">
      <label className="text-primary-900 text-lg">Pick hour:</label>
      <select
        required
        className="text-primary-500 w-1/2 px-5 py-3 bg-primary-50 shadow-sm rounded-md "
        onChange={handleTimeSelect}
      >
        <option value="" key="">
          Pick hour...
        </option>
        {availableHours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}:00
          </option>
        ))}
      </select>
    </div>
  );
}
