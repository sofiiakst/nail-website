import { query } from "./_generated/server";

export const getLashes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Lashes").collect();
  },
});
