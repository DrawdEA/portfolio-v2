"use client"

import { motion } from "motion/react"
import { animatedItemVariants } from "@/components/animated-page-content"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface AnimatedPageHeaderProps {
  backHref?: string
  backLabel?: string
  title: string
  description: string
}

export function AnimatedPageHeader({
  backHref = "/",
  backLabel = "Back to home",
  title,
  description,
}: AnimatedPageHeaderProps) {
  return (
    <>
      <motion.div variants={animatedItemVariants}>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1e3a8a] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </motion.div>
      <motion.div className="mb-12" variants={animatedItemVariants}>
        <h1 className="text-4xl md:text-5xl font-medium mb-4 text-white">{title}</h1>
        <p className="text-gray-400 text-lg">{description}</p>
      </motion.div>
    </>
  )
}

