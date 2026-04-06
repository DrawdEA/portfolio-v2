"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Send, X, ExternalLink, Mail, Check, FileText, Github, Linkedin, Instagram, Facebook } from "lucide-react"
import EddyBotFace from "@/components/eddy-bot-face"

const GREETING = "Hi, I'm Eddy! I answer questions on behalf of my very smart and handsome boss."

const BUBBLE_PROMPTS = [
  GREETING,
  "I answer questions 24/7. Edward sleeps. Someone fix the system.",
  "Full merit scholar. Top 60 out of 10,000+. Still doing unpaid work for him though.",
  "Two hackathon wins. I wasn't invited. I'm fine.",
  "Edward pays me nothing for this job. Sigh.",
  "He ideates fast. Execution depends on the vibes. His words, not mine.",
  "Open to work. Remote preferred. Hire him so he can finally pay me.",
  "He learns by building. Lectures are background noise at this point.",
  "Part of qtr.zip: a tech collective with actual wins. Let him know if there's a new hackathon around!",
  "I've read everything about this guy. He's impressive. Don't tell him I said that.",
  "Dubai Chewy or Ilocos Empanada?",
  "Laurel. Laurel. Laurel. Yanny. Laurel. Laurel.",
  "Currently shipping LoClock. A commute alarm app. Missing bus stops is his personality flaw apparently.",
  "Ask me something. I've been staring at this bubble for way too long.",
]

// ─── Typewriter hook ───────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 22) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (speed === 0) { setDisplayed(text); setDone(true); return }
    setDisplayed("")
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(timer); setDone(true) }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return { displayed, done }
}


// ─── URL parsing helpers ───────────────────────────────────────────────────


const URL_LABELS: Record<string, string> = {
  "edwarddiesta.com/resume":        "View Resume",
  "edwarddiesta.com":               "edwarddiesta.com",
  "edwarddiesta.com#about":         "About",
  "edwarddiesta.com#experience":    "Experience",
  "edwarddiesta.com#projects":      "Projects",
  "edwarddiesta.com#blog":          "Blog",
  "edwarddiesta.com/blog":          "Blog",
  "edwarddiesta.com/projects":      "Projects",
  "edwarddiesta.com/hackathons":    "Hackathons",
  "edwarddiesta.com/orgwork":       "Organizations",
  "edwarddiesta.com/tech-stack":    "Tech Stack",
  "edwarddiesta.com/certifications":"Certifications",
  "github.com/DrawdEA":             "DrawdEA",
  "linkedin.com/in/edwarddiesta":   "edwarddiesta",
  "instagram.com/edward.diesta":    "edward.diesta",
  "facebook.com/edwardjoshua.diesta":"edwardjoshua.diesta",
}

function iconForUrl(url: string) {
  if (url.includes("github.com"))    return <Github className="h-3.5 w-3.5 shrink-0" />
  if (url.includes("linkedin.com"))  return <Linkedin className="h-3.5 w-3.5 shrink-0" />
  if (url.includes("instagram.com")) return <Instagram className="h-3.5 w-3.5 shrink-0" />
  if (url.includes("facebook.com"))  return <Facebook className="h-3.5 w-3.5 shrink-0" />
  if (url.endsWith(".pdf"))          return <FileText className="h-3.5 w-3.5 shrink-0" />
  return <ExternalLink className="h-3.5 w-3.5 shrink-0" />
}

function labelFromUrl(url: string): string {
  try {
    const { hostname, pathname, hash } = new URL(url)
    const key = hostname.replace(/^www\./, "") + pathname.replace(/\/$/, "") + hash
    return URL_LABELS[key] ?? key
  } catch {
    return url
  }
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/25 text-xs text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
    >
      {copied ? <Check className="h-3 w-3 shrink-0 text-green-400" /> : <Mail className="h-3 w-3 shrink-0" />}
      <span>{copied ? "Copied!" : email}</span>
    </button>
  )
}

// ─── Segment parser ────────────────────────────────────────────────────────

type Segment =
  | { type: "text"; content: string }
  | { type: "link"; url: string }
  | { type: "email"; address: string }

