// app/api/stripe/webhook/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { saveAppointment } from "../../../lib/dataServices"; // Use your actual import path
import { revertToSuper } from "../../../lib/revertToSuper";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const paymentIntent = event.data.object;
    const m = paymentIntent.metadata;

    try {
      const totalServicePrice = Number(m.totalServicePrice || "0");
      const extrasPrice = Number(m.extrasPrice || "0");
      const total = totalServicePrice + extrasPrice;

      await saveAppointment({
        userEmail: paymentIntent.receipt_email || "", // or store in metadata if needed
        appointmentDate: m.appointmentDateTime,
        tech: m.tech,
        amount: revertToSuper(m.amount),
        serviceName: m.serviceName,
        phone: m.phone,
        fullName: m.fullName,
        totalAmount: total,
      });

      console.log("Appointment saved via webhook for:", m.fullName);
    } catch (err) {
      console.error(" Error saving appointment in Supabase:", err);
      return new NextResponse("Server error saving appointment", {
        status: 500,
      });
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
