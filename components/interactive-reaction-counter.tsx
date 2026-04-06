"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"

export function InteractiveReactionCounter({ className }: { className?: string }) {
  // Convex queries are reactive — the count updates in real-time across all visitors
  const reactions = useQuery(api.reactions.list)
  const incrementReaction = useMutation(api.reactions.increment)
  const [showMessage, setShowMessage] = useState(false)

  const heartReaction = reactions?.find((r) => r.emoji === "❤️")
  const count = heartReaction?.count ?? 0
  const isLoading = reactions === undefined

  const handleClick = async () => {
    const lastReactionDate = localStorage.getItem('lastReactionDate')
    const today = new Date().toDateString()

    if (lastReactionDate === today) {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
      return
    }

    localStorage.setItem('lastReactionDate', today)

    try {
      await incrementReaction({ emoji: "❤️" })
    } catch (error) {
      console.error('Error updating reaction:', error)
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
