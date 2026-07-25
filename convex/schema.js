import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Mani: defineTable({
    name: v.string(),
    price: v.number(),
    duration: v.optional(v.number()),
  }),
  Pedi: defineTable({
    name: v.string(),
    price: v.number(),
    duration: v.optional(v.number()),
  }),
  Lashes: defineTable({
    name: v.string(),
    price: v.number(),
    duration: v.optional(v.number()),
  }),
  Brows: defineTable({
    name: v.string(),
    price: v.number(),
    duration: v.optional(v.number()),
  }),
  Extras: defineTable({
    name: v.string(),
    price: v.number(),
  }),
  Tech: defineTable({
    name: v.string(),
  }),

  Appointments: defineTable({
    tech: v.optional(v.string()),
    userEmail: v.optional(v.string()),
    appointmentDate: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    serviceName: v.optional(v.string()), // was "service"
    duration: v.optional(v.number()),
    amount: v.optional(v.number()), // per revertToSuper(m.amount)
    totalAmount: v.optional(v.number()), // was "totalPrice" — totalServicePrice + extrasPrice
    phone: v.optional(v.string()),
    fullName: v.optional(v.string()),
  })
    .index("by_tech", ["tech"])
    .index("by_userEmail", ["userEmail"])
    .index("by_appointmentDate", ["appointmentDate"])
    .index("by_stripePaymentIntentId", ["stripePaymentIntentId"]),
});
