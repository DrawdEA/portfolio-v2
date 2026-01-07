"use client"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  width?: number
  height?: number
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  className,
  width,
  height,
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div
        className={className}
        style={fill ? undefined : { width, height }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
    />
  )
}



