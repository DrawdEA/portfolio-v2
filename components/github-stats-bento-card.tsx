"use client"

import { useEffect, useState } from "react"
import { BarChart3, ExternalLink, Github, Star, Users, Code } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface GitHubStats {
  username: string
  name?: string
  bio?: string
  avatar?: string
  followers: number
  following: number
  publicRepos: number
  totalStars: number
  topLanguages: string[]
  profileUrl: string
}

export function GitHubStatsBentoCard({ className }: { className?: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/github/stats')
        const data = await response.json()
        if (!data.error) {
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
    // Refresh every 5 minutes
    const interval = setInterval(fetchStats, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-background transform-gpu",
        "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className
      )}
    >
      <div>
        {stats?.avatar && (
          <>
            <div className="absolute inset-0 opacity-30 group-hover:opacity-25 transition-opacity">
              <Image
                src={stats.avatar}
                alt={stats.name || stats.username}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
          </>
        )}
      </div>
      <div className="p-4 relative z-10">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <Github className="h-12 w-12 origin-left transform-gpu text-[#4A7BC8]/70 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-[#4A7BC8]/90" />
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            GitHub Stats
          </h3>
          {isLoading ? (
            <p className="max-w-lg text-neutral-400">Loading stats...</p>
          ) : stats ? (
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Code className="h-4 w-4 text-[#4A7BC8]" />
                  <span className="text-sm text-neutral-400">{stats.publicRepos}</span>
                  <span className="text-xs text-neutral-500">repos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-[#4A7BC8]" />
                  <span className="text-sm text-neutral-400">{stats.totalStars}</span>
                  <span className="text-xs text-neutral-500">stars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#4A7BC8]" />
                  <span className="text-sm text-neutral-400">{stats.followers}</span>
                  <span className="text-xs text-neutral-500">followers</span>
                </div>
              </div>
              {stats.topLanguages.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-neutral-500">Top languages:</span>
                  {stats.topLanguages.map((lang, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {lang}
                    </span>
                  ))}
                </div>
              )}
              {stats.username && (
                <div className="mt-3 pt-3 border-t border-neutral-800">
                  <div className="w-full h-16 overflow-hidden rounded opacity-60 group-hover:opacity-80 transition-opacity">
                    <img
                      src={`https://ghchart.rshah.org/409BA5/${stats.username}`}
                      alt={`${stats.username}'s GitHub contributions`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="max-w-lg text-neutral-400">Unable to load stats</p>
          )}
        </div>

        {stats?.profileUrl && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden w-full translate-y-10 transform-gpu flex-row items-center justify-center py-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
            <Link
              href={stats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors inline-flex items-center"
            >
              View on GitHub
              <ExternalLink className="ms-2 h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center justify-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
          {stats?.profileUrl && (
            <Link
              href={stats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors inline-flex items-center"
            >
              View on GitHub
              <ExternalLink className="ms-2 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  )
}

