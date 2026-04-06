import { mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// ---------------------------------------------------------------------------
// MUTATIONS — direct database operations (called by actions or the embed script)
// ---------------------------------------------------------------------------

// Insert a single document chunk with its embedding
export const insert = mutation({
  args: {
    content: v.string(),
    source: v.string(),
    chunkIndex: v.number(),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("documents", args);
  },
});

// Clear all documents (used before re-embedding)
export const clear = mutation({
  handler: async (ctx) => {
    const docs = await ctx.db.query("documents").collect();
    for (const doc of docs) {
      await ctx.db.delete(doc._id);
    }
    return docs.length;
  },
});

// ---------------------------------------------------------------------------
// ACTIONS — can call external APIs (OpenAI) + internal mutations/queries
// ---------------------------------------------------------------------------

/**
 * Vector search: find the most relevant document chunks for a query.
 *
 * HOW THIS WORKS:
 * 1. Takes a pre-computed query embedding (the API route will generate this)
 * 2. Uses Convex's built-in vector search to find similar chunks
 * 3. Returns the top matches with their content and source
 *
 * Why an action and not a query?
 * - Convex vector search is only available inside actions via ctx.vectorSearch()
 */
export const search = action({
  args: {
    queryEmbedding: v.array(v.float64()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { queryEmbedding, limit }): Promise<{ content: string; source: string; score: number }[]> => {
    // Convex vector search returns results sorted by similarity (most similar first)
    const results = await ctx.vectorSearch("documents", "by_embedding", {
      vector: queryEmbedding,
      limit: limit ?? 5,
    });

    // Vector search returns IDs + scores — fetch the full documents
    const docs = await Promise.all(
      results.map(async (result) => {
        const doc = await ctx.runQuery(api.documents.getById, { id: result._id });
        return {
          content: doc?.content ?? "",
          source: doc?.source ?? "",
          score: result._score,
        };
      })
    );

    return docs;
  },
});

// Helper query to fetch a document by ID (used by the search action above)
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});
