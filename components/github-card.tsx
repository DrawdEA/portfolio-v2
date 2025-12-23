"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

interface GitHubCardProps {
  username: string
}

export function GitHubCard({ username }: GitHubCardProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Small delay to show loading state
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
        <CardContent className="p-0 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-700 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
      <CardContent className="p-0">
        <div className="mb-3 px-4">
          <p className="text-xs text-gray-400 font-medium">
            Contributions
          </p>
        </div>
        <Link
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block group px-4 pb-4"
        >
          <img
            src={`https://ghchart.rshah.org/409BA5/${username}`}
            alt={`${username}'s GitHub contributions`}
            className="w-full h-auto rounded opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </Link>
      </CardContent>
    </Card>
  )
}

