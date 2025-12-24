"use client"

import { Cloud, ExternalLink } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { IconCloud } from "@/components/ui/icon-cloud"

// Tech stack icons from simpleicons.org
const techStack = [
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "nodejs",
  "tailwindcss",
  "python",
  "git",
  "github",
  "vercel",
  "postgresql",
  "mongodb",
  "docker",
  "figma",
  "vscode",
  "vue",
  "angular",
  "svelte",
  "express",
  "nestjs",
  "graphql",
  "redis",
  "aws",
  "kubernetes",
  "terraform",
  "jest",
  "cypress",
  "webpack",
  "eslint",
  "prettier",
]

// Generate image URLs for IconCloud (using original brand colors)
const techStackImages = techStack.map(
  (slug) => `https://cdn.simpleicons.org/${slug}`
)

export function TechStackIconCloudBentoCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-background transform-gpu",
        "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center -translate-y-8">
        <IconCloud images={techStackImages} />
        {/* Subtle blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A7BC8]/5 to-[#27508F]/5 pointer-events-none" />
      </div>
      <div className="p-4 relative z-10 mt-auto">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <Cloud className="h-12 w-12 origin-left transform-gpu text-[#4A7BC8]/70 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-[#4A7BC8]/90" />
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            Tech Stack
          </h3>
          <p className="max-w-lg text-neutral-400">
            Technologies and tools I work with
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden w-full translate-y-10 transform-gpu flex-row items-center justify-center py-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
          <Link
            href="/tech-stack"
            className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors inline-flex items-center"
          >
            Explore tech stack
            <ExternalLink className="ms-2 h-4 w-4" />
          </Link>
        </div>

        <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
          <Link
            href="/tech-stack"
            className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors inline-flex items-center"
          >
            Explore tech stack
            <ExternalLink className="ms-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  )
}
