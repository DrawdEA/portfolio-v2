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
    { emoji: "👍", label: "Like", count: 0 },
    { emoji: "❤️", label: "Love", count: 0 },
    { emoji: "🎉", label: "Celebrate", count: 0 },
    { emoji: "🔥", label: "Fire", count: 0 },
    { emoji: "🚀", label: "Rocket", count: 0 },
    { emoji: "💯", label: "Perfect", count: 0 },
  ])
  const [particles, setParticles] = useState<Particle[]>([])
  const [totalReactions, setTotalReactions] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchReactions() {
      try {
        const response = await fetch('/api/reactions')
        const data = await response.json()
        if (data.reactions) {
          setReactions(data.reactions)
          const total = data.reactions.reduce((sum: number, r: Reaction) => sum + r.count, 0)
          setTotalReactions(total)
        }
      } catch (error) {
        console.error('Error fetching reactions:', error)
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
    
    // Get click position relative to container
    const containerRect = containerRef.current?.getBoundingClientRect()
    const buttonRect = event.currentTarget.getBoundingClientRect()
    
    // Create particles
    const newParticles: Particle[] = []
    if (containerRect) {
      const clickX = buttonRect.left - containerRect.left + buttonRect.width / 2
      const clickY = buttonRect.top - containerRect.top + buttonRect.height / 2
      
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8 - 2,
          life: 60,
          emoji: reaction.emoji,
        })
      }
    }
    setParticles((prev) => [...prev, ...newParticles])

    // Update reaction count
    const updatedReactions = [...reactions]
    updatedReactions[reactionIndex] = {
      ...reaction,
      count: reaction.count + 1,
    }
    setReactions(updatedReactions)
    setTotalReactions((prev) => prev + 1)

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
              x: particle.x,
              y: particle.y,
              opacity: particle.life / 60,
              scale: 0.5 + (particle.life / 60) * 0.5,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{
              left: 0,
              top: 0,
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center gap-3">
        {reactions.map((reaction, index) => (
          <motion.button
            key={reaction.emoji}
            onClick={(e) => handleReaction(index, e)}
            className="relative flex items-center gap-1.5 transition-all hover:scale-110"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">{reaction.emoji}</span>
            <span className="text-xs text-neutral-400">{reaction.count}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

