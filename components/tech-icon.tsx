"use client"

import { useState } from "react"
import Image from "next/image"

interface TechIconProps {
  src: string
  alt: string
}

export function TechIcon({ src, alt }: TechIconProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return null
  }

  return (
    <div className="relative w-5 h-5 shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  )
}

