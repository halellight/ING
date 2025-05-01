"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Loader2, Code, Music, Github, Mail, Linkedin, Terminal, BookOpen, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loadingPercentage, setLoadingPercentage] = useState(0)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorHidden, setCursorHidden] = useState(true)
  const cursorRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 25)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setCursorHidden(false)
    }

    const handleMouseLeave = () => {
      setCursorHidden(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`
    }
  }, [cursorPosition])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Navigation with animation
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <main className={cn("relative h-screen w-full overflow-hidden", theme === "light" ? "bg-yellow-100" : "bg-black")}>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white mix-blend-difference transition-opacity duration-300",
          cursorHidden ? "opacity-0" : "opacity-100",
        )}
      ></div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="absolute right-8 top-8 z-40 rounded-full p-2 text-gray-400 transition-colors hover:text-white"
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black"
          >
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
            <div className="absolute bottom-8 right-8 font-mono text-4xl font-bold text-white">
              {loadingPercentage.toString().padStart(3, "0")}%
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              <div
                className={cn(
                  "flex flex-col items-center justify-center p-8 text-center",
                  theme === "dark" ? "bg-black text-gray-300" : "bg-yellow-100 text-gray-800",
                )}
              >
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 text-5xl font-medium"
                >
                  Hello.
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={cn("mb-8 text-xl", theme === "dark" ? "text-gray-400" : "text-gray-600")}
                >
                  I'm I₦G, a Python developer and musician.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3"
                >
                  <button
                    onClick={() => handleNavigation("/code")}
                    className={cn(
                      "flex items-center justify-center space-x-2 rounded-md border px-4 py-2 transition-all hover:scale-105",
                      theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-400 text-gray-700 hover:bg-yellow-200",
                    )}
                  >
                    <Code size={18} />
                    <span>Code</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/music")}
                    className={cn(
                      "flex items-center justify-center space-x-2 rounded-md border px-4 py-2 transition-all hover:scale-105",
                      theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-400 text-gray-700 hover:bg-yellow-200",
                    )}
                  >
                    <Music size={18} />
                    <span>Music</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/about")}
                    className={cn(
                      "flex items-center justify-center space-x-2 rounded-md border px-4 py-2 transition-all hover:scale-105",
                      theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-400 text-gray-700 hover:bg-yellow-200",
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                    <span>About</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/terminal")}
                    className={cn(
                      "flex items-center justify-center space-x-2 rounded-md border px-4 py-2 transition-all hover:scale-105",
                      theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-400 text-gray-700 hover:bg-yellow-200",
                    )}
                  >
                    <Terminal size={18} />
                    <span>Terminal</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/blog")}
                    className={cn(
                      "flex items-center justify-center space-x-2 rounded-md border px-4 py-2 transition-all hover:scale-105",
                      theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-400 text-gray-700 hover:bg-yellow-200",
                    )}
                  >
                    <BookOpen size={18} />
                    <span>Blog</span>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8"
                >
                  <p className={cn("text-sm", theme === "dark" ? "text-gray-500" : "text-gray-600")}>
                    Hover over the right panel
                  </p>
                </motion.div>
              </div>

              <div
                className={cn(
                  "relative flex flex-col items-center justify-center overflow-hidden p-8 text-center transition-colors duration-500",
                  theme === "dark" ? "bg-gray-900" : "bg-yellow-50",
                )}
              >
                {/* Interactive background */}
                <div className="absolute inset-0 z-0">
                  <InteractiveBackground theme={theme} />
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="z-10 mb-8 h-32 w-32 overflow-hidden rounded-full bg-gray-200 shadow-xl transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="z-10 flex space-x-6"
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "transition-all hover:scale-125",
                      theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black",
                    )}
                  >
                    <Github size={24} />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="mailto:alex@example.com"
                    className={cn(
                      "transition-all hover:scale-125",
                      theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black",
                    )}
                  >
                    <Mail size={24} />
                    <span className="sr-only">Email</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "transition-all hover:scale-125",
                      theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black",
                    )}
                  >
                    <Linkedin size={24} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

// Interactive background component with particles
function InteractiveBackground({ theme }: { theme: "dark" | "light" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = 50
      const colors = theme === "dark" ? ["#8884", "#fff3", "#aaa4"] : ["#f0e68c44", "#ffd70044", "#daa52044"]

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Move particles away from mouse
        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          particle.x -= Math.cos(angle) * 1
          particle.y -= Math.sin(angle) * 1
        }

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    handleResize()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: theme === "dark" ? "#111" : "#fffde7" }}
    />
  )
}
