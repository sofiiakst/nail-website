import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getApps = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Appointments").collect();
  },
});

export const getAppsByTech = query({
  args: { tech: v.string() },
  handler: async (ctx, { tech }) => {
    return await ctx.db
      .query("Appointments")
      .withIndex("by_tech", (q) => q.eq("tech", tech))
      .collect();
  },
});

export const getAppsByMail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("Appointments")
      .withIndex("by_userEmail", (q) => q.eq("userEmail", email))
      .collect();
  },
});

// Original getAppointments(current) shifted to the *next* day (start.setDate +1)
// and returned everything within that day's 00:00:00–23:59:59 window.
export const getAppointmentsByDate = query({
  args: { current: v.string() }, // ISO date string
  handler: async (ctx, { current }) => {
    const start = new Date(current);
    start.setDate(start.getDate() + 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    return await ctx.db
      .query("Appointments")
      .withIndex("by_appointmentDate", (q) =>
        q
          .gte("appointmentDate", start.toISOString())
          .lte("appointmentDate", end.toISOString())
      )
      .collect();
  },
});

export const saveAppointment = mutation({
  args: { appointment: v.any() }, // pass the whole object, same shape as before
  handler: async (ctx, { appointment }) => {
    const id = await ctx.db.insert("Appointments", appointment);
    return id; // this is the Convex _id — replaces the old numeric/uuid "id"
  },
});

export const deleteAppointment = mutation({
  args: { id: v.id("Appointments") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return { success: true };
  },
});

export const updateAppointmentWithImage = mutation({
  args: { appointmentId: v.id("Appointments"), imageUrl: v.string() },
  handler: async (ctx, { appointmentId, imageUrl }) => {
    await ctx.db.patch(appointmentId, { image: imageUrl });
    return true;
  },
});

export const appointmentExistsByPaymentIntentId = query({
  args: { payIntID: v.string() },
  handler: async (ctx, { payIntID }) => {
    const existing = await ctx.db
      .query("Appointments")
      .withIndex("by_stripePaymentIntentId", (q) =>
        q.eq("stripePaymentIntentId", payIntID)
      )
      .first();
    return !!existing;
  },
});

export const saveAppointmentIfNotExists = mutation({
  args: { appointment: v.any() },
  handler: async (ctx, { appointment }) => {
    const existing = await ctx.db
      .query("Appointments")
      .withIndex("by_stripePaymentIntentId", (q) =>
        q.eq("stripePaymentIntentId", appointment.stripePaymentIntentId)
      )
      .first();

    if (existing) {
      return { id: existing._id, duplicate: true };
    }

    const id = await ctx.db.insert("Appointments", appointment);
    return { id, duplicate: false };
  },
});
