import { sendEmail } from "@/app/config/nodemailer2";

export const POST = async (req) => {
  try {
    const result = await sendEmail();
    console.log("Email sent result at 5 am:", result);
  } catch (error) {
    console.error("Error running email task at 5 PM:", error.message);
  }

  return new Response(
    JSON.stringify({ success: true, message: "Scheduler is running" }),
    {
      status: 200,
    }
  );
};
