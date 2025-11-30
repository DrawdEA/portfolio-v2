# Portfolio v2

A modern portfolio website built with Next.js, featuring a blog system with comments, work experience showcase, and personal branding pages.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: Magic UI (primary component library)
- **Animations**: Aceternity UI (for special effects)
- **Styling**: Tailwind CSS
- **Blog**: Markdown/MDX files
- **Comments**: Custom system with Drizzle ORM
- **Database**: PostgreSQL

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
npm install @next/mdx @mdx-js/react remark-gfm rehype-highlight rehype-raw gray-matter date-fns lucide-react drizzle-orm drizzle-kit postgres
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
```

3. Set up the database:
```bash
npm run db:generate
npm run db:push
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Project Structure

```
portfolio-v2/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   │   ├── page.tsx       # Home/Landing page
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   └── resume/
│   ├── api/               # API routes
│   │   └── comments/
│   ├── components/        # React components
│   │   ├── ui/           # Magic UI components
│   │   ├── animations/   # Aceternity UI effects
│   │   ├── blog/
│   │   ├── comments/
│   │   └── layout/
│   └── lib/              # Utilities
├── content/              # Content files
│   └── blog/            # Markdown blog posts
└── lib/                 # Utilities
    └── db/              # Database schema and client
```

## Features

- **Home Page**: Hero section, experience highlights, featured blog posts, skills showcase
- **Blog System**: Markdown/MDX blog posts with syntax highlighting
- **Comments**: Anonymous comments with optional names, nested replies, moderation
- **About Page**: Personal bio, skills, education, social links
- **Contact Page**: Contact form
- **Resume Page**: Resume/CV display

## Adding Blog Posts

Create `.mdx` or `.md` files in the `content/blog/` directory with frontmatter:

```mdx
---
title: "My First Blog Post"
date: "2024-01-01"
excerpt: "A brief description"
tags: ["react", "nextjs"]
---

# My Blog Post

Content goes here...
```

## Database Schema

The comments table stores:
- `id`: Unique identifier
- `postId`: Blog post slug
- `author`: Optional name
- `content`: Comment text
- `parentId`: For nested replies
- `approved`: Moderation flag
- `createdAt` / `updatedAt`: Timestamps

## Next Steps

1. Install Magic UI components
2. Add Aceternity UI animations
3. Customize content and styling
4. Set up email service for contact form
5. Add resume content
6. Deploy to Vercel

## License

MIT
