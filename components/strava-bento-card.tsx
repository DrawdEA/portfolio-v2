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
  const [imageError, setImageError] = useState(false)

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
      <div>
        {!imageError ? (
          <>
            <div className="absolute inset-0 opacity-30 group-hover:opacity-25 transition-opacity">
              <Image
                src="/strava.jpg"
                alt="Strava background"
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50 group-hover:opacity-40 transition-opacity" />
        )}
      </div>
      <div className="p-4 relative z-10">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            {isLoading 
              ? "Loading..." 
              : activity?.hasActivity 
                ? "Latest Activity" 
                : "No recent activity"}
          </h3>
          {activity?.hasActivity && activity.name ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {activity.typeIcon && (
                  <span className="text-lg">{activity.typeIcon}</span>
                )}
                <p className="text-sm font-medium text-neutral-400">{activity.name}</p>
              </div>
              <p className="text-xs text-neutral-500">
                {activity.distanceFormatted && `${activity.distanceFormatted} • `}
                {activity.durationFormatted && `${activity.durationFormatted} • `}
                {activity.paceFormatted || formatDate(activity.startDateLocal)}
              </p>
            </div>
          ) : (
            <p className="max-w-lg text-neutral-400">No recent activity</p>
          )}
        </div>

        {activity?.activityUrl && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden w-full translate-y-10 transform-gpu flex-row items-center justify-center py-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
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

        <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
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

