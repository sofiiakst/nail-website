import { query } from "./_generated/server";
export const getTech = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Tech").collect();
  },
});
