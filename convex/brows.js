import { query } from "./_generated/server";

export const getBrows = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Brows").collect();
  },
});
