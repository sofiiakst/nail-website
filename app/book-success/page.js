"use client";
import Link from "next/link";
import MotionBtn from "../components/MotionBtn";
import { revertToSuper } from "../lib/revertToSuper";
import { useEffect } from "react";
import {
  saveAppointment,
  updateAppointmentWithImage,
  uploadImage,
} from "../lib/dataServices";

import convertBlobUrlToFile from "../lib/convertImageToFile";

export default function Page({ searchParams }) {
  useEffect(() => {
    const email = searchParams?.email;
    const appointmentDateTime = searchParams?.appointmentDateTime;
    const tech = searchParams?.tech;
    const amount = searchParams?.amount;
    const serviceName = searchParams?.serviceName;
    const phone = searchParams?.phone;
    const fullName = searchParams?.fullName;

    const totalServicePrice = Number(searchParams?.totalServicePrice) || 0;
    const extrasPrice = Number(searchParams?.extrasPrice) || 0;
    const total = totalServicePrice + extrasPrice;

    async function finalizeBooking() {
      try {
        // Save the appointment and get the appointment ID
        const appId = await saveAppointment({
          userEmail: email,
          appointmentDate: appointmentDateTime,
          tech: tech,
          amount: revertToSuper(amount),
          serviceName: serviceName,
          phone: phone,
          fullName: fullName,
          totalAmount: total,
        });
      } catch (error) {
        console.error("Error finalizing booking:", error);
      }
    }

    // Call the function (e.g., inside a useEffect)
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
            Your {amount2}€ payment was successful!
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
