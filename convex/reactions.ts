import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Fetch all reactions — replaces GET /api/reactions
export const list = query({
  handler: async (ctx) => {
    const reactions = await ctx.db
      .query("reactions")
      .withIndex("by_emoji")
      .collect();

    if (reactions.length === 0) {
      return [{ emoji: "❤️", label: "Love", count: 0 }];
    }

    return reactions.map((r) => ({
      emoji: r.emoji,
      label: getLabel(r.emoji),
      count: r.count,
    }));
  },
});

// Increment a reaction — replaces POST /api/reactions
export const increment = mutation({
  args: { emoji: v.string() },
  handler: async (ctx, { emoji }) => {
    const existing = await ctx.db
      .query("reactions")
      .withIndex("by_emoji", (q) => q.eq("emoji", emoji))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { count: existing.count + 1 });
    } else {
      await ctx.db.insert("reactions", { emoji, count: 1 });
    }
  },
});

function getLabel(emoji: string): string {
  const labels: Record<string, string> = {
    "❤️": "Love",
  };
  return labels[emoji] || "Unknown";
}
