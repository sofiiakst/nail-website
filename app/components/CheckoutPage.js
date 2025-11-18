"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { convertToSub } from "../lib/convertToSub";
import Spinner from "./Spinner";
import { revertToSuper } from "../lib/revertToSuper";

export default function CheckoutPage({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSub(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) return <Spinner />;
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://nail-topia.com/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
    setLoading(false);
  };
  const displayAmount = revertToSuper(amount);
  return (
    <form onSubmit={handleSubmit} className="p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      <button
        disabled={!stripe || loading}
        className="disabled:opacity-15 disabled:animate-pulse font-medium text-center mt-10 py-4 border-y-2 border-x-2 rounded-lg border-primary-600 text-primary-600 w-full md:w-1/2 md:ml-80 text-xl hover:bg-black hover:text-white hover:border-black"
      >
        {!loading ? `Pay : ${displayAmount}€ ` : "Processing..."}
      </button>
    </form>
  );
}
