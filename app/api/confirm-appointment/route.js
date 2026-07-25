import { NextResponse } from "next/server";
import Stripe from "stripe";

import { saveAppointmentIfNotExists } from "../../lib/dataServices";
import { revertToSuper } from "../../lib/revertToSuper";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { paymentIntentId } = await req.json();

  if (!paymentIntentId) {
    return NextResponse.json(
      { error: "Missing paymentIntentId" },
      { status: 400 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: `Payment not completed (status: ${paymentIntent.status})` },
        { status: 400 }
      );
    }

    const m = paymentIntent.metadata;
    const payIntID = paymentIntent.id;

    const totalServicePrice = Number(m.totalServicePrice || "0");
    const extrasPrice = Number(m.extrasPrice || "0");
    const total = totalServicePrice + extrasPrice;

    const result = await saveAppointmentIfNotExists({
      stripePaymentIntentId: payIntID,
      userEmail: m.userEmail,
      appointmentDate: m.appointmentDateTime,
      tech: m.tech,
      amount: revertToSuper(m.amount),
      serviceName: m.serviceName,
      duration: Number(m.serviceDuration),
      phone: m.phone,
      fullName: m.fullName,
      totalAmount: total,
    });

    if (result.duplicate) {
      console.log("Appointment already exists. Skipping duplicate.");
      return NextResponse.json({ received: true, duplicate: true });
    }

    if (!result.id) {
      console.error("Appointment failed to save, email skipped.");
      return NextResponse.json(
        { error: "Appointment save failed" },
        { status: 500 }
      );
    }

    console.log("Appointment saved for:", m.fullName);

    const siteUrl = "https://nail-website-lqsp.onrender.com";

    const emailResponse = await fetch(`${siteUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: m.amount,
        appointmentDateTime: m.appointmentDateTime,
        tech: m.tech,
        serviceName: m.serviceName,
        phone: m.phone,
        fullName: m.fullName,
        totalServicePrice,
        extrasPrice,
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

    return NextResponse.json({ received: true, appointmentId: result.id });
  } catch (err) {
    console.error("Error confirming appointment:", err.message, err.stack);
    return NextResponse.json(
      { error: "Server error saving appointment" },
      { status: 500 }
    );
  }
}
