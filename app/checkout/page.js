"use client";
import CheckoutClientComponent from "../components/CheckoutClient2";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe public key not defined");
}

export default function Page() {
  return (
    <div className="text-primary-950">
      <CheckoutClientComponent />
    </div>
  );
}
