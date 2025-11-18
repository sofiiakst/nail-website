import supabase from "./db";
import { v4 as uuidv4 } from "uuid";
export async function getMani() {
  try {
    const { data: mani, error } = await supabase.from("Mani").select("*");
    if (error) throw error;
    return mani;
  } catch (error) {
    console.error("Error fetching manicures:", error);
    return [];
  }
}

export async function getLashes() {
  try {
    const { data: lashes, error } = await supabase.from("Lashes").select("*");
    if (error) throw error;
    return lashes;
  } catch (error) {
    console.error("Error fetching lashes:", error);
    return [];
  }
}

export async function getExtras() {
  try {
    const { data: extras, error } = await supabase.from("Extras").select("*");
    if (error) throw error;
    return extras;
  } catch (error) {
    console.error("Error fetching extras:", error);
    return [];
  }
}

export async function getBrows() {
  try {
    const { data: brows, error } = await supabase.from("Brows").select("*");
    if (error) throw error;
    return brows;
  } catch (error) {
    console.error("Error fetching brows:", error);
    return [];
  }
}

export async function getPedi() {
  try {
    const { data: pedi, error } = await supabase.from("Pedi").select("*");
    if (error) throw error;
    return pedi;
  } catch (error) {
    console.error("Error fetching pedicures:", error);
    return [];
  }
}

export async function getTech() {
  try {
    const { data: tech, error } = await supabase.from("Tech").select("*");
    if (error) throw error;
    return tech;
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return [];
  }
}

export async function getApps() {
  try {
    const { data: apps, error } = await supabase
      .from("Appointments")
      .select("*");
    if (error) throw error;
    return apps;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function getAppsByTech(tech) {
  try {
    const { data: apps, error } = await supabase
      .from("Appointments")
      .select("*")
      .eq("tech", tech);
    if (error) throw error;

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
    const { data: apps, error } = await supabase
      .from("Appointments")
      .select("*")
      .eq("userEmail", email);
    if (error) throw error;

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

export async function getManiById(maniId) {
  try {
    const { data: mani, error } = await supabase
      .from("Mani")
      .select("*")
      .eq("id", maniId)
      .single();
    if (error) throw error;

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
    const { data: pedi, error } = await supabase
      .from("Pedi")
      .select("*")
      .eq("id", pediId)
      .single();
    if (error) throw error;

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
    const { data, error } = await supabase
      .from("Appointments")
      .insert([appointment])
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error("Error saving appointment to Supabase:", error);
    throw error;
  }
}

export async function deleteAppointment(id) {
  const { data, error } = await supabase
    .from("Appointments")
    .delete()
    .eq("id", id);
  return { data, error };
}
export async function getAppointments(current) {
  const start = new Date(current);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  const { data: appointments, error } = await supabase
    .from("Appointments")
    .select("*")
    .gte("appointmentDate", start.toISOString())
    .lte("appointmentDate", end.toISOString());

  if (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }

  return appointments;
}
export async function uploadImage(file, appointmentId) {
  if (!file || !appointmentId) return null;
  const uuid = uuidv4();

  const fileName = `${uuid}-${file.name}`;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);

  const filePath = `appointments/${appointmentId}/${uuidv4()}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from("nail-refs")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("nail-refs")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

export async function updateAppointmentWithImage(appointmentId, imageUrl) {
  const { error } = await supabase
    .from("Appointments")
    .update({ image: imageUrl })
    .eq("id", appointmentId);

  if (error) {
    console.error("Error updating appointment with image:", error);
    return null;
  }

  return true;
}

export async function appointmentExistsByPaymentIntentId(payIntID) {
  const { data, error } = await supabase
    .from("Appointments")
    .select("id")
    .eq("stripePaymentIntentId", payIntID)
    .limit(1)
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      console.error("Error checking appointment existence:", error.message);
    }
    return false;
  }

  return !!data;
}
