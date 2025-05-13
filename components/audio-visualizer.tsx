"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isListening, setIsListening] = useState(false)
  const [audioData, setAudioData] = useState<number[]>(Array(64).fill(0))
  const animationRef = useRef<number>()
  const analyserRef = useRef<AnalyserNode>()
  const dataArrayRef = useRef<Uint8Array>()

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const startListening = async () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 128
      source.connect(analyser)

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      analyserRef.current = analyser
      dataArrayRef.current = dataArray

      setIsListening(true)
      animate()
    } catch (error) {
      console.error("Error accessing microphone:", error)
      // Simulate audio data for demo purposes if mic access is denied
      simulateAudioData()
    }
  }

  const simulateAudioData = () => {
    setIsListening(true)
    const simulateAnimation = () => {
      const newData = Array(64)
        .fill(0)
        .map(() => Math.floor(Math.random() * 50) + (Math.random() > 0.7 ? Math.random() * 100 : 0))
      setAudioData(newData)
      animationRef.current = requestAnimationFrame(simulateAnimation)
    }
    simulateAnimation()
  }

  const animate = () => {
    if (!analyserRef.current || !dataArrayRef.current) return

    analyserRef.current.getByteFrequencyData(dataArrayRef.current)
    setAudioData([...dataArrayRef.current])

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (canvasRef.current && audioData) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const width = canvas.width
      const height = canvas.height
      const barWidth = width / audioData.length

      ctx.clearRect(0, 0, width, height)

      audioData.forEach((value, index) => {
        const barHeight = (value / 255) * height

        // Create gradient
        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight)
        gradient.addColorStop(0, "#9333ea") // purple-600
        gradient.addColorStop(1, "#db2777") // pink-600

        ctx.fillStyle = gradient

        // Draw bar with rounded corners
        const x = index * barWidth
        const y = height - barHeight
        const radius = barWidth / 2

        if (barHeight > 0) {
          ctx.beginPath()
          ctx.moveTo(x + radius, y)
          ctx.lineTo(x + barWidth - radius, y)
          ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
          ctx.lineTo(x + barWidth, height - radius)
          ctx.quadraticCurveTo(x + barWidth, height, x + barWidth - radius, height)
          ctx.lineTo(x + radius, height)
          ctx.quadraticCurveTo(x, height, x, height - radius)
          ctx.lineTo(x, y + radius)
          ctx.quadraticCurveTo(x, y, x + radius, y)
          ctx.closePath()
          ctx.fill()
        }
      })
    }
  }, [audioData])

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>

      <div className="relative">
        {!isListening ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">Click to activate the audio visualizer</p>
            <Button onClick={startListening}>Start Visualizer</Button>
          </div>
        ) : (
          <div className="py-4">
            <canvas ref={canvasRef} width={800} height={200} className="w-full h-[200px]" />
            <div className="flex justify-center mt-4">
              <div className="animate-pulse flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Listening...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
    >
      {children}
    </button>
  )
}
