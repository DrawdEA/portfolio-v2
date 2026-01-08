"use client"

import Link from "next/link"
import { Cloud, ArrowRight } from "lucide-react"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { IconCloud } from "@/components/ui/icon-cloud"

// Generate image URLs for IconCloud (using original brand colors)
// Note: Some icons might not exist on simpleicons.org (e.g., "rest", "cursor")
function getTechStackImages(iconSlugs: string[]) {
  return iconSlugs
    .filter(slug => slug && slug.trim().length > 0) // Filter out empty slugs
    .map((slug) => `https://cdn.simpleicons.org/${slug}`)
}

export function TechStackIconCloudBentoCard({ 
  className,
  iconSlugs = []
}: { 
  className?: string
  iconSlugs?: string[]
}) {
  // Memoize the images array to prevent unnecessary re-renders
  const techStackImages = useMemo(() => getTechStackImages(iconSlugs), [iconSlugs])
  return (
    <Link
      href="/tech-stack"
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-background transform-gpu",
        "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        "cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-[140%] -top-[20%] flex items-center justify-center translate-y-8">
          <IconCloud images={techStackImages} />
          {/* Subtle blue gradient overlay - covers expanded area */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/5 to-[#1e3a8a]/5 pointer-events-none" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
      </div>
      <div className="p-4 relative z-10 mt-auto">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <Cloud className="h-12 w-12 origin-left transform-gpu text-[#1e3a8a]/70 transition-all duration-300 ease-in-out group-hover:scale-75" />
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            Tech Stack
          </h3>
          <p className="max-w-lg text-neutral-400">
            Technologies and tools I work with
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden w-full translate-y-10 transform-gpu flex-row items-center justify-center py-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
          <span className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center">
            Explore tech stack
            <ArrowRight className="ms-2 h-4 w-4 text-neutral-400" />
          </span>
        </div>

        <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
          <span className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center">
            Explore tech stack
            <ArrowRight className="ms-2 h-4 w-4 text-neutral-400" />
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </Link>
  )
}
