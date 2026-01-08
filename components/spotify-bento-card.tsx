"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SpotifyTrack {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImage?: string
  songUrl?: string
}

export function SpotifyBentoCard({ className }: { className?: string }) {
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

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
    const interval = setInterval(fetchTrack, 30000)
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
        {track?.albumImage && !imageError ? (
          <>
            <div className="absolute inset-0 opacity-50 group-hover:opacity-40 transition-opacity">
              <Image
                src={track.albumImage}
                alt={track.album || 'Album cover'}
                fill
                className="object-cover blur-[2px] group-hover:blur-none transition-all"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 group-hover:opacity-40 transition-opacity" />
        )}
      </div>
      <div className="p-4 relative z-10">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            {isLoading 
              ? "Loading..." 
              : track?.isPlaying 
                ? "Now Playing" 
                : track?.title 
                  ? "Last Played" 
                  : "No recent activity"}
          </h3>
          {track?.title ? (
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-400">{track.title}</p>
              <p className="text-xs text-neutral-500">{track.artist}</p>
            </div>
          ) : (
            <p className="max-w-lg text-neutral-400">No recent activity</p>
          )}
        </div>

        {track?.songUrl && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden w-full translate-y-10 transform-gpu flex-row items-center justify-center py-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
            <Link
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center"
            >
              Open on Spotify
              <ExternalLink className="ms-2 h-4 w-4 text-current" />
            </Link>
          </div>
        )}

        <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
          {track?.songUrl && (
            <Link
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors underline-offset-4 hover:underline inline-flex items-center"
            >
              Open on Spotify
              <ExternalLink className="ms-2 h-4 w-4 text-current" />
            </Link>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  )
}

