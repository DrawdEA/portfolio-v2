# Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install @next/mdx @mdx-js/react remark-gfm rehype-highlight rehype-raw gray-matter date-fns lucide-react drizzle-orm drizzle-kit postgres @paralleldrive/cuid2
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
   NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
   ```

3. **Database Setup**
   ```bash
   # Generate migration files
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Next Steps

### 1. Add Magic UI Components
- Visit [Magic UI](https://magicui.design) and install components you want to use
- Copy components to `app/components/ui/`
- Update imports in your pages

### 2. Add Aceternity UI Animations
- Visit [Aceternity UI](https://ui.aceternity.com) 
- Copy animation components to `app/components/animations/`
- Integrate into your pages for special effects

### 3. Customize Content
- Update `app/page.tsx` with your personal information
- Add your work experience to `app/about/page.tsx`
- Update contact information in `app/contact/page.tsx`
- Add your resume content to `app/resume/page.tsx`

### 4. Add Blog Posts
- Create `.mdx` or `.md` files in `content/blog/`
- Use frontmatter for metadata:
  ```mdx
  ---
  title: "Post Title"
  date: "2024-01-01"
  excerpt: "Brief description"
  tags: ["tag1", "tag2"]
  ---
  ```

### 5. Set Up Email Service (Optional)
- For the contact form, integrate with:
  - [Resend](https://resend.com)
  - [Formspree](https://formspree.io)
  - Or your preferred email service

### 6. Deploy
- Deploy to [Vercel](https://vercel.com) (recommended for Next.js)
- Set environment variables in your deployment platform
- Update `NEXT_PUBLIC_SITE_URL` with your actual domain

## Notes

- Comments require moderation - you'll need to manually approve them in the database
- MDX rendering is currently basic - install `@mdx-js/mdx` or `next-mdx-remote` for full MDX support
- Dark mode is supported via system preference
- All pages are responsive and mobile-friendly

