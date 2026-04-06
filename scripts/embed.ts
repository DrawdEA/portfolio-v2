/**
 * RAG Embedding Script for Eddy Chatbot
 *
 * This script reads markdown documents from content/, splits them into
 * chunks, generates embeddings via Google Gemini, and stores them in Convex.
 *
 * HOW RAG WORKS (high-level):
 * 1. EMBED phase (this script): Documents -> chunks -> vector embeddings -> stored in Convex
 * 2. QUERY phase (API route): User question -> embed question -> find similar
 *    chunks via Convex vector search -> feed those chunks as context to Gemini -> answer
 *
 * Run: npx tsx scripts/embed.ts
 *
 * Required env vars: GEMINI_API_KEY, CONVEX_URL (the deployment URL, not NEXT_PUBLIC_)
 */

import fs from "fs";
import path from "path";
import { ConvexHttpClient } from "convex/browser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { api } from "../convex/_generated/api";

// ---------------------------------------------------------------------------
// 1. CONFIGURATION
// ---------------------------------------------------------------------------

const CHUNK_SIZE = 500; // Target characters per chunk
const CHUNK_OVERLAP = 100; // Characters of overlap between chunks

// All content directories and files to embed
const CONTENT_ROOT = path.join(process.cwd(), "content");
const CONTENT_DIRS = ["eddy", "blog", "projects"];
const CONTENT_FILES = [
  "experience.md",
  "certifications.md",
  "hackathons.md",
  "orgwork.md",
  "tech-stack.md",
];

// ---------------------------------------------------------------------------
// 2. INITIALIZE CLIENTS
// ---------------------------------------------------------------------------

// ConvexHttpClient is for server-side scripts (no WebSocket, just HTTP requests).
// Different from ConvexReactClient which is for React components.
const convex = new ConvexHttpClient(process.env.CONVEX_URL!);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ---------------------------------------------------------------------------
// 3. CHUNKING — splitting documents into smaller pieces
// ---------------------------------------------------------------------------

/**
 * Why chunk?
 * - Embeddings work best on focused, paragraph-sized text (~200-600 chars).
 * - Smaller chunks = more precise similarity search results.
 * - Overlap prevents losing context that spans a chunk boundary.
 */
interface DocumentChunk {
  content: string;
  source: string;
  chunkIndex: number;
}

function chunkDocument(text: string, source: string): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = "";
  let chunkIndex = 0;

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;

    if (currentChunk.length + trimmed.length > CHUNK_SIZE && currentChunk.length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        source,
        chunkIndex: chunkIndex++,
      });

      // Start new chunk with overlap from the end of the previous chunk
      const overlapText = currentChunk.slice(-CHUNK_OVERLAP);
      currentChunk = overlapText + "\n\n" + trimmed;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + trimmed;
    }
  }

  if (currentChunk.trim()) {
    chunks.push({
      content: currentChunk.trim(),
      source,
      chunkIndex: chunkIndex,
    });
  }

  return chunks;
}

// ---------------------------------------------------------------------------
// 4. EMBEDDING — turning text into vectors using Gemini
// ---------------------------------------------------------------------------

/**
 * Why embeddings?
 * - Text is unstructured. Vectors let us compute mathematical similarity.
 * - Gemini's gemini-embedding-001 produces a 3072-dimensional vector.
 * - Similar meanings -> vectors that are close together (high cosine similarity).
 */
async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i++) {
    console.log(`  Embedding chunk ${i + 1}/${texts.length}...`);
    const result = await model.embedContent(texts[i]);
    allEmbeddings.push(result.embedding.values);
  }

  return allEmbeddings;
}

// ---------------------------------------------------------------------------
// 5. MAIN — orchestrate the full pipeline
// ---------------------------------------------------------------------------

async function main() {
  console.log("🤖 Eddy RAG Embedding Script (Convex + Gemini)\n");

  // --- Step 1: Collect all markdown files from content dirs + standalone files ---
  console.log(`📂 Reading documents from ${CONTENT_ROOT}...`);

  const filesToEmbed: { filePath: string; source: string }[] = [];

  // Gather files from subdirectories (eddy/, blog/, projects/)
  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(CONTENT_ROOT, dir);
    if (!fs.existsSync(dirPath)) continue;
    const mdFiles = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
    for (const file of mdFiles) {
      filesToEmbed.push({
        filePath: path.join(dirPath, file),
        source: `${dir}/${file}`,
      });
    }
  }

  // Gather standalone files (experience.md, etc.)
  for (const file of CONTENT_FILES) {
    const filePath = path.join(CONTENT_ROOT, file);
    if (!fs.existsSync(filePath)) continue;
    filesToEmbed.push({ filePath, source: file });
  }

  if (filesToEmbed.length === 0) {
    console.error("❌ No .md files found in content/");
    process.exit(1);
  }

  console.log(`   Found ${filesToEmbed.length} files: ${filesToEmbed.map((f) => f.source).join(", ")}\n`);

  // --- Step 2: Chunk all documents ---
  console.log("✂️  Chunking documents...");
  const allChunks: DocumentChunk[] = [];

  for (const { filePath, source } of filesToEmbed) {
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkDocument(content, source);
    allChunks.push(...chunks);
    console.log(`   ${source}: ${chunks.length} chunks`);
  }

  console.log(`   Total: ${allChunks.length} chunks\n`);

  // --- Step 3: Generate embeddings ---
  console.log("🧠 Generating embeddings with Gemini...");
  const texts = allChunks.map((c) => c.content);
  const embeddings = await generateEmbeddings(texts);
  console.log(`   Generated ${embeddings.length} embeddings\n`);

  // --- Step 4: Clear old documents and insert new ones ---
  console.log("💾 Upserting to Convex...");

  const deletedCount = await convex.mutation(api.documents.clear);
  console.log(`   Cleared ${deletedCount} old documents`);

  // Insert each chunk with its embedding
  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    await convex.mutation(api.documents.insert, {
      content: chunk.content,
      source: chunk.source,
      chunkIndex: chunk.chunkIndex,
      embedding: embeddings[i],
    });
  }

  console.log(`   Inserted ${allChunks.length} document chunks\n`);
  console.log("✅ Done! Eddy's knowledge base is ready.");
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
