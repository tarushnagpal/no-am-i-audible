"use client"

import { useEffect, useRef } from "react"
import { Mic } from "lucide-react"

export function MicrophoneAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create ripple animation
    const createRipple = () => {
      const ripple = document.createElement("div")
      ripple.className = "absolute inset-0 rounded-full border-4 border-purple-500 opacity-100 scale-100"
      container.appendChild(ripple)

      // Animate the ripple
      ripple.animate(
        [
          { opacity: 0.8, transform: "scale(1)" },
          { opacity: 0, transform: "scale(2)" },
        ],
        {
          duration: 2000,
          easing: "ease-out",
        },
      ).onfinish = () => {
        ripple.remove()
      }
    }

    // Create ripples at intervals
    const interval = setInterval(createRipple, 2000)
    createRipple() // Create initial ripple

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/30"></div>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg animate-pulse">
          <Mic className="h-10 w-10 text-white" />
        </div>

        {/* Audio wave animation */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-purple-500 rounded-full"
              style={{
                height: `${12 + Math.sin(i * 1.5) * 8}px`,
                animation: `audioWave 1.5s ease-in-out ${i * 0.15}s infinite alternate`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
