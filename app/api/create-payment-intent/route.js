const { NextResponse } = require("next/server");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const {
      amount,
      appointmentDateTime,
      tech,
      serviceName,
      phone,
      fullName,
      totalServicePrice,
      extrasPrice,
    } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        amount: amount.toString(), // metadata values must be strings
        appointmentDateTime: appointmentDateTime || "",
        tech: tech || "",
        serviceName: serviceName || "",
        phone: phone || "",
        fullName: fullName || "",
        totalServicePrice: totalServicePrice?.toString() || "0",
        extrasPrice: extrasPrice?.toString() || "0",
      },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: `Error:${err}` }, { status: 500 });
  }
}
