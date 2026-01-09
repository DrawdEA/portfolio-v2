"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { 
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react"
import { ResumeDownloadButton } from "@/components/resume-download-button"
import { EmailCopyButton } from "@/components/email-copy-button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function HeroSection() {
  return (
    <main className="flex min-h-screen w-full max-w-6xl mx-auto flex-col items-start justify-center py-16 sm:py-32 px-4 sm:px-16 bg-transparent relative z-10">
      <motion.section
        className="text-left w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 sm:mb-4 leading-tight"
          variants={itemVariants}
        >
          Hello, I&apos;m Edward.<br />A software engineer.
        </motion.h1>
        <motion.p
          className="text-sm sm:text-md md:text-lg text-gray-400 mb-6 sm:mb-8"
          variants={itemVariants}
        >
          Currently working on lots of things.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 items-center"
          variants={itemVariants}
        >
          {/* Facebook */}
          <a
            href="https://www.facebook.com/edwardjoshua.diesta/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="group relative cursor-pointer"
          >
            <Button
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer"
            >
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
            </Button>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Facebook
            </span>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/DrawdEA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group relative cursor-pointer"
          >
            <Button
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
            </Button>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              GitHub
            </span>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/edwarddiesta/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group relative cursor-pointer"
          >
            <Button
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
            </Button>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              LinkedIn
            </span>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/edward.diesta/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group relative cursor-pointer"
          >
            <Button
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer"
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
            </Button>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Instagram
            </span>
          </a>
          {/* CV */}
          <ResumeDownloadButton />
          {/* Email Copy */}
          <EmailCopyButton email="edwardjoshua.diesta@gmail.com" />
        </motion.div>
      </motion.section>
    </main>
  )
}

