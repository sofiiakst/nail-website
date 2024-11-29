"use client";

import CheckoutClientComponent3 from "../components/CheckoutClient3";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe public key not defined");
}

export default function Page() {
  return (
    <div className="text-primary-950">
      <CheckoutClientComponent3 />
    </div>
  );
}
