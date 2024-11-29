"use client";

import Link from "next/link";

export default function MyAppointments({ apps }) {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set current time to 00:00:00 to ignore time part

  // Filter appointments for today and later
  const upcomingAppointments = apps
    ? apps.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);

        // Normalize the appointment date to midnight (removes time part)
        appointmentDate.setHours(0, 0, 0, 0);

        // Include only future appointments
        return appointmentDate >= now;
      })
    : [];

  const formatDate = (date) => {
    const appointmentDate = new Date(date);

    // Convert the UTC date to the local time zone before displaying
    return appointmentDate.toUTCString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="">
      <h1 className="text-primary-800 font-semibold text-xl md:text-3xl md:ml-10">
        Upcoming Appointments
      </h1>
      {upcomingAppointments.length === 0 ? (
        <div className="flex flex-col">
          <h2 className="text-primary-700 md:ml-10 mt-10 text-lg">
            No upcoming appointments.
          </h2>
          <Link
            href="/serv"
            className="text-primary-500 mt-4 md:ml-10 underline text-lg"
          >
            Book appointment
          </Link>
        </div>
      ) : (
        <ul className="md:ml-10 mt-10">
          {upcomingAppointments.map((appointment) => (
            <li
              className="text-primary-800 mt-1 py-2 border rounded-sm border-primary-700 text-center"
              key={appointment.id}
            >
              {formatDate(appointment.appointmentDate)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