function parseSegments(text: string): Segment[] {
  const segments: Segment[] = []
  const combined =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s,;]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = combined.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) })
    }
    if (match[2]) {
      // markdown [label](url) — no trailing punct issue since url is inside parens
      segments.push({ type: "link", url: match[2].replace(/[.,;:!?]+$/, "") })
    } else if (match[0].includes("@")) {
      segments.push({ type: "email", address: match[0] })
    } else {
      // plain URL — strip trailing punct and put it back as a text segment
      const trailing = match[0].match(/[.,;:!?]+$/)?.[0] ?? ""
      segments.push({ type: "link", url: match[0].replace(/[.,;:!?]+$/, "") })
      if (trailing) segments.push({ type: "text", content: trailing })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) })
  }

  return segments
}

// Renders a chat bubble with URLs/emails replaced inline by pill buttons
function MessageBubble({ msg, isNew }: { msg: Message; isNew?: boolean }) {
  const isUser = msg.role === "user"
  const segments = parseSegments(msg.content)
  const textContent = segments
    .filter((s): s is { type: "text"; content: string } => s.type === "text")
    .map((s) => s.content)
    .join("")
  const { displayed } = useTypewriter(textContent, isNew ? 22 : 0)
  const charsTyped = isNew ? displayed.length : textContent.length

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="px-4 py-2.5 rounded-2xl text-sm max-w-[80%] bg-white/20 text-white">
          {msg.content}
        </div>
      </div>
    )
  }

  // Precompute the text-char start position for each segment
  const segStarts = segments.reduce<{ starts: number[]; count: number }>(
    ({ starts, count }, seg) => ({
      starts: [...starts, count],
      count: count + (seg.type === "text" ? seg.content.length : 0),
    }),
    { starts: [], count: 0 }
  ).starts

  const seenLabels = new Set<string>()
  const nodes = segments.map((seg, i) => {
    const textStart = segStarts[i]

    if (seg.type === "text") {
      const shown = seg.content.slice(0, Math.max(0, charsTyped - textStart))
      return shown ? <span key={i}>{shown}</span> : null
    }

    // Only reveal pills once all preceding text has been typed
    if (charsTyped < textStart) return null

    if (seg.type === "link") {
      const label = labelFromUrl(seg.url)
      if (seenLabels.has(label)) return null
      seenLabels.add(label)
      return (
        <a
          key={i}
          href={seg.url}
          target="_blank"
          rel="noopener noreferrer"
          download={seg.url.endsWith(".pdf") ? "Edward-Diesta_Resume.pdf" : undefined}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/25 text-xs text-white/80 hover:text-white transition-all duration-200 cursor-pointer mx-0.5 align-middle"
        >
          {iconForUrl(seg.url)}
          <span>{label}</span>
        </a>
      )
    }

    if (seg.type === "email") {
      return (
        <span key={i} className="inline-flex align-middle mx-0.5">
          <CopyEmailButton email={seg.address} />
        </span>
      )
    }

    return null
  })

  return (
    <div className="flex flex-col items-start max-w-[85%]">
      <div className="px-4 py-2.5 text-sm bg-white/10 text-white/90 rounded-2xl leading-relaxed">
        {nodes}
      </div>
    </div>
  )
}

const SUGGESTIONS = [
  "What's his tech stack?",
  "Tell me about Edward",
  "Recent projects?",
  "What hackathons has he done?",
  "What orgs is he in?",
]

interface Message {
  role: "user" | "assistant"
  content: string
}

// ─── DESKTOP: Bot avatar + speech bubble (right side) ──────────────────────

interface EddyBotProps {
  onOpen: () => void
  onSend: (text: string) => void
  bubbleText: string
  isLoading: boolean
  isSpeaking: boolean
  isOpen: boolean
  input: string
  setInput: (v: string) => void
}

const PLACEHOLDER_MAX = 20 // max chars for suggestion part before truncating

function truncateSuggestion(s: string) {
  return s.length > PLACEHOLDER_MAX ? s.slice(0, PLACEHOLDER_MAX - 3) + "..." : s
}

