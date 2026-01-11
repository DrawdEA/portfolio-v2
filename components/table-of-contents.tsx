"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  contentHtml: string
  className?: string
}

export function TableOfContents({ contentHtml, className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isManualScroll, setIsManualScroll] = useState(false)

  // Extract headings from HTML content and add IDs to DOM
  useEffect(() => {
    if (typeof window === "undefined") return

    const generateId = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    }

    const processHeadings = () => {
      // Add IDs to actual headings in the DOM first
      const contentElement = document.querySelector(".markdown-content")
      if (contentElement) {
        const actualHeadings = contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6")
        actualHeadings.forEach((heading) => {
          if (!heading.id) {
            const text = heading.textContent || ""
            heading.id = generateId(text)
          }
        })
      }

      // Extract headings from the actual DOM (now with IDs)
      const parser = new DOMParser()
      const doc = parser.parseFromString(contentHtml, "text/html")
      const headingElements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6")
      
      const extractedHeadings: Heading[] = []
      
      headingElements.forEach((heading) => {
        const text = heading.textContent || ""
        const level = parseInt(heading.tagName.charAt(1))
        
        // Generate ID from text if not present
        let id = heading.id || generateId(text)
        
        extractedHeadings.push({ id, text, level })
      })

      setHeadings(extractedHeadings)
    }

    // Process immediately
    processHeadings()

    // Also process after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(processHeadings, 100)

    // Use MutationObserver to watch for content changes
    const observer = new MutationObserver(processHeadings)
    const contentElement = document.querySelector(".markdown-content")
    if (contentElement) {
      observer.observe(contentElement, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [contentHtml])

  // Scroll spy to highlight active section
  useEffect(() => {
    if (headings.length === 0) return

    const OFFSET = 80 // Must match the offset in handleClick

    const handleScroll = () => {
      // Don't update if user just clicked a link (manual scroll)
      if (isManualScroll) return
      
      // Use the same calculation as handleClick
      const scrollY = window.scrollY
      const scrollPosition = scrollY + OFFSET

      // Find the current active heading
      // Find the last heading that we've scrolled past (with some tolerance)
      let activeHeading: Heading | null = null

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = document.getElementById(headings[i].id)
        if (heading) {
          // Use getBoundingClientRect for accurate position relative to viewport
          const rect = heading.getBoundingClientRect()
          const headingTop = rect.top + scrollY
          
          // Check if we've scrolled past this heading (with tolerance)
          // The heading is active if it's within the offset range
          if (scrollPosition >= headingTop - 30) {
            activeHeading = headings[i]
            break
          }
        }
      }

      if (activeHeading) {
        setActiveId(activeHeading.id)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headings, isManualScroll])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    // Set active immediately when clicked
    setActiveId(id)
    setIsManualScroll(true)
    
    const element = document.getElementById(id)
    if (element) {
      const OFFSET = 80 // Account for fixed headers - must match scroll spy
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementTop - OFFSET

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      
      // After scroll completes, verify we're at the right position and allow scroll spy to take over
      setTimeout(() => {
        // Double-check the active heading matches where we scrolled to
        const finalScrollPosition = window.scrollY + OFFSET
        const headingTop = element.getBoundingClientRect().top + window.pageYOffset
        
        // If we're close to the target heading, keep it active
        if (Math.abs(finalScrollPosition - headingTop) < 50) {
          setActiveId(id)
        }
        
        setIsManualScroll(false)
      }, 1000) // Wait for smooth scroll to complete
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav
      className={cn(
        "h-fit max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar",
        "hidden lg:block",
        className
      )}
      aria-label="Table of contents"
    >
      <div className="border-l border-gray-700 pl-4">
        <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          On this page
        </h2>
        <ul className="space-y-2">
          {headings.map((heading) => {
            const isActive = activeId === heading.id
            const indentLevel = Math.max(0, heading.level - 2) // h2 is base level

            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={cn(
                    "block text-sm transition-colors duration-200 py-1",
                    "hover:text-[#1e3a8a]",
                    isActive
                      ? "text-[#1e3a8a] font-medium"
                      : "text-gray-400"
                  )}
                  style={{
                    paddingLeft: `${indentLevel * 12}px`,
                  }}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
