"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { convertToSub } from "../lib/convertToSub";
import CheckoutPage from "./CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe public key not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
console.log(stripePromise);

export default function CheckoutClientComponent() {
  const amount = 1000;
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: amount,
        currency: "eur",
      }}
    >
      {/* Pass down amount and other details to the checkout component */}
      <CheckoutPage amount={amount} />
    </Elements>
  );
}
