import nodemailer from "nodemailer";
import { google } from "googleapis";
import { auth } from "../lib/auth";

const oAuth2Client = new google.auth.OAuth2(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const formatDate = (date) => {
  const appointmentDate = new Date(date);

  return appointmentDate.toUTCString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const sendEmail = async (appointmentDateTime, userEmail) => {
  try {
    console.log(appointmentDateTime);

    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP settings
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      logger: true,
      debug: true,
    });

    const mailOptions = {
      from: `"NAILTOPIA" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Ευχαριστουμε για την προτιμηση σας!",
      text: `Το ραντεβού σας προγραμματίστηκε για: ${formatDate(
        appointmentDateTime
      )}\n\n
      *ΥΠΕΝΘΥΜΙΣΗ: Η προκαταβολή κρατείται σε περίπτωση ακύρωσης ραντεβού.`,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.error("Failed to send email:", err.message);
    throw new Error(err.message);
  }
};
