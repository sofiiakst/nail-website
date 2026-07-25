import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPedi = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Pedi").collect();
  },
});

export const getPediById = query({
  args: { pediId: v.id("Pedi") },
  handler: async (ctx, { pediId }) => {
    return await ctx.db.get(pediId);
  },
});
