"use client"

import { useState } from "react"

interface TechIconProps {
  src: string
  alt: string
}

export function TechIcon({ src, alt }: TechIconProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative w-5 h-5 shrink-0">
      {imageError ? (
        // Placeholder when image fails to load
        <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-500 rounded-full" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  )
}

