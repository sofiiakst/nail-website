"use client";
import Link from "next/link";
import MotionBtn from "../components/MotionBtn";
import { revertToSuper } from "../lib/revertToSuper";
import { useEffect } from "react";
import { saveAppointment } from "../lib/dataServices";

export default function Page({ searchParams }) {
  useEffect(() => {
    const email = searchParams?.email;
    const appointmentDateTime = searchParams?.appointmentDateTime;
    const tech = searchParams?.tech;
    const amount = searchParams?.amount;
    const serviceName = searchParams?.serviceName;
    const phone = searchParams?.phone;
    const fullName = searchParams?.fullName;

    async function finalizeBooking() {
      try {
        await saveAppointment({
          userEmail: email,
          appointmentDate: appointmentDateTime,
          tech: tech,
          amount: revertToSuper(amount),
          serviceName: serviceName,
          phone: phone,
          fullName: fullName,
        });

        await sendEmail(email, { appointmentDateTime, tech });
        console.log("Appointment saved and email sent!");
        
      } catch (error) {
        console.error("Error finalizing booking:", error);
      }
    }

    finalizeBooking();
  }, []);
  const amount = searchParams?.amount;
  const amount2 = revertToSuper(amount);
  return (
    <main>
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-primary-900 font-extrabold text-3xl text-center">
            We booked your appointment!
          </h1>
          <h2 className="text-primary-700 text-center mt-10 text-xl">
            Your {amount2}$ payment was successful!
          </h2>
          <p className="text-sm text-primary-500 text-center mt-5">
            Note: Upfront charges wont get returned if the appointment gets
            cancelled
          </p>
        </div>
        <div className=" mt-10">
          <Link href="/" passHref>
            <MotionBtn>BACK TO HOME</MotionBtn>
          </Link>
        </div>
      </div>
    </main>
  );
}
