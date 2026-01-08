"use client"

import { motion } from "motion/react"
import { animatedItemVariants } from "@/components/animated-page-content"

interface AnimatedContentItemProps {
  children: React.ReactNode
  index?: number
}

export function AnimatedContentItem({ children, index }: AnimatedContentItemProps) {
  return (
    <motion.div
      variants={animatedItemVariants}
      custom={index}
    >
      {children}
    </motion.div>
  )
}

