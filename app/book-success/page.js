"use client";
import Link from "next/link";
import MotionBtn from "../components/MotionBtn";
import { revertToSuper } from "../lib/revertToSuper";
import { useEffect, useState } from "react";

export default function Page({ searchParams }) {
  const amount = searchParams?.amount;
  const amount2 = revertToSuper(amount);

  // Stripe appends this to your return_url automatically after redirecting
  // back from the Payment Element (alongside your own `amount` param).
  const paymentIntentId = searchParams?.payment_intent;

  const [status, setStatus] = useState("saving"); // "saving" | "done" | "error"

  useEffect(() => {
    if (!paymentIntentId) {
      setStatus("error");
      return;
    }

    let cancelled = false;

    const confirmAppointment = async () => {
      try {
        const res = await fetch("/api/confirm-appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Failed to confirm appointment:", data?.error);
          if (!cancelled) setStatus("error");
          return;
        }

        if (!cancelled) setStatus("done");
      } catch (err) {
        console.error("Error confirming appointment:", err);
        if (!cancelled) setStatus("error");
      }
    };

    confirmAppointment();

    return () => {
      cancelled = true;
    };
  }, [paymentIntentId]);

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

          {status === "error" && (
            <p className="text-sm text-red-500 text-center mt-3">
              We couldn't confirm your appointment automatically — please
              contact us with your payment confirmation.
            </p>
          )}
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
