import { query } from "./_generated/server";
import { v } from "convex/values";

export const getMani = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Mani").collect();
  },
});

export const getManiById = query({
  args: { maniId: v.id("Mani") },
  handler: async (ctx, { maniId }) => {
    return await ctx.db.get(maniId);
  },
});
