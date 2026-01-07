"use client"

import { useState } from "react"
import { BentoCard } from "@/components/ui/bento-grid"
import { ContentDialog } from "@/components/content-dialog"
import { ContentPage } from "@/lib/markdown"
import { Users, Trophy, Mic } from "lucide-react"

interface DialogBentoCardProps {
  name: string
  className: string
  background: React.ReactNode
  iconName?: "Users" | "Trophy" | "Mic"
  description: string
  cta: string
  buttonIcon?: React.ElementType
  centerButton?: boolean
  largeButton?: boolean
  whiteButton?: boolean
  content: ContentPage | null
}

const iconMap = {
  Users,
  Trophy,
  Mic,
}

export function DialogBentoCard({
  content,
  iconName,
  ...bentoCardProps
}: DialogBentoCardProps) {
  const [open, setOpen] = useState(false)
  const Icon = iconName ? iconMap[iconName] : undefined

  return (
    <>
      <BentoCard
        {...bentoCardProps}
        Icon={Icon}
        onClick={() => setOpen(true)}
      />
      <ContentDialog
        open={open}
        onOpenChange={setOpen}
        content={content}
      />
    </>
  )
}

