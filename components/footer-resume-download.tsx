"use client"

import { useState } from "react"
import { FileText, Check } from "lucide-react"

export function FooterResumeDownload() {
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
      className="text-gray-400 hover:text-white transition-colors"
      aria-label="Resume"
      onClick={handleDownload}
    >
      {downloaded ? (
        <Check className="h-5 w-5" />
      ) : (
        <FileText className="h-5 w-5" />
      )}
    </a>
  )
}

