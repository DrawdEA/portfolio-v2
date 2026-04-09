"use client"

import { useEffect, useState } from "react"
import { PortfolioDock } from "@/components/portfolio-dock"
import { cn } from "@/lib/utils"

export function ScrollAwareDock() {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        setIsVisible(false)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const onOpen = () => setIsChatOpen(true)
    const onClose = () => setIsChatOpen(false)
    window.addEventListener("eddy-chat-open", onOpen)
    window.addEventListener("eddy-chat-close", onClose)
    return () => {
      window.removeEventListener("eddy-chat-open", onOpen)
      window.removeEventListener("eddy-chat-close", onClose)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ease-in-out",
        isVisible && !isChatOpen ? "translate-y-0" : "translate-y-24"
      )}
    >
      <PortfolioDock />
    </div>
  )
}



