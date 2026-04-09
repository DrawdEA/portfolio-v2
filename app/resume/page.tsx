import { Download, ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/Aurora"
import type { Metadata } from "next"
import { getMetadata } from "@/lib/seo"

export const metadata: Metadata = getMetadata({
  title: "Resume",
  description: "View and download Edward Diesta's resume.",
})

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none z-0">
        <Aurora
          colorStops={["#0a1833", "#1a2647", "#4a5a8c"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.4}
        />
      </div>

      <main className="relative z-10 min-h-screen w-full flex flex-col items-center py-16 px-4">
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <a
              href="/resume.pdf"
              download="Edward-Diesta_Resume.pdf"
              className="group flex items-center gap-2 px-4 h-10 rounded-lg bg-white/10 hover:bg-white/25 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 text-sm text-white cursor-pointer"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Download
            </a>
          </div>

          {/* Desktop: iframe viewer */}
          <div className="hidden md:block w-full rounded-2xl overflow-hidden border border-white/10" style={{ height: "85vh" }}>
            <div className="w-full h-full overflow-y-auto custom-scrollbar">
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="w-full border-0"
                style={{ height: "150vh" }}
                title="Edward Diesta Resume"
              />
            </div>
          </div>

          {/* Mobile: open natively */}
          <div className="md:hidden flex flex-col items-center justify-center gap-6 py-16 rounded-2xl border border-white/10 bg-white/5">
            <FileText className="h-16 w-16 text-white/30" />
            <div className="text-center">
              <p className="text-white font-medium mb-1">Edward Diesta — Resume</p>
              <p className="text-white/40 text-sm">Open in your device's PDF viewer</p>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-sm text-white font-medium"
            >
              <FileText className="h-4 w-4" />
              Open PDF
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
