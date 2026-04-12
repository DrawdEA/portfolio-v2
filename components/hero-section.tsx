"use client"

import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react"
import { ResumeDownloadButton } from "@/components/resume-download-button"
import { EmailCopyButton } from "@/components/email-copy-button"
import { EddyBot, EddyChatPanel, EddyInput, EddyChatOverlay, useEddyChat } from "@/components/eddy-chat"

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

// Shared hero content (name, bio, buttons) — used in both layouts
function HeroContent({ withInput, chat }: {
  withInput?: boolean
  chat: ReturnType<typeof useEddyChat>
}) {
  return (
    <motion.section
      key="hero"
      className="text-left w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.3 } }}
    >
      <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
        <Badge variant="outline" className="border-white/20 text-xs px-3 py-1">
          <span className="relative flex h-2 w-2 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Open to work!
        </Badge>
      </motion.div>
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 sm:mb-4 leading-none"
        variants={itemVariants}
      >
        Hello, I&apos;m Edward.<br className="block -mt-1" />An AI Engineer.
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
        <a href="https://www.facebook.com/edwardjoshua.diesta/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group relative cursor-pointer">
          <Button size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer">
            <Facebook className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
          </Button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Facebook</span>
        </a>
        <a href="https://github.com/DrawdEA" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group relative cursor-pointer">
          <Button size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer">
            <Github className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
          </Button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/edwarddiesta/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group relative cursor-pointer">
          <Button size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer">
            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
          </Button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">LinkedIn</span>
        </a>
        <a href="https://www.instagram.com/edward.diesta/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group relative cursor-pointer">
          <Button size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/10 hover:bg-white/25 border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 cursor-pointer">
            <Instagram className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
          </Button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Instagram</span>
        </a>
        <ResumeDownloadButton />
        <EmailCopyButton email="edwardjoshua.diesta@gmail.com" />
      </motion.div>

      {/* Mobile-only: Eddy input under buttons */}
      {withInput && (
        <motion.div className="mt-6" variants={itemVariants}>
          <EddyInput
            onSend={chat.sendMessage}
            onOpen={chat.open}
            input={chat.input}
            setInput={chat.setInput}
            isLoading={chat.isLoading}
          />
        </motion.div>
      )}
    </motion.section>
  )
}

export function HeroSection() {
  const chat = useEddyChat()

  return (
    <>
      {/* ── DESKTOP layout (lg+): left hero/chat panel + right EddyBot ── */}
      <main className="hidden lg:flex min-h-screen w-full max-w-6xl mx-auto flex-row items-center justify-center gap-8 py-16 px-16 bg-transparent relative z-10">
        <div className="w-full flex-1">
          <AnimatePresence mode="wait">
            {chat.isOpen ? (
              <EddyChatPanel
                key="chat"
                onClose={chat.close}
                messages={chat.messages}
                input={chat.input}
                setInput={chat.setInput}
                isLoading={chat.isLoading}
                onSend={chat.sendMessage}
              />
            ) : (
              <HeroContent key="hero" chat={chat} />
            )}
          </AnimatePresence>
        </div>

        <div className="w-auto flex justify-center">
          <EddyBot
            onOpen={chat.open}
            onSend={chat.sendMessage}
            bubbleText={chat.bubbleText}
            isLoading={chat.isLoading}
            isSpeaking={chat.isSpeaking}
            isOpen={chat.isOpen}
            input={chat.input}
            setInput={chat.setInput}
          />
        </div>
      </main>

      {/* ── MOBILE layout (<lg): hero content + Eddy input under buttons ── */}
      <main className="lg:hidden flex min-h-screen w-full max-w-6xl mx-auto flex-col items-center justify-center gap-6 py-12 px-6 bg-transparent relative z-10">
        <HeroContent withInput chat={chat} />
      </main>

      {/* Mobile chat overlay — lg:hidden keeps it off desktop */}
      <AnimatePresence>
        {chat.isOpen && (
          <EddyChatOverlay
            onClose={chat.close}
            messages={chat.messages}
            input={chat.input}
            setInput={chat.setInput}
            isLoading={chat.isLoading}
            onSend={chat.sendMessage}
          />
        )}
      </AnimatePresence>
    </>
  )
}
