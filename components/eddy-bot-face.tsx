"use client"

import { useEffect, useRef, useState } from 'react'

export type BotState = 'idle' | 'thinking' | 'speaking'

interface EddyBotFaceProps {
  state?: BotState
  size?: number
}

export default function EddyBotFace({ state = 'idle', size = 160 }: EddyBotFaceProps) {
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [blinkActive, setBlinkActive] = useState(false)

  useEffect(() => {
    if (blinkRef.current) clearInterval(blinkRef.current)

    const shouldBlink = state === 'idle' || state === 'speaking'
    if (!shouldBlink) return

    const interval = state === 'idle' ? 3200 : 2400
    blinkRef.current = setInterval(() => {
      setBlinkActive(true)
      setTimeout(() => setBlinkActive(false), 110)
    }, interval + Math.random() * 1200)

    return () => { if (blinkRef.current) clearInterval(blinkRef.current) }
  }, [state])

  const statusColor = state === 'thinking' ? '#f59e0b' : state === 'speaking' ? '#22c55e' : '#2e5090'

  return (
    <svg
      width={size}
      height={size}
      viewBox="90 88 140 140"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <clipPath id="efc">
          <rect x="108" y="100" width="104" height="88" rx="10" />
        </clipPath>
      </defs>

      <g style={{
        transformOrigin: '160px 155px',
        animation: state === 'idle'
          ? 'eb-float 3.5s ease-in-out infinite'
          : state === 'thinking'
          ? 'eb-tilt 2.2s ease-in-out infinite'
          : 'eb-float 1.8s ease-in-out infinite',
      }}>
        {/* head */}
        <rect x="108" y="96" width="104" height="108" rx="18" fill="#0f1a2e" />
        <rect x="110" y="98" width="100" height="104" rx="17" fill="none" stroke="#1e3560" strokeWidth="1.2" />

        {/* screen */}
        <rect x="116" y="104" width="88" height="82" rx="10" fill="#0a1628" />

        {/* scanline */}
        <g clipPath="url(#efc)">
          <rect
            x="116" y="104" width="88" height="1.5"
            fill="#2e5090"
            opacity={state === 'thinking' ? 0.16 : state === 'speaking' ? 0.14 : 0.08}
            style={{
              animation: state === 'thinking'
                ? 'eb-scan 1.2s linear infinite'
                : state === 'speaking'
                ? 'eb-scan 0.8s linear infinite'
                : 'eb-scan 3s linear infinite',
            }}
          />
        </g>

        {/* brows */}
        <rect
          x="122" y="116" width="26" height="3" rx="1.5" fill="#1e3560"
          style={{
            transformOrigin: '135px 117px',
            animation: state === 'thinking' ? 'eb-brow 2.2s ease-in-out infinite' : 'none',
          }}
        />
        <rect
          x="172" y="116" width="26" height="3" rx="1.5" fill="#1e3560"
          style={{
            transformOrigin: '185px 117px',
            animation: state === 'thinking' ? 'eb-brow 2.2s ease-in-out infinite 0.15s' : 'none',
          }}
        />

        {/* eyes */}
        {[
          { x: 120, cx: 135 },
          { x: 170, cx: 185 },
        ].map(({ x, cx }, i) => (
          <g key={i} style={{ transformOrigin: `${cx}px 133px` }}>
            <rect x={x} y="123" width="30" height="20" rx="6" fill="#2e5090" />
            <rect x={x + 4} y="127" width="9" height="7" rx="2.5" fill="#6b8fc2" opacity="0.9" />
            <rect x={x + 6} y="129" width="3" height="3" rx="1.5" fill="white" />
            {/* blink overlay */}
            <rect
              x={x} y="123" width="30" height="20" rx="6"
              fill="#0a1628"
              opacity={blinkActive ? 1 : 0}
              style={{ transition: 'opacity 0.05s' }}
            />
          </g>
        ))}

        {/* idle mouth */}
        {state !== 'thinking' && state !== 'speaking' && (
          <>
            <rect x="130" y="157" width="60" height="12" rx="3" fill="#1e3a5f" />
            <rect x="130" y="157" width="40" height="12" rx="3" fill="#2e5090" opacity="0.8" />
          </>
        )}

        {/* thinking dots */}
        {state === 'thinking' && [
          { cx: 148, delay: '0s' },
          { cx: 160, delay: '0.22s' },
          { cx: 172, delay: '0.44s' },
        ].map(({ cx, delay }, i) => (
          <circle
            key={i} cx={cx} cy="163" r="4.5" fill="#2e5090"
            style={{
              transformOrigin: `${cx}px 163px`,
              animation: `eb-dot 1.1s ease-in-out infinite ${delay}`,
            }}
          />
        ))}

        {/* speaking bars */}
        {state === 'speaking' && [
          { x: 131, anim: 'eb-b1 0.50s ease-in-out infinite 0.00s' },
          { x: 143, anim: 'eb-b2 0.40s ease-in-out infinite 0.10s' },
          { x: 155, anim: 'eb-b3 0.60s ease-in-out infinite 0.05s' },
          { x: 167, anim: 'eb-b4 0.45s ease-in-out infinite 0.15s' },
          { x: 179, anim: 'eb-b5 0.55s ease-in-out infinite 0.08s' },
        ].map(({ x, anim }, i) => (
          <rect
            key={i}
            x={x} y="155" width="8" height="18" rx="2"
            fill="#2e5090" opacity={i % 2 === 0 ? 0.9 : 0.7}
            style={{ transformOrigin: `${x + 4}px 172px`, animation: anim }}
          />
        ))}

        {/* status dot */}
        <circle cx="191" cy="109" r="4" fill={statusColor} />
      </g>

      <style>{`
        @keyframes eb-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes eb-tilt  { 0%,100%{transform:rotate(0deg) translateY(0)} 30%{transform:rotate(-2deg) translateY(-2px)} 70%{transform:rotate(1.5deg) translateY(-1px)} }
        @keyframes eb-scan  { 0%{transform:translateY(-32px)} 100%{transform:translateY(32px)} }
        @keyframes eb-brow  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
        @keyframes eb-dot   { 0%,60%,100%{opacity:0.15;transform:translateY(0)} 30%{opacity:1;transform:translateY(-3px)} }
        @keyframes eb-b1 { 0%,100%{transform:scaleY(0.3)} 40%{transform:scaleY(1)} }
        @keyframes eb-b2 { 0%,100%{transform:scaleY(0.6)} 55%{transform:scaleY(0.2)} }
        @keyframes eb-b3 { 0%,100%{transform:scaleY(0.2)} 30%{transform:scaleY(0.9)} }
        @keyframes eb-b4 { 0%,100%{transform:scaleY(0.8)} 60%{transform:scaleY(0.3)} }
        @keyframes eb-b5 { 0%,100%{transform:scaleY(0.4)} 45%{transform:scaleY(1)} }
      `}</style>
    </svg>
  )
}
