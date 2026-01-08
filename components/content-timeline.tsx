"use client"

import { cn } from "@/lib/utils"
import { MapPin, Calendar } from "lucide-react"
import { ContentItem } from "@/lib/markdown"
import Image from "next/image"

interface ContentTimelineProps {
  items: ContentItem[]
  className?: string
}

export function ContentTimeline({ items, className }: ContentTimelineProps) {
  const formatDate = (dateString: string) => {
    // Support date ranges like "2018-11-23 to 2018-11-25" or single dates
    if (dateString.includes(' to ')) {
      const [startDate, endDate] = dateString.split(' to ')
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      const getOrdinal = (day: number) => {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
          case 1: return 'st'
          case 2: return 'nd'
          case 3: return 'rd'
          default: return 'th'
        }
      }
      
      const startDay = start.getDate()
      const endDay = end.getDate()
      const startMonth = start.toLocaleDateString('en-US', { month: 'long' })
      const endMonth = end.toLocaleDateString('en-US', { month: 'long' })
      const year = start.getFullYear()
      
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay}${getOrdinal(startDay)} - ${endDay}${getOrdinal(endDay)}, ${year}`
      } else {
        return `${startMonth} ${startDay}${getOrdinal(startDay)} - ${endMonth} ${endDay}${getOrdinal(endDay)}, ${year}`
      }
    } else {
      const date = new Date(dateString)
      const day = date.getDate()
      const month = date.toLocaleDateString('en-US', { month: 'long' })
      const year = date.getFullYear()
      
      const getOrdinal = (day: number) => {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
          case 1: return 'st'
          case 2: return 'nd'
          case 3: return 'rd'
          default: return 'th'
        }
      }
      
      return `${month} ${day}${getOrdinal(day)}, ${year}`
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Vertical line with gradient */}
      <div className="absolute left-[20px] top-5 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#1e3a8a] via-white/10 to-transparent md:left-[40px]" />
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline dot with glow effect */}
            <div className="absolute left-[20px] md:left-[40px] top-0 -translate-x-1/2 z-10">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-[#1e3a8a] opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
                {/* Outer ring */}
                <div className="relative h-10 w-10 rounded-full bg-white/5 border-2 border-[#1e3a8a] flex items-center justify-center group-hover:border-[#1e3a8a] transition-colors overflow-hidden">
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-[#1e3a8a] group-hover:bg-[#1e3a8a] transition-colors" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-4 pl-14 md:pl-20">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{formatDate(item.date)}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#1e3a8a] transition-colors">
                {item.title}
              </h3>
              
              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{item.location}</span>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

