import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function getMani() {
  try {
    return await fetchQuery(api.mani.getMani);
  } catch (error) {
    console.error("Error fetching manicures:", error);
    return [];
  }
}

export async function getLashes() {
  try {
    return await fetchQuery(api.lashes.getLashes);
  } catch (error) {
    console.error("Error fetching lashes:", error);
    return [];
  }
}

export async function getExtras() {
  try {
    return await fetchQuery(api.extras.getExtras);
  } catch (error) {
    console.error("Error fetching extras:", error);
    return [];
  }
}

export async function getBrows() {
  try {
    return await fetchQuery(api.brows.getBrows);
  } catch (error) {
    console.error("Error fetching brows:", error);
    return [];
  }
}

export async function getPedi() {
  try {
    return await fetchQuery(api.pedi.getPedi);
  } catch (error) {
    console.error("Error fetching pedicures:", error);
    return [];
  }
}

export async function getTech() {
  try {
    return await fetchQuery(api.tech.getTech);
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return [];
  }
}

export async function getApps() {
  try {
    return await fetchQuery(api.appointments.getApps);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function getAppsByTech(tech) {
  try {
    const apps = await fetchQuery(api.appointments.getAppsByTech, { tech });
    if (!apps || apps.length === 0) {
      console.warn(`No appointments found for tech: ${tech}`);
      return [];
    }
    return apps;
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    return [];
  }
}

export async function getAppsByMail(email) {
  try {
    console.log("Looking for appointments with email:", email);
    const apps = await fetchQuery(api.appointments.getAppsByMail, { email });
    if (!apps || apps.length === 0) {
      console.warn(`No appointments found for email: ${email}`);
      return [];
    }
    return apps;
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    return [];
  }
}

// NOTE: maniId/pediId are now Convex _id strings, not Supabase numeric ids.
export async function getManiById(maniId) {
  try {
    const mani = await fetchQuery(api.mani.getManiById, { maniId });
    if (!mani) {
      console.warn(`No mani found with ID: ${maniId}`);
      return null;
    }
    return mani;
  } catch (error) {
    console.error("Error retrieving mani:", error);
    return null;
  }
}

export async function getPediById(pediId) {
  try {
    const pedi = await fetchQuery(api.pedi.getPediById, { pediId });
    if (!pedi) {
      console.warn(`No pedi found with ID: ${pediId}`);
      return null;
    }
    return pedi;
  } catch (error) {
    console.error("Error retrieving pedi:", error);
    return null;
  }
}

export async function saveAppointment(appointment) {
  try {
    const id = await fetchMutation(api.appointments.saveAppointment, {
      appointment,
    });
    return id; // Convex _id
  } catch (error) {
    console.error("Error saving appointment to Convex:", error);
    throw error;
  }
}

export async function deleteAppointment(id) {
  try {
    const data = await fetchMutation(api.appointments.deleteAppointment, {
      id,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// Renamed from getAppointments to avoid clashing with getApps in usage —
// keep as getAppointments if that's what your call sites use.
export async function getAppointments(current) {
  try {
    return await fetchQuery(api.appointments.getAppointmentsByDate, {
      current: new Date(current).toISOString(),
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}

// Convex storage instead of a Supabase bucket. `file` should be a
// File/Blob (e.g. from formData in an API route or client upload handler).
export async function uploadImage(file, appointmentId) {
  if (!file || !appointmentId) return null;

  try {
    const uploadUrl = await fetchMutation(api.files.generateUploadUrl);

    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!result.ok) {
      throw new Error(`Upload failed with status ${result.status}`);
    }

    const { storageId } = await result.json();

    const url = await fetchQuery(api.files.getUrl, { storageId });
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export async function updateAppointmentWithImage(appointmentId, imageUrl) {
  try {
    await fetchMutation(api.appointments.updateAppointmentWithImage, {
      appointmentId,
      imageUrl,
    });
    return true;
  } catch (error) {
    console.error("Error updating appointment with image:", error);
    return null;
  }
}

export async function appointmentExistsByPaymentIntentId(payIntID) {
  try {
    return await fetchQuery(
      api.appointments.appointmentExistsByPaymentIntentId,
      {
        payIntID,
      }
    );
  } catch (error) {
    console.error("Error checking appointment existence:", error.message);
    return false;
  }
}

export async function saveAppointmentIfNotExists(appointment) {
  try {
    return await fetchMutation(api.appointments.saveAppointmentIfNotExists, {
      appointment,
    });
  } catch (error) {
    console.error("Error saving appointment to Convex:", error);
    throw error;
  }
}
