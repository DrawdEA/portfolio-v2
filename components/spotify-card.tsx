"use client"

import { useEffect, useState } from "react"
import { CardContent } from "@/components/ui/card"
import { MagicCard } from "@/components/ui/magic-card"
import { Music2, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface SpotifyTrack {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImage?: string
  songUrl?: string
}

export function SpotifyCard() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTrack() {
      try {
        const response = await fetch('/api/spotify/now-playing')
        const data = await response.json()
        setTrack(data)
      } catch (error) {
        console.error('Error fetching track:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrack()
    // Refresh every 30 seconds
    const interval = setInterval(fetchTrack, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <MagicCard gradientFrom="#4A7BC8" gradientTo="#27508F" className="bg-white/5 border border-white/10 rounded-xl">
        <CardContent className="p-0 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-700 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </MagicCard>
    )
  }

  if (!track || !track.title) {
    return (
      <MagicCard gradientFrom="#4A7BC8" gradientTo="#27508F" className="bg-white/5 border border-white/10 rounded-xl">
        <CardContent className="p-0 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-700 rounded flex items-center justify-center">
              <Music2 className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Not playing</p>
              <p className="text-xs text-gray-500 mt-1">No recent activity</p>
            </div>
          </div>
        </CardContent>
      </MagicCard>
    )
  }

  return (
    <MagicCard gradientFrom="#4A7BC8" gradientTo="#27508F" className="bg-white/5 border border-white/10 rounded-xl p-4">
      <CardContent className="p-0">
        <div className="mb-3 px-4">
          <p className="text-xs text-gray-400 font-medium">
            {track.isPlaying ? 'Now Playing' : 'Last Played'}
          </p>
        </div>
        <Link
          href={track.songUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 group px-4 pb-4"
        >
          {track.albumImage ? (
            <Image
              src={track.albumImage}
              alt={track.album || 'Album cover'}
              width={64}
              height={64}
              className="rounded"
            />
          ) : (
            <div className="h-16 w-16 bg-gray-700 rounded flex items-center justify-center">
              <Music2 className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-medium text-white truncate">
                {track.title}
              </p>
              {track.isPlaying && (
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {track.album}
            </p>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors shrink-0" />
        </Link>
      </CardContent>
    </MagicCard>
  )
}

