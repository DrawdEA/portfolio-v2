"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function InteractiveReactionCounter({ className }: { className?: string }) {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch('/api/reactions')
        const data = await response.json()
        if (data.reactions) {
          const heart = data.reactions.find((r: { emoji: string }) => r.emoji === "❤️")
          if (heart) {
            setCount(heart.count)
          }
        }
      } catch (error) {
        console.error('Error fetching reactions:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCount()
  }, [])

  const handleClick = async () => {
    // Optimistic update
    setCount((prev) => prev + 1)

    // Update API
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction: "❤️" }),
      })
    } catch (error) {
      console.error('Error updating reaction:', error)
      // Revert on error
      setCount((prev) => prev - 1)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.button
        onClick={handleClick}
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">❤️</span>
        <span className="text-xs text-neutral-400">{isLoading ? "..." : count}</span>
      </motion.button>
    </div>
  )
}
