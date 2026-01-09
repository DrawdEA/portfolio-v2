"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmailCopyButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  return (
    <div className="group relative cursor-pointer">
      <Button
        onClick={handleCopy}
        size="icon"
        aria-label="Copy email"
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer"
      >
        {copied ? (
          <Check className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300" />
        ) : (
          <Mail className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
        )}
      </Button>
      <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Email
      </span>
    </div>
  )
}

