import prisma from "@/app/lib/db";
import { auth } from "../../lib/auth";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const { appointmentDate, tech } = await req.json();
    console.log("Received Payload:", { appointmentDate, tech });

    const appointment = await prisma.appointments.create({
      data: {
        userEmail: session.user.email,
        appointmentDate: appointmentDate,
        tech: tech,
      },
    });

    return new Response(
      JSON.stringify({ message: "Appointment saved", appointment }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving appointment:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to save appointment",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
