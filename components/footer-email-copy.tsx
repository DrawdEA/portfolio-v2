"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"

export function FooterEmailCopy({ email }: { email: string }) {
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
    <button
      onClick={handleCopy}
      className="text-gray-400 hover:text-white transition-colors"
      aria-label="Copy email"
    >
      {copied ? (
        <Check className="h-5 w-5" />
      ) : (
        <Mail className="h-5 w-5" />
      )}
    </button>
  )
}

