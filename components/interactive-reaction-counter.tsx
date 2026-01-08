"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface Reaction {
  emoji: string
  label: string
  count: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  emoji: string
}

export function InteractiveReactionCounter({ className }: { className?: string }) {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: "❤️", label: "Love", count: 0 },
  ])
  const [particles, setParticles] = useState<Particle[]>([])
  const [totalReactions, setTotalReactions] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasReactedToday, setHasReactedToday] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user has already reacted today
    const checkReactionStatus = () => {
      const lastReactionDate = localStorage.getItem('lastReactionDate')
      const today = new Date().toDateString()
      
      if (lastReactionDate === today) {
        setHasReactedToday(true)
      }
    }

    checkReactionStatus()

    async function fetchReactions() {
      try {
        const response = await fetch('/api/reactions')
        const data = await response.json()
        if (data.reactions) {
          // Only show heart emoji - filter out everything else
          const heartReaction = data.reactions.find((r: Reaction) => r.emoji === "❤️")
          if (heartReaction) {
            setReactions([heartReaction])
            setTotalReactions(heartReaction.count)
          } else {
            // If API doesn't have heart, initialize with 0
            setReactions([{ emoji: "❤️", label: "Love", count: 0 }])
            setTotalReactions(0)
          }
        } else {
          // Fallback: only show heart
          setReactions([{ emoji: "❤️", label: "Love", count: 0 }])
          setTotalReactions(0)
        }
      } catch (error) {
        console.error('Error fetching reactions:', error)
        // Fallback: only show heart
        setReactions([{ emoji: "❤️", label: "Love", count: 0 }])
        setTotalReactions(0)
      } finally {
        setIsLoading(false)
      }
    }
    fetchReactions()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.filter((p) => p.life > 0).map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 1,
      })))
    }, 16)
    return () => clearInterval(interval)
  }, [])

  const handleReaction = async (reactionIndex: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const reaction = reactions[reactionIndex]
    
    // Get button center position relative to container
    const containerRect = containerRef.current?.getBoundingClientRect()
    const button = event.currentTarget
    const buttonRect = button.getBoundingClientRect()
    
    // Always create particles for visual feedback
    const newParticles: Particle[] = []
    if (containerRect && buttonRect) {
      // Calculate the center of the button relative to the container
      // Use the button's actual center coordinates
      const buttonCenterX = (buttonRect.left + buttonRect.right) / 2 - containerRect.left
      const buttonCenterY = (buttonRect.top + buttonRect.bottom) / 2 - containerRect.top
      
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: buttonCenterX,
          y: buttonCenterY,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8 - 2,
          life: 60,
          emoji: reaction.emoji,
        })
      }
    }
    setParticles((prev) => [...prev, ...newParticles])

    // Check if user has already reacted today
    const lastReactionDate = localStorage.getItem('lastReactionDate')
    const today = new Date().toDateString()
    
    if (lastReactionDate === today) {
      // Show message and don't update count
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
      return
    }

    // Update reaction count
    const updatedReactions = [...reactions]
    updatedReactions[reactionIndex] = {
      ...reaction,
      count: reaction.count + 1,
    }
    setReactions(updatedReactions)
    setTotalReactions((prev) => prev + 1)

    // Mark as reacted today
    localStorage.setItem('lastReactionDate', today)
    setHasReactedToday(true)

    // Send to API
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction: reaction.emoji }),
      })
    } catch (error) {
      console.error('Error updating reaction:', error)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex items-center gap-2 overflow-visible",
        className
      )}
    >
      {/* Particles overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-lg pointer-events-none"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: particle.life / 60,
              scale: 0.5 + (particle.life / 60) * 0.5,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center gap-3">
        {reactions.map((reaction, index) => (
          <div key={reaction.emoji} className="relative flex items-center">
            <motion.button
              onClick={(e) => handleReaction(index, e)}
              className="relative flex items-center gap-1.5 transition-all hover:scale-110"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{reaction.emoji}</span>
              <span className="text-xs text-neutral-400">{reaction.count}</span>
            </motion.button>
            {/* Message in separate absolutely positioned container to avoid layout shifts */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 pointer-events-none z-30">
              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-neutral-400 whitespace-nowrap"
                  >
                    Thank you for the support! Only one react per person!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

