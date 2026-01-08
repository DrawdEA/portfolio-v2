"use client"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src?: string | null
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
  const imageSrc = (!src || imageError) ? "/placeholder.jpg" : src

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
    />
  )
}



