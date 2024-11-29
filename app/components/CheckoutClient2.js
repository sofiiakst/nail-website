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
  /*
    const router = useRouter();

  // Access query parameters from the URL
  const { serviceName, servicePrice, techName, image } = router.query;

  // Handle the amount conversion and Stripe setup
  const amount = servicePrice ? convertToSub(servicePrice) : 0;
  */
  const searchParams = useSearchParams(); // Access query parameters

  // Get query parameters safely

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
      {/* Pass down amount and other details to the checkout component */}
      <CheckoutPage amount={amount} />
    </Elements>
  );
}
