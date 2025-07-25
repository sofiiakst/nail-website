import { sendEmail } from "@/app/config/nodemailer";
import { sendEmail3 } from "@/app/config/nodemailer3";

export const POST = async (req) => {
  console.log("Received request at /api/contact");

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
    } = await req.json();
    console.log("Appointment Date Received:", appointmentDateTime);
    const result = await sendEmail(appointmentDateTime);
    const result2 = await sendEmail3(
      amount,
      appointmentDateTime,
      tech,
      serviceName,
      phone,
      fullName,
      totalServicePrice,
      extrasPrice
    );
    console.log("Email sent result:", result);
    console.log("Email marias sent result:", result2);
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in /api/contact", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
};
