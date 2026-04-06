import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Reactions table — migrated from Supabase
  reactions: defineTable({
    emoji: v.string(),
    count: v.number(),
  }).index("by_emoji", ["emoji"]),

  // Documents table for RAG embeddings
  // Each row is a chunk of text from content/eddy/ with its vector embedding.
  documents: defineTable({
    content: v.string(),
    source: v.string(), // filename the chunk came from
    chunkIndex: v.number(),
    embedding: v.array(v.float64()), // 3072-dim Gemini embedding
  }).vectorIndex("by_embedding", {
    // Convex vector search: automatically indexes this field for similarity search
    vectorField: "embedding",
    dimensions: 3072,
    // You can filter results by these fields during search
    filterFields: ["source"],
  }),
});
