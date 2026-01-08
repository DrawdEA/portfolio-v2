"use client"

import { cn } from "@/lib/utils"
import { Briefcase, MapPin, Calendar } from "lucide-react"

interface TimelineItem {
  title: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line with gradient - starts at first dot center */}
      <div className="absolute left-[20px] top-5 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#1e3a8a] via-white/10 to-transparent md:left-[40px]" />
      
      <div className="space-y-16">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline dot with glow effect - centered on line */}
            <div className="absolute left-[20px] md:left-[40px] top-0 -translate-x-1/2 z-10">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-[#1e3a8a] opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
                {/* Outer ring */}
                <div className="relative h-10 w-10 rounded-full bg-white/5 border-2 border-[#1e3a8a] flex items-center justify-center group-hover:border-[#1e3a8a] transition-colors">
                  {/* Inner dot */}
                  <div className="h-4 w-4 rounded-full bg-[#1e3a8a] group-hover:bg-[#1e3a8a] transition-colors" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-4 pl-14 md:pl-20">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#1e3a8a] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <span>{item.company}</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{item.period}</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {item.description}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2.5 py-1 text-xs bg-white/10 hover:bg-white/25 border-0 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 text-gray-300 hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
