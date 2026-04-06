<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->

## Project Overview

Next.js 16 portfolio site for Edward Joshua Diesta. App Router, TypeScript, Tailwind CSS v4, shadcn/ui.

## Backend: Convex

All backend logic lives in `convex/`. No Supabase — fully migrated to Convex.

- `convex/schema.ts` — defines `reactions` and `documents` tables
- `convex/reactions.ts` — `list` query + `increment` mutation for the heart reaction counter
- `convex/documents.ts` — RAG document storage + vector search (`insert`, `clear`, `search`, `getById`)
- `components/convex-provider.tsx` — wraps the app in `app/layout.tsx`

## Eddy RAG Chatbot (in progress)

A chatbot that answers questions about Edward using RAG (Retrieval-Augmented Generation).

**Stack:** Convex vector search + OpenAI embeddings (text-embedding-3-small, 1536 dims) + GPT-4o

**Knowledge base:** Markdown files in `content/eddy/` (bio, projects, skills, hackathons, organizations). These get chunked and embedded into the `documents` table.

**Embedding script:** `scripts/embed.ts` — reads content/eddy/, chunks text, generates embeddings via OpenAI, stores in Convex. Run with `npx tsx scripts/embed.ts`. Requires `OPENAI_API_KEY` and `CONVEX_URL` env vars.

**Still TODO:**
- Chat API route (`/api/chat`) — embed user question, vector search for relevant chunks, send to GPT-4o with context
- Chat UI component for the portfolio site

## Content

Markdown-based content in `content/`:
- `blog/` — blog posts
- `projects/` — project writeups
- `eddy/` — RAG knowledge base documents about Edward
- `experience.md`, `certifications.md`, `hackathons.md`, `orgwork.md`, `tech-stack.md` — structured data in frontmatter
