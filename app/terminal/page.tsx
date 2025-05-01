"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type CommandHistory = {
  command: string
  output: string
  isError?: boolean
}

export default function TerminalPage() {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([
    { command: "", output: "Welcome to Alex's Terminal. Type 'help' to see available commands." },
  ])
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory])

  // Focus input on click
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand()
    }
  }

  const processCommand = () => {
    const command = input.trim().toLowerCase()
    let output = ""
    let isError = false

    if (command === "") {
      return
    }

    // Process commands
    switch (command) {
      case "help":
        output = `
Available commands:
- help: Show this help message
- about: Learn about me
- skills: List my programming skills
- projects: Show my projects
- music: Information about my music
- contact: How to reach me
- clear: Clear the terminal
- python: Run a simple Python demo
`
        break
      case "about":
        output = `
Hi, I'm Alex! I'm a Python developer and musician based in [City].
I specialize in data science, machine learning, and audio processing.
I combine my passion for code and music to create unique digital experiences.
`
        break
      case "skills":
        output = `
Programming Skills:
- Python (Expert)
- Data Science & Machine Learning
- Audio Processing
- Web Development
- Algorithm Design
- Natural Language Processing
`
        break
      case "projects":
        output = `
Recent Projects:
1. Music Generation AI - A neural network that creates original music
2. Data Visualization Tool - Interactive visualizations for complex datasets
3. Automated Mixing Tool - Python-based audio processing for musicians
4. Personal Website - The site you're currently exploring
`
        break
      case "music":
        output = `
Music:
I produce electronic music with influences from ambient, IDM, and experimental genres.
My music often incorporates sounds generated or processed through my own Python algorithms.
Check out the Music section to listen to my tracks!
`
        break
      case "contact":
        output = `
Contact Information:
- Email: alex@example.com
- GitHub: github.com/alex
- LinkedIn: linkedin.com/in/alex
- Twitter: @alex_codes_music
`
        break
      case "clear":
        setCommandHistory([])
        setInput("")
        return
      case "python":
        output = `
Running Python demo...

# Simple music generation algorithm
import random
import time

notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
octaves = [3, 4, 5]
durations = [0.25, 0.5, 1]

def generate_melody(length=8):
    melody = []
    for _ in range(length):
        note = random.choice(notes)
        octave = random.choice(octaves)
        duration = random.choice(durations)
        melody.append((f"{note}{octave}", duration))
    return melody

print("Generating a random melody...")
melody = generate_melody()
for note, duration in melody:
    print(f"Playing {note} for {duration}s")
    time.sleep(0.3)  # Simulated delay
print("Melody complete!")

Output:
Generating a random melody...
Playing C4 for 0.5s
Playing E3 for 0.25s
Playing G5 for 1s
Playing D4 for 0.5s
Playing A3 for 0.25s
Playing F4 for 1s
Playing B4 for 0.5s
Playing E5 for 0.25s
Melody complete!
`
        break
      default:
        output = `Command not found: ${command}. Type 'help' to see available commands.`
        isError = true
    }

    setCommandHistory((prev) => [...prev, { command, output, isError }])
    setInput("")
  }

  return (
    <div className="min-h-screen bg-black p-4 text-green-400">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
        <Link href="/" className="mb-8 inline-flex items-center text-green-400 hover:text-green-300">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-lg border border-green-900 bg-black p-4 font-mono shadow-lg shadow-green-900/20"
      >
        <div className="mb-2 flex items-center border-b border-green-900 pb-2">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-sm text-green-400">alex@portfolio:~</div>
        </div>

        <div ref={terminalRef} className="h-[70vh] overflow-y-auto pb-4">
          {commandHistory.map((item, index) => (
            <div key={index} className="mb-2">
              {item.command && (
                <div className="flex">
                  <span className="mr-2 text-green-600">alex@portfolio:~$</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div className={`whitespace-pre-wrap ${item.isError ? "text-red-400" : "text-green-300"}`}>
                {item.output}
              </div>
            </div>
          ))}

          <div className="flex">
            <span className="mr-2 text-green-600">alex@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-green-300 outline-none"
              autoFocus
            />
            <span className={`h-5 w-2 bg-green-400 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
