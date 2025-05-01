"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const tracks = [
  {
    id: 1,
    title: "Algorithmic Symphony",
    duration: "3:42",
    coverImage: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    title: "Digital Dreams",
    duration: "4:15",
    coverImage: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    title: "Python Beats",
    duration: "2:58",
    coverImage: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    title: "Code & Keys",
    duration: "5:21",
    coverImage: "/placeholder.svg?height=80&width=80",
  },
]

export default function MusicPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [showVisualizer, setShowVisualizer] = useState(false)

  // In a real implementation, this would be an actual audio element
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 0
          }
          return prev + 0.5
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    if (progress >= 100) {
      if (isRepeating) {
        setProgress(0)
        // In a real implementation, we would restart the audio
      } else {
        handleNextTrack()
      }
    }
  }, [progress])

  // Audio visualizer effect
  useEffect(() => {
    if (showVisualizer && canvasRef.current && isPlaying) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Animation function
      const animate = () => {
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Generate random bars to simulate audio visualization
        const barCount = 64
        const barWidth = canvas.width / barCount

        for (let i = 0; i < barCount; i++) {
          // Simulate audio frequency data
          let barHeight

          if (i % 2 === 0) {
            // Create a pattern with some bars higher than others
            barHeight = Math.random() * canvas.height * 0.8 + (Math.sin(i / 10) + 1) * 20
          } else {
            barHeight = Math.random() * canvas.height * 0.5 + (Math.cos(i / 8) + 1) * 15
          }

          // Adjust height based on volume
          barHeight = barHeight * (volume / 100)

          // Draw bar
          const hue = (i / barCount) * 360
          ctx.fillStyle = `hsl(${hue}, 80%, 60%)`
          ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight)
        }

        animationRef.current = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [showVisualizer, isPlaying, volume])

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(trackId)
      setIsPlaying(true)
      setProgress(0)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseInt(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number.parseInt(e.target.value)
    setProgress(newProgress)
  }

  const handleNextTrack = () => {
    if (currentTrack === null) return

    if (isShuffled) {
      // Random track excluding current
      const availableTracks = tracks.filter((t) => t.id !== currentTrack)
      const randomTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)]
      setCurrentTrack(randomTrack.id)
    } else {
      // Next track in sequence
      const currentIndex = tracks.findIndex((t) => t.id === currentTrack)
      const nextIndex = (currentIndex + 1) % tracks.length
      setCurrentTrack(tracks[nextIndex].id)
    }

    setProgress(0)
  }

  const handlePrevTrack = () => {
    if (currentTrack === null) return

    // Previous track in sequence
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack)
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
    setCurrentTrack(tracks[prevIndex].id)
    setProgress(0)
  }

  return (
    <main className="min-h-screen bg-yellow-100 p-8">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <Link href="/" className="mb-8 inline-flex items-center text-gray-700 hover:text-black">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-4xl font-medium text-gray-800"
        >
          Music
        </motion.h1>

        {showVisualizer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 h-64 overflow-hidden rounded-lg bg-black p-2"
          >
            <canvas ref={canvasRef} className="h-full w-full" />
          </motion.div>
        )}

        <div className="space-y-4">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={cn(
                "group flex items-center rounded-lg border p-4 transition-all hover:shadow-md",
                currentTrack === track.id
                  ? "border-gray-800 bg-yellow-200"
                  : "border-gray-300 bg-white hover:bg-yellow-50",
              )}
            >
              <div className="mr-4 h-20 w-20 flex-shrink-0 overflow-hidden rounded">
                <img
                  src={track.coverImage || "/placeholder.svg"}
                  alt={track.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-medium text-gray-800">{track.title}</h2>
                <p className="text-gray-600">{track.duration}</p>
                {currentTrack === track.id && (
                  <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gray-800 transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <button
                onClick={() => togglePlay(track.id)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white transition-transform hover:scale-105 hover:bg-black"
              >
                {isPlaying && currentTrack === track.id ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>
            </motion.div>
          ))}
        </div>

        {currentTrack && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white p-4 shadow-lg"
          >
            <div className="mx-auto flex max-w-4xl flex-col">
              <div className="flex items-center">
                <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={tracks.find((t) => t.id === currentTrack)?.coverImage || "/placeholder.svg"}
                    alt="Now playing"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{tracks.find((t) => t.id === currentTrack)?.title}</h3>
                  <div className="mt-2 flex items-center">
                    <span className="mr-2 text-xs text-gray-500">
                      {formatTime(
                        (progress / 100) * parseTime(tracks.find((t) => t.id === currentTrack)?.duration || "0:00"),
                      )}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleProgressChange}
                      className="h-1 flex-grow appearance-none rounded-full bg-gray-300 accent-gray-800"
                    />
                    <span className="ml-2 text-xs text-gray-500">
                      {tracks.find((t) => t.id === currentTrack)?.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={cn(
                      "rounded-full p-2 transition-colors",
                      isShuffled ? "bg-yellow-200 text-gray-800" : "text-gray-500 hover:text-gray-800",
                    )}
                  >
                    <Shuffle size={18} />
                  </button>
                  <button
                    onClick={handlePrevTrack}
                    className="rounded-full p-2 text-gray-600 transition-colors hover:text-gray-800"
                  >
                    <SkipBack size={18} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white transition-transform hover:scale-105 hover:bg-black"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>
                  <button
                    onClick={handleNextTrack}
                    className="rounded-full p-2 text-gray-600 transition-colors hover:text-gray-800"
                  >
                    <SkipForward size={18} />
                  </button>
                  <button
                    onClick={() => setIsRepeating(!isRepeating)}
                    className={cn(
                      "rounded-full p-2 transition-colors",
                      isRepeating ? "bg-yellow-200 text-gray-800" : "text-gray-500 hover:text-gray-800",
                    )}
                  >
                    <Repeat size={18} />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowVisualizer(!showVisualizer)}
                    className={cn(
                      "rounded-md px-3 py-1 text-sm transition-colors",
                      showVisualizer ? "bg-yellow-200 text-gray-800" : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                    )}
                  >
                    {showVisualizer ? "Hide Visualizer" : "Show Visualizer"}
                  </button>
                  <button onClick={toggleMute} className="text-gray-600 hover:text-gray-800">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-1 w-24 appearance-none rounded-full bg-gray-300 accent-gray-800"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

// Helper function to format time from seconds to MM:SS
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

// Helper function to parse time from MM:SS to seconds
function parseTime(timeString: string): number {
  const [minutes, seconds] = timeString.split(":").map(Number)
  return minutes * 60 + seconds
}
