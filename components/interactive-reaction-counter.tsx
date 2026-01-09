"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export function InteractiveReactionCounter({ className }: { className?: string }) {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

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
    // Check if already reacted today
    const lastReactionDate = localStorage.getItem('lastReactionDate')
    const today = new Date().toDateString()
    
    if (lastReactionDate === today) {
      // Show message and don't update
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
      return
    }

    // Optimistic update
    setCount((prev) => prev + 1)
    localStorage.setItem('lastReactionDate', today)

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
      localStorage.removeItem('lastReactionDate')
    }
  }

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      <motion.button
        onClick={handleClick}
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">❤️</span>
        <span className="text-xs text-neutral-400">{isLoading ? "..." : count}</span>
      </motion.button>
      
      {/* Message - to the left */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 pointer-events-none z-30">
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-neutral-400 whitespace-nowrap"
            >
              Only one react per day!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
