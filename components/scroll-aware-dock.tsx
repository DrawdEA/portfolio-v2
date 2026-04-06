"use client"

import { useEffect, useState } from "react"
import { PortfolioDock } from "@/components/portfolio-dock"
import { cn } from "@/lib/utils"

export function ScrollAwareDock() {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        // At the very top — always hidden
        setIsVisible(false)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down — show
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up — hide
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <div
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-24"
      )}
    >
      <PortfolioDock />
    </div>
  )
}



