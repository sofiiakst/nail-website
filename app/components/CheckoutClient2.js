"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import { convertToSub } from "../lib/convertToSub";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe public key not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
console.log(stripePromise);

export default function CheckoutClientComponent() {
  const searchParams = useSearchParams();

  const selected = searchParams.get("selected") || "";
  const amount = selected ? convertToSub(selected) : 1;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: amount,
        currency: "eur",
      }}
    >
      <CheckoutPage amount={amount} />
    </Elements>
  );
}
