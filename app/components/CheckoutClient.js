"use client";

import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage2 from "./CheckoutPage2";
import { convertToSub } from "../lib/convertToSub";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe public key not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
console.log(stripePromise);

export default function CheckoutClientComponent({
  serviceName,
  serviceDuration,
  servicePrice,
  appointmentDateTime,
  techName,
  phone,
  image,
  fullName,
  totalServicePrice,
  extrasPrice,
}) {
  console.log("from checkout client comp:", appointmentDateTime);
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: servicePrice,
        currency: "eur",
      }}
    >
      {/* Pass down amount and other details to the checkout component */}
      <CheckoutPage2
        amount={servicePrice}
        appointmentDateTime={appointmentDateTime}
        tech={techName}
        serviceName={serviceName}
        serviceDuration={serviceDuration}
        phone={phone}
        image={image}
        fullName={fullName}
        totalServicePrice={totalServicePrice}
        extrasPrice={extrasPrice}
      />
    </Elements>
  );
}