export function EddyBot({ onOpen, onSend, bubbleText, isLoading, isSpeaking, isOpen, input, setInput }: EddyBotProps) {
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [bubbleIndex, setBubbleIndex] = useState(0)
  const [startTyping, setStartTyping] = useState(false)
  const isIdle = bubbleText === GREETING

  // Delay bubble typing until after the page cascade finishes (~1.3s)
  useEffect(() => {
    const t = setTimeout(() => setStartTyping(true), 1300)
    return () => clearTimeout(t)
  }, [])

  // Wait for typewriter to finish + 3s pause before cycling suggestion
  useEffect(() => {
    const text = truncateSuggestion(SUGGESTIONS[suggestionIndex])
    const typewriterMs = `Try: ${text}`.length * 40
    const timer = setTimeout(() => {
      setSuggestionIndex((i) => (i + 1) % SUGGESTIONS.length)
    }, typewriterMs + 3000)
    return () => clearTimeout(timer)
  }, [suggestionIndex])

  // Wait for typewriter to finish + 3s pause before cycling bubble
  useEffect(() => {
    if (!isIdle || !startTyping) return
    const text = BUBBLE_PROMPTS[bubbleIndex]
    const typewriterMs = text.length * 30
    const timer = setTimeout(() => {
      setBubbleIndex((i) => (i + 1) % BUBBLE_PROMPTS.length)
    }, typewriterMs + 3000)
    return () => clearTimeout(timer)
  }, [isIdle, bubbleIndex, startTyping])

  const displayBubble = isIdle ? BUBBLE_PROMPTS[bubbleIndex] : bubbleText
  // Only start typing bubble prompts after the page loads; AI replies type immediately
  const { displayed: typedBubble, done: bubbleDone } = useTypewriter(
    isIdle ? (startTyping ? displayBubble : "") : displayBubble,
    30,
  )
  const rawPlaceholder = `Try: ${truncateSuggestion(SUGGESTIONS[suggestionIndex])}`
  const { displayed: placeholder } = useTypewriter(rawPlaceholder, 40)

  // Bubble prompts keep the bot idle — only actual AI replies trigger speaking
  const botState = isLoading ? "thinking" : (isSpeaking || (!isIdle && !bubbleDone)) ? "speaking" : "idle"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim() || SUGGESTIONS[suggestionIndex]
    onOpen()
    onSend(text)
  }

  return (
    <div className="flex flex-col items-center w-64">
      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, filter: "blur(0px)", y: 0 }}
        transition={isOpen
          ? { opacity: { duration: 0.2 } }
          : { duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`h-28 flex items-end justify-center w-full ${isOpen ? "pointer-events-none" : ""}`}
      >
        <div className="relative w-full">
          <div className="bg-white/10 rounded-lg px-3 py-2.5 h-20 flex items-center justify-center text-xs text-white/90 text-center overflow-hidden">
            {isLoading ? (
              <span className="flex gap-1 items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            ) : (
              <span className="line-clamp-3">{typedBubble}</span>
            )}
          </div>
          <div className="flex flex-col items-center gap-1 mt-1.5">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        </div>
      </motion.div>

      {/* Avatar — never moves */}
      <motion.button
        className="flex flex-col items-center gap-1 cursor-pointer"
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
      >
        <EddyBotFace state={botState} size={120} />
      </motion.button>

      {/* Input */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, filter: "blur(0px)", y: 0 }}
        transition={isOpen
          ? { opacity: { duration: 0.2 } }
          : { duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full mt-2 ${isOpen ? "pointer-events-none" : ""}`}
      >
        <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-lg px-4 py-2.5 focus-within:shadow-lg focus-within:shadow-white/20 transition-all duration-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="text-white/50 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </motion.form>
    </div>
  )
}

// ─── DESKTOP: Chat panel (left side, replaces hero text) ───────────────────

interface EddyChatPanelProps {
  onClose: () => void
  messages: Message[]
  input: string
  setInput: (v: string) => void
  isLoading: boolean
  onSend: (text: string) => void
}

export function EddyChatPanel({ onClose, messages, input, setInput, isLoading, onSend }: EddyChatPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [suggestionIndex, setSuggestionIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIndex((i) => (i + 1) % SUGGESTIONS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) container.scrollTop = container.scrollHeight
  }, [messages])

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend(input)
  }

  const placeholder = input ? "" : `Try: ${SUGGESTIONS[suggestionIndex]}`

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Thought-bubble circles connecting the panel to the bot on the right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex items-center gap-2 pl-3 pointer-events-none">
        <div className="w-5 h-5 rounded-full bg-white/10" />
        <div className="w-3.5 h-3.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2 h-2 rounded-full bg-white/10" />
      </div>

      <div className="w-full h-[60vh] max-h-[500px] bg-white/10 border border-white/15 rounded-2xl flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            <EddyBotFace state={isLoading ? "thinking" : "idle"} size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Chat with Eddy</p>
            <p className="text-[10px] text-green-400">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/25 text-white/50 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-white/10 cursor-pointer">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} isNew={i === messages.length - 1 && msg.role === "assistant"} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-4 py-2.5 rounded-2xl rounded-bl-sm flex gap-1.5 items-center h-[38px]">
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-3 border-t border-white/10">
        <div className="flex items-center gap-3 bg-white/10 hover:bg-white/25 rounded-lg px-4 py-2.5 focus-within:shadow-lg focus-within:shadow-white/20 transition-all duration-300">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading} className="text-white/50 hover:text-white disabled:opacity-30 transition-colors cursor-pointer">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
      </div>
    </motion.div>
  )
}

// ─── MOBILE: Inline input under hero buttons ───────────────────────────────

export function EddyInput({ onSend, input, setInput, isLoading }: {
  onSend: (text: string) => void
  input: string
  setInput: (v: string) => void
  isLoading: boolean
}) {
  const [suggestionIndex, setSuggestionIndex] = useState(0)

  useEffect(() => {
    const text = truncateSuggestion(SUGGESTIONS[suggestionIndex])
    const typewriterMs = `Ask Eddy: ${text}`.length * 40
    const timer = setTimeout(() => {
      setSuggestionIndex((i) => (i + 1) % SUGGESTIONS.length)
    }, typewriterMs + 3000)
    return () => clearTimeout(timer)
  }, [suggestionIndex])

  const rawPlaceholder = `Ask Eddy: ${truncateSuggestion(SUGGESTIONS[suggestionIndex])}`
  const { displayed: placeholder } = useTypewriter(rawPlaceholder, 40)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim() || SUGGESTIONS[suggestionIndex]
    onSend(text)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-lg px-4 py-2.5 focus-within:shadow-lg focus-within:shadow-white/20 transition-all duration-300">
        <EddyBotFace state="idle" size={18} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} className="text-white/50 hover:text-white disabled:opacity-30 transition-colors cursor-pointer">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}

// ─── MOBILE: Fullscreen chat overlay ──────────────────────────────────────

export function EddyChatOverlay({ onClose, messages, input, setInput, isLoading, onSend }: {
  onClose: () => void
  messages: Message[]
  input: string
  setInput: (v: string) => void
  isLoading: boolean
  onSend: (text: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [suggestionIndex, setSuggestionIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIndex((i) => (i + 1) % SUGGESTIONS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isLoading])

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300)
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend(input)
  }

  const placeholder = input ? "" : `Try: ${SUGGESTIONS[suggestionIndex]}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      // lg:hidden ensures this overlay never appears on desktop
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[85vh] bg-neutral-950/95 border-t border-white/10 rounded-t-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <EddyBotFace state={isLoading ? "thinking" : "idle"} size={32} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Eddy</p>
              <p className="text-[10px] text-green-400">Online</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 px-4 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          {/* Suggestion chips — shown only before first user message */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onSend(s)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white/70 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-white/10 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="px-5 py-3 border-t border-white/10">
          <div className="flex items-center gap-3 bg-white/10 hover:bg-white/25 rounded-lg px-4 py-2.5 focus-within:shadow-lg focus-within:shadow-white/20 transition-all duration-300">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              disabled={isLoading}
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="text-white/50 hover:text-white disabled:opacity-30 transition-colors cursor-pointer">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ─── Shared state hook ─────────────────────────────────────────────────────

export function useEddyChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [bubbleText, setBubbleText] = useState(GREETING)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    setIsOpen(true)
    const userMessage = text.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // slice(1) drops the initial greeting (role: "assistant") — Gemini requires history to start with "user"
        body: JSON.stringify({ message: userMessage, history: messages.slice(1) }),
      })
      const data = await res.json()
      const reply = data.reply ?? data.error ?? "Something went wrong."
      setMessages((prev) => [...prev, { role: "assistant", content: reply }])
      setBubbleText(reply)
      // speaking = true for the duration of the typewriter effect (22ms/char)
      setIsSpeaking(true)
      setTimeout(() => setIsSpeaking(false), reply.length * 22)
    } catch {
      const error = "Couldn't reach Eddy right now. Try again later!"
      setMessages((prev) => [...prev, { role: "assistant", content: error }])
      setBubbleText(error)
      setIsSpeaking(true)
      setTimeout(() => setIsSpeaking(false), error.length * 22)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    bubbleText,
    messages,
    input,
    setInput,
    isLoading,
    isSpeaking,
    sendMessage,
  }
}
