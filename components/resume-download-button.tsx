import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const buttonClass = "h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer"
const iconClass = "h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110"
const tooltipClass = "absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"

export function ResumeDownloadButton() {
  return (
    <>
      {/* Mobile: open PDF directly */}
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume" className="group relative cursor-pointer md:hidden">
        <Button size="icon" className={buttonClass}>
          <FileText className={iconClass} />
        </Button>
        <span className={tooltipClass}>Resume</span>
      </a>
      {/* Desktop: go to resume page */}
      <Link href="/resume" aria-label="Resume" className="group relative cursor-pointer hidden md:inline-flex">
        <Button size="icon" className={buttonClass}>
          <FileText className={iconClass} />
        </Button>
        <span className={tooltipClass}>Resume</span>
      </Link>
    </>
  )
}

