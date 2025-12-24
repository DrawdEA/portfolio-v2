"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface StravaActivity {
  hasActivity: boolean
  id?: number
  name?: string
  type?: string
  typeIcon?: string
  distanceFormatted?: string
  durationFormatted?: string
  paceFormatted?: string
  elevationFormatted?: string | null
  startDateLocal?: string
  activityUrl?: string
}

export function StravaBentoCard({ className }: { className?: string }) {
  const [activity, setActivity] = useState<StravaActivity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      try {
        console.log('Strava Card: Fetching activity...')
        const response = await fetch('/api/strava/activities')
        const data = await response.json()
        console.log('Strava Card: Received data:', data)
        setActivity(data)
      } catch (error) {
        console.error('Strava Card: Error fetching activity:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
    // Refresh every 5 minutes
    const interval = setInterval(fetchActivity, 300000)
    return () => clearInterval(interval)
  }, [])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-background transform-gpu",
        "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className
      )}
    >
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/strava.jpg"
          alt="Strava background"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 relative z-10">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:translate-y-10">
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            Latest Activity
          </h3>
          {activity?.hasActivity && activity.name ? (
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-4 flex-wrap text-xs">
                {activity.distanceFormatted && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-500">Distance:</span>
                    <span className="text-neutral-400">{activity.distanceFormatted}</span>
                  </div>
                )}
                {activity.durationFormatted && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-500">Time:</span>
                    <span className="text-neutral-400">{activity.durationFormatted}</span>
                  </div>
                )}
                {activity.paceFormatted && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-500">Pace:</span>
                    <span className="text-neutral-400">{activity.paceFormatted}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activity.typeIcon || '🏃'}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-400">{activity.name}</p>
                  <p className="text-xs text-neutral-500">{formatDate(activity.startDateLocal)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="max-w-lg text-neutral-400">No recent activity</p>
          )}
        </div>

        {activity?.activityUrl && (
          <div className="pointer-events-none absolute top-0 left-0 right-0 hidden w-full -translate-y-10 transform-gpu flex-row items-center justify-center py-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
            <Link
              href={activity.activityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors inline-flex items-center"
            >
              Open on Strava
              <ExternalLink className="ms-2 h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center justify-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
          {activity?.activityUrl && (
            <Link
              href={activity.activityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-sm text-neutral-400 hover:text-neutral-300 transition-colors inline-flex items-center"
            >
              Open on Strava
              <ExternalLink className="ms-2 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  )
}

