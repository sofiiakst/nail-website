import nodemailer from "nodemailer";
import { google } from "googleapis";
import { getAppointments } from "../lib/dataServices";

const oAuth2Client = new google.auth.OAuth2(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const sendEmail = async () => {
  try {
    const currentDate = new Date();
    const appointments = await getAppointments(currentDate);

    if (appointments.length === 0) {
      console.log("No appointments found for tomorrow.");
      return;
    }

    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP settings
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER, // Your email address
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      logger: true, // Enable logging
      debug: true,
    });

    for (const appointment of appointments) {
      const formattedDate = new Date(appointment.appointmentDate).toUTCString();

      const mailOptions = {
        from: `"NAILTOPIA" <${process.env.EMAIL_USER}>`,
        to: appointment.userEmail,
        subject: "APPOINTMENT REMINDER!",
        text: `Υπενθυμιση για το αυριανο σου ραντεβου: ${formattedDate}.`,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log(
        `Reminder sent to ${appointment.userEmail} for ${formattedDate}.`
      );
      return result;
    }
  } catch (err) {
    console.error("Failed to send email:", err.message);
    throw new Error(err.message);
  }
};
