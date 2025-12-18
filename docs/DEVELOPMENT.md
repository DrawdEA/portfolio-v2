# Portfolio Development Reference

This document serves as a reference guide for AI assistants and developers working on this portfolio project.

## Project Overview

This is a modern portfolio website built with Next.js, featuring a dark theme design with animated elements. The portfolio showcases work experience, projects, blog posts, and personal information.

## Tech Stack

### Core Framework & Language
- **Next.js** 16.0.7 (React framework with App Router)
- **React** 19.2.0
- **TypeScript** 5
- **React Compiler** (enabled in `next.config.ts`)

### Styling & UI
- **Tailwind CSS** 4 (with PostCSS)
- **Radix UI** - Comprehensive component library (shadcn/ui style)
- **MagicUI** - Animated UI components (configured in `components.json`)
  - Currently using: `LightRays` component for animated background effects
- **Lucide React** 0.556.0 - Icon library

### Animation & Motion
- **Motion** 12.23.25 (formerly Framer Motion) - Animation library
- **tw-animate-css** 1.4.0 - Tailwind animation utilities

### Form Handling & Validation
- **React Hook Form** 7.68.0
- **Zod** 4.1.13 - Schema validation
- **@hookform/resolvers** 5.2.2

### Additional Libraries
- **class-variance-authority** 0.7.1 - Component variant management
- **clsx** & **tailwind-merge** - ClassName utilities
- **cmdk** 1.1.1 - Command menu component
- **date-fns** 4.1.0 - Date utilities
- **embla-carousel-react** 8.6.0 - Carousel component
- **input-otp** 1.4.2 - OTP input component
- **next-themes** 0.4.6 - Theme management
- **react-day-picker** 9.12.0 - Date picker
- **react-resizable-panels** 3.0.6 - Resizable panels
- **recharts** 2.15.4 - Chart library
- **sonner** 2.0.7 - Toast notifications
- **vaul** 1.1.2 - Drawer component

### Development Tools
- **ESLint** 9 (with Next.js config)
- **Babel Plugin React Compiler** 1.0.0

## Project Structure

```
portfolio-v2/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Home page (hero section)
│   ├── globals.css        # Global styles and Tailwind config
│   └── favicon.ico
├── components/
│   ├── portfolio-dock.tsx # Main navigation dock component
│   └── ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── dock.tsx       # Dock navigation component
│       ├── light-rays.tsx # MagicUI animated background
│       └── ...            # Other UI components
├── hooks/
│   └── use-mobile.ts      # Mobile detection hook
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
├── public/                # Static assets
├── docs/                  # Documentation (this folder)
├── components.json        # shadcn/ui + MagicUI configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies

```

## Key Components

### PortfolioDock (`components/portfolio-dock.tsx`)
- Fixed bottom navigation dock with icons
- Contains navigation links (Home, Projects, Blog, Resume)
- Social media links (GitHub, LinkedIn, Email)
- Uses Radix UI Dock component with tooltips
- Configured with navigation and contact data in `DATA` object

### LightRays (`components/ui/light-rays.tsx`)
- MagicUI component for animated background light rays
- Used in hero section for visual effect
- Configurable: color, count, speed, length, blur
- Uses Motion library for animations

### Home Page (`app/page.tsx`)
- Hero section with introduction
- Social media buttons (GitHub, LinkedIn, Instagram, CV, Contact)
- LightRays background effect
- PortfolioDock navigation at bottom

## Design System

### Theme
- **Dark theme** - Black background (`bg-black`)
- **Color scheme**: White text on black with gray accents
- **Transparency**: Uses `white/5`, `white/10`, `white/20` for subtle overlays
- **Fonts**: 
  - Inter (sans-serif) - Primary font
  - JetBrains Mono (monospace) - Code/mono font

### Component Styling Patterns
- Buttons: `bg-transparent border-white/20 hover:bg-white/10`
- Cards: `bg-white/5 border-white/10 hover:bg-white/10`
- Text colors: `text-white`, `text-gray-400`, `text-gray-500`
- Spacing: Consistent use of Tailwind spacing scale

## Configuration Files

### `components.json`
- shadcn/ui configuration
- MagicUI registry: `@magicui: https://magicui.design/r/{name}.json`
- Style: "new-york"
- RSC: true (React Server Components enabled)
- Path aliases configured: `@/components`, `@/lib`, `@/hooks`

### `next.config.ts`
- React Compiler enabled
- TypeScript configuration

### `tsconfig.json`
- Path aliases: `@/*` maps to `./*`
- Strict mode enabled
- React JSX transform

## Development Guidelines

### Adding New Components
1. Use shadcn/ui CLI for standard components: `npx shadcn@latest add [component]`
2. Use MagicUI CLI for animated components: `npx magicui@latest add [component]`
3. Components should be placed in `components/ui/` for reusable UI components
4. Page-specific components can go in `components/`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow existing dark theme patterns
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Maintain consistent spacing and sizing

### Component Patterns
- Use TypeScript for all components
- Prefer React Server Components when possible
- Use "use client" directive only when needed (interactivity, hooks, browser APIs)
- Follow shadcn/ui component patterns

### Navigation Structure
- Main navigation: Home, Projects, Blog, Resume (in PortfolioDock)
- Social links: GitHub, LinkedIn, Email (in PortfolioDock)
- Additional links: Instagram, CV download, Contact page

## Current Features

### Implemented
- ✅ Hero section with introduction
- ✅ Social media links
- ✅ Fixed bottom navigation dock
- ✅ Animated LightRays background
- ✅ Dark theme design system
- ✅ Responsive layout

### Planned Sections (from user requirements)
- 📝 General information / About section
- 💼 Work experience section
- 📖 Blog intro section
- 🔗 Footer section

## Important Notes

1. **React Compiler**: Enabled in Next.js config - be aware of compiler optimizations
2. **MagicUI**: Components are added via CLI and stored in `components/ui/`
3. **Path Aliases**: Always use `@/` prefix for imports (e.g., `@/components/ui/button`)
4. **Dark Theme**: The entire site uses a dark theme - maintain consistency
5. **Responsive Design**: Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) for mobile-first design
6. **Accessibility**: Include proper ARIA labels on interactive elements
7. **Social Links**: Currently using placeholder URLs - update with actual links

## Common Commands

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint

# Adding Components
npx shadcn@latest add [component]    # Add shadcn/ui component
npx magicui@latest add [component]   # Add MagicUI component
```

## Future Development Considerations

- Consider adding a blog system (MDX, Contentful, or similar)
- Add project showcase section
- Implement contact form
- Add analytics tracking
- Consider adding a CMS for content management
- SEO optimization for metadata
- Performance optimization (image optimization, lazy loading)

---

**Last Updated**: December 2024
**Project Owner**: Edward
**Framework**: Next.js 16 with App Router

