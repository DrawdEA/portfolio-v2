"use client"

import { useState } from "react"
import { FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumeDownloadButton() {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    setDownloaded(true)
    setTimeout(() => {
      setDownloaded(false)
    }, 2000)
  }

  return (
    <a
      href="/resume.pdf"
      download="Edward-Diesta_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="CV"
      className="group relative"
      onClick={handleDownload}
    >
      <Button
        size="icon"
        className="h-12 w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
      >
        {downloaded ? (
          <Check className="h-6 w-6 transition-transform duration-300" />
        ) : (
          <FileText className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
        )}
      </Button>
      <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Resume
      </span>
    </a>
  )
}

