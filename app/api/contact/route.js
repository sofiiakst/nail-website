import { sendEmail } from "@/app/config/nodemailer";

export const POST = async (req) => {
  console.log("Received request at /api/contact");

  try {
    const { appointmentDateTime } = await req.json();
    console.log("Appointment Date Received:", appointmentDateTime);
    const result = await sendEmail(appointmentDateTime);
    console.log("Email sent result:", result);
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
