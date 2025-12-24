"use client"

import { Cloud, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
]

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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {techStack.map((slug, index) => {
            const angle = (index / techStack.length) * Math.PI * 2
            const radius = 40
            const x = 50 + radius * Math.cos(angle)
            const y = 50 + radius * Math.sin(angle)
            
            return (
              <div
                key={slug}
                className="absolute opacity-35 group-hover:opacity-55 transition-opacity animate-pulse"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <Image
                  src={`https://cdn.simpleicons.org/${slug}/4A7BC8`}
                  alt={slug}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
            )
          })}
        </div>
        {/* Subtle blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A7BC8]/5 to-[#27508F]/5 pointer-events-none" />
      </div>
      <div className="p-4 relative z-10">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <Cloud className="h-12 w-12 origin-left transform-gpu text-[#4A7BC8]/70 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-[#4A7BC8]/90" />
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            Tech Stack
          </h3>
          <p className="max-w-lg text-neutral-400">
            Technologies and tools I work with
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
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
