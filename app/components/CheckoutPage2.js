"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import Spinner from "./Spinner";
import { revertToSuper } from "../lib/revertToSuper";

import { getUserEmail } from "../lib/getUserEmail";

export default function CheckoutPage2({
  amount,
  appointmentDateTime,
  tech,
  serviceName,
  serviceDuration,
  phone,
  image,
  fullName,
  totalServicePrice,
  extrasPrice,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchEmail() {
      try {
        const userEmail = await getUserEmail(); // Get the email asynchronously
        setEmail(userEmail);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    }

    fetchEmail(); // Call the function to get the email
  }, []);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email || "",
        amount: amount,
        appointmentDateTime: appointmentDateTime,
        tech: tech,
        serviceName: serviceName,
        serviceDuration: serviceDuration,
        phone: phone,
        fullName: fullName,
        totalServicePrice: totalServicePrice,
        extrasPrice: extrasPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
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
          return_url: `https://nail-topia.com/book-success?email=${encodeURIComponent(
            email
          )}&appointmentDateTime=${encodeURIComponent(
            appointmentDateTime
          )}&tech=${encodeURIComponent(tech)}&amount=${encodeURIComponent(
            amount
          )}&serviceName=${encodeURIComponent(
            serviceName
          )}&phone=${encodeURIComponent(phone)}&image=${encodeURIComponent(
            image
          )}&fullName=${encodeURIComponent(
            fullName
          )}&totalServicePrice=${encodeURIComponent(
            totalServicePrice
          )}&extrasPrice=${encodeURIComponent(extrasPrice)}`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      setLoading(false);
      // Payment succeeded, handle success (you could redirect, show a message, etc.)
    } catch (error) {
      console.error("Error occurred:", error);
      alert(
        "An error occurred while saving the appointment or processing payment."
      );
    } finally {
      setLoading(false);
    }
  };

  const displayAmount = revertToSuper(amount);

  return (
    <form onSubmit={handleSubmit} className="p-2 rounded-md">
      {clientSecret ? (
        <>
          <PaymentElement />
          <button
            disabled={!stripe || loading}
            className="disabled:opacity-15 disabled:animate-pulse font-medium text-center mt-10 py-4 border-y-2 border-x-2 rounded-lg border-primary-600 text-primary-600 w-full md:w-1/2 md:ml-80 text-xl hover:bg-black hover:text-white hover:border-black"
          >
            {!loading ? `Pay Upfront : ${displayAmount}€ ` : "Processing..."}
          </button>
        </>
      ) : (
        <Spinner /> // Add a spinner or loading state if clientSecret isn't ready
      )}
    </form>
  );
}
