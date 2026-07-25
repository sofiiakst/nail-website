import { NextResponse } from "next/server";
import Stripe from "stripe";

import {
  appointmentExistsByPaymentIntentId,
  saveAppointment,
} from "../../../lib/dataServices";
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

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const m = paymentIntent.metadata;
    const payIntID = paymentIntent.id;

    try {
      const alreadySaved = await appointmentExistsByPaymentIntentId(payIntID);
      if (alreadySaved) {
        console.log("Appointment already exists. Skipping duplicate.");
        return new NextResponse(JSON.stringify({ received: true }), {
          status: 200,
        });
      }

      const totalServicePrice = Number(m.totalServicePrice || "0");
      const extrasPrice = Number(m.extrasPrice || "0");
      const total = totalServicePrice + extrasPrice;

      const newAppointment = await saveAppointment({
        stripePaymentIntentId: payIntID,
        userEmail: m.userEmail,
        appointmentDate: m.appointmentDateTime,
        tech: m.tech,
        amount: revertToSuper(m.amount),
        serviceName: m.serviceName,
        duration: m.serviceDuration,
        phone: m.phone,
        fullName: m.fullName,
        totalAmount: total,
        stripePaymentIntentId: paymentIntent.id,
      });

      if (!newAppointment) {
        console.error("Appointment failed to save, email skipped.");
        return new NextResponse("Appointment save failed", { status: 500 });
      }

      console.log("Appointment saved for:", m.fullName);

      const emailResponse = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: m.amount,
          appointmentDateTime: m.appointmentDateTime,
          tech: m.tech,
          serviceName: m.serviceName,
          phone: m.phone,
          fullName: m.fullName,
          totalServicePrice: totalServicePrice,
          extrasPrice: extrasPrice,
          userEmail: m.userEmail,
        }),
      });

      const emailData = await emailResponse.json();
      console.log("📧 Email response status:", emailResponse.status, emailData);

      if (emailResponse.status === 200) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email:", emailData?.error || "Unknown");
      }
    } catch (err) {
      console.error("Error saving appointment:", err.message, err.stack);

      return new NextResponse("Server error saving appointment", {
        status: 500,
      });
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
