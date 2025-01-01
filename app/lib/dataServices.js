import supabase from "./db";
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
      .single(); // single() ensures only one result is returned
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
      .single(); // single() ensures only one result is returned
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
      .from("Appointments") // Replace 'Appointments' with your actual table name if different
      .insert([appointment])
      .select("id") // Select the id of the inserted record
      .single();

    if (error) {
      throw error;
    }

    return data.id; // Successfully saved
  } catch (error) {
    console.error("Error saving appointment to Supabase:", error);
    throw error;
  }
}

export async function deleteAppointment(id) {
  const { data, error } = await supabase
    .from("Appointments") // Replace with your table name
    .delete()
    .eq("id", id); // Assuming 'id' is the primary key
  return { data, error };
}
export async function getAppointments(startOfTomorrow, endOfTomorrow) {
  const { data: appointments, error } = await supabase
    .from("appointments") // Replace with your table name
    .select("*")
    .gte("appointmentDate", startOfTomorrow.toISOString()) // Greater or equal to the start of tomorrow
    .lt("appointmentDate", endOfTomorrow.toISOString());

  if (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }

  return appointments;
}
