import { query } from "./_generated/server";

export const getExtras = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Extras").collect();
  },
});
