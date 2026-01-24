"use client"

import Link from "next/link"
import { Cloud, ArrowRight } from "lucide-react"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
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
  const router = useRouter()
  // Memoize the images array to prevent unnecessary re-renders
  const techStackImages = useMemo(() => getTechStackImages(iconSlugs), [iconSlugs])

  const handleCardClick = (e: React.MouseEvent) => {
    // Only handle clicks on mobile (< 1024px)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      e.preventDefault()
      e.stopPropagation()
      router.push('/tech-stack')
    }
  }

  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles - dark gray instead of blue
        "dark:bg-neutral-900 transform-gpu dark:[box-shadow:0_-20px_80px_-20px_rgba(26,26,26,0.2)_inset] dark:[border:1px_solid_rgba(64,64,64,.4)]",
        "cursor-pointer lg:cursor-default",
        className
      )}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 group-hover:opacity-40 transition-opacity" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-[140%] -top-[20%] flex items-center justify-center translate-y-8">
          <IconCloud images={techStackImages} />
        </div>
        <div className="absolute inset-0 bg-gray-800/0 group-hover:bg-gray-800/20 transition-colors pointer-events-none" />
      </div>
      <div className="p-4 relative z-10 mt-auto">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <Cloud className="h-12 w-12 origin-left transform-gpu text-neutral-400 transition-all duration-300 ease-in-out group-hover:scale-75" />
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
            className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center"
          >
            Explore tech stack
            <ArrowRight className="ms-2 h-4 w-4 text-current" />
          </Link>
        </div>

        {/* Mobile button - hidden on all screens */}
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-gray-800/[.03] group-hover:dark:bg-gray-800/10" />
    </div>
  )
}
