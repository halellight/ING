"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, Copy, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    title: "Data Visualization Tool",
    description: "A Python library for creating interactive data visualizations using matplotlib and plotly.",
    tags: ["Python", "Data Science", "Visualization"],
    github: "https://github.com",
    codeSnippet: `import matplotlib.pyplot as plt
import numpy as np

# Generate data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create visualization
plt.figure(figsize=(10, 6))
plt.plot(x, y, color='purple', linewidth=2)
plt.title('Sine Wave Visualization')
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.grid(True)
plt.show()`,
  },
  {
    id: 2,
    title: "Music Generation AI",
    description: "An AI model that generates music based on input parameters using TensorFlow and Python.",
    tags: ["Python", "TensorFlow", "Music", "AI"],
    github: "https://github.com",
    codeSnippet: `import tensorflow as tf
import numpy as np

# Define a simple music generation model
model = tf.keras.Sequential([
    tf.keras.layers.LSTM(128, return_sequences=True, 
                        input_shape=(sequence_length, features)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.LSTM(128),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(num_notes, activation='softmax')
])

# Compile the model
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Generate music
def generate_music(seed_sequence, length=100):
    generated = []
    current_sequence = seed_sequence
    
    for _ in range(length):
        # Predict next note
        predicted = model.predict(current_sequence)[0]
        next_note = np.argmax(predicted)
        generated.append(next_note)
        
        # Update sequence
        current_sequence = np.append(
            current_sequence[:, 1:, :],
            np.reshape(predicted, (1, 1, num_notes)),
            axis=1
        )
    
    return generated`,
  },
  {
    id: 3,
    title: "Automated Mixing Tool",
    description: "A tool that uses Python to automatically mix and master audio tracks.",
    tags: ["Python", "Audio Processing", "Music"],
    github: "https://github.com",
    codeSnippet: `import librosa
import numpy as np
import soundfile as sf
from scipy import signal

def auto_mix(tracks, output_file):
    # Load tracks
    audio_data = []
    sample_rate = None
    
    for track in tracks:
        data, sr = librosa.load(track, sr=None)
        if sample_rate is None:
            sample_rate = sr
        audio_data.append(data)
    
    # Normalize levels
    normalized = []
    for data in audio_data:
        normalized.append(data / np.max(np.abs(data)))
    
    # Apply EQ (simple high-pass filter example)
    processed = []
    for data in normalized:
        b, a = signal.butter(4, 100/(sample_rate/2), 'highpass')
        processed.append(signal.filtfilt(b, a, data))
    
    # Mix tracks
    mixed = np.zeros_like(processed[0])
    for data in processed:
        # Ensure same length
        if len(data) > len(mixed):
            data = data[:len(mixed)]
        elif len(data) < len(mixed):
            data = np.pad(data, (0, len(mixed) - len(data)))
        mixed += data
    
    # Final normalization
    mixed = mixed / np.max(np.abs(mixed)) * 0.9
    
    # Save output
    sf.write(output_file, mixed, sample_rate)
    
    return output_file`,
  },
]

export default function CodePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({})
  const codeRefs = useRef<{ [key: number]: HTMLPreElement | null }>({})

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleCopyCode = (projectId: number) => {
    const codeElement = codeRefs.current[projectId]
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.textContent || "")
      setCopiedStates({ ...copiedStates, [projectId]: true })
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [projectId]: false })
      }, 2000)
    }
  }

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <Link href="/" className="mb-8 inline-flex items-center text-gray-400 hover:text-white">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-4xl font-medium text-gray-200"
        >
          Code Projects
        </motion.h1>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ x: 100, opacity: 0 }}
              animate={isLoaded ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
            >
              <div className="border-b border-gray-800 bg-gray-950 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-medium text-gray-200">{project.title}</h2>
                  <div className="flex items-center space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      <Github size={20} />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 transition-colors hover:text-white"
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveProject(activeProject === project.id ? null : project.id)
                      }}
                    >
                      <ExternalLink size={20} />
                      <span className="sr-only">View Details</span>
                    </a>
                  </div>
                </div>
                <p className="mb-4 text-gray-400">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: activeProject === project.id ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="relative bg-gray-950 p-6">
                  <div className="absolute right-8 top-8 z-10">
                    <button
                      onClick={() => handleCopyCode(project.id)}
                      className="rounded bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                    >
                      {copiedStates[project.id] ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  <pre
                    ref={(el) => {
                        codeRefs.current[project.id] = el;
                      }}
                      
                    className="overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-green-400"
                  >
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 rounded-lg border border-gray-800 bg-gray-900 p-6"
        >
          <h2 className="mb-4 text-2xl font-medium text-gray-200">Interactive Python Demo</h2>
          <p className="mb-6 text-gray-400">
            Try out this interactive Python visualization. Click the button below to generate a new visualization.
          </p>
          <PythonVisualizer />
        </motion.div>
      </div>
    </main>
  )
}

function PythonVisualizer() {
  const [visualizationData, setVisualizationData] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (visualizationData.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set  return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set up drawing parameters
      const width = canvas.width
      const height = canvas.height
      const dataLength = visualizationData.length
      const barWidth = width / dataLength
      const maxValue = Math.max(...visualizationData)

      // Draw bars
      ctx.fillStyle = "#6366f1"
      visualizationData.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 40)
        ctx.fillRect(index * barWidth, height - barHeight - 20, barWidth - 1, barHeight)
      })

      // Draw line connecting points
      ctx.beginPath()
      ctx.strokeStyle = "#22d3ee"
      ctx.lineWidth = 2
      visualizationData.forEach((value, index) => {
        const x = index * barWidth + barWidth / 2
        const y = height - (value / maxValue) * (height - 40) - 20
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()
    }
  }, [visualizationData])

  const generateVisualization = () => {
    setIsGenerating(true)

    // Generate random data with a sine wave pattern
    const newData: number[] = []
    const dataPoints = 30

    for (let i = 0; i < dataPoints; i++) {
      // Base sine wave
      const sineValue = Math.sin((i / dataPoints) * Math.PI * 2)

      // Add some randomness
      const randomFactor = Math.random() * 0.3

      // Combine and scale to positive values
      const value = (sineValue + 1 + randomFactor) * 50
      newData.push(value)
    }

    // Simulate processing time
    setTimeout(() => {
      setVisualizationData(newData)
      setIsGenerating(false)
    }, 800)
  }

  return (
    <div className="space-y-4">
      <div className="h-64 w-full overflow-hidden rounded-lg bg-gray-800 p-4">
        <canvas ref={canvasRef} width={800} height={200} className="h-full w-full" />
      </div>
      <button
        onClick={generateVisualization}
        disabled={isGenerating}
        className={cn(
          "flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors",
          isGenerating
            ? "cursor-not-allowed bg-gray-700 text-gray-400"
            : "bg-purple-700 text-white hover:bg-purple-600",
        )}
      >
        {isGenerating ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating...
          </>
        ) : (
          "Generate New Visualization"
        )}
      </button>
      <div className="rounded-lg bg-gray-800 p-4">
        <h3 className="mb-2 text-lg font-medium text-gray-200">How it works</h3>
        <p className="text-gray-400">
          This visualization uses a combination of sine waves and random noise to generate data points. In a real
          application, this would be connected to actual Python code running on the server, processing real data or
          generating music patterns.
        </p>
      </div>
    </div>
  )
}
