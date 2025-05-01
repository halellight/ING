"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Code, Music, Headphones, BookOpen, Briefcase, GraduationCap, Award } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"background" | "skills" | "interests">("background")
  const [isLoaded, setIsLoaded] = useState(false)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Animation for skill bars
  useEffect(() => {
    if (isLoaded && activeTab === "skills" && skillsRef.current) {
      const skillBars = skillsRef.current.querySelectorAll(".skill-bar")
      skillBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.classList.add("animate-skill")
        }, index * 150)
      })
    }
  }, [isLoaded, activeTab])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <Link href="/" className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Profile sidebar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="mb-6 h-40 w-40 overflow-hidden rounded-full">
              <img src="/placeholder.svg?height=160&width=160" alt="Alex" className="h-full w-full object-cover" />
            </div>
            <h1 className="mb-2 text-2xl font-medium text-gray-900">I₦G</h1>
            <p className="mb-4 text-center text-gray-600">Python Developer & Musician</p>
            <div className="mb-6 flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="mailto:alex@example.com"
                className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Location</span>
                <span className="text-sm font-medium">San Francisco, CA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Experience</span>
                <span className="text-sm font-medium">5+ Years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Available for</span>
                <span className="text-sm font-medium">Freelance & Full-time</span>
              </div>
            </div>
            <div className="mt-6 w-full">
              <a
                href="/placeholder.svg"
                download="alex-resume.pdf"
                className="block w-full rounded-md bg-gray-800 px-4 py-2 text-center text-white transition-colors hover:bg-gray-700"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-2 space-y-6"
          >
            {/* Tabs */}
            <div className="mb-6 flex space-x-2 rounded-lg bg-white p-2 shadow-sm">
              <button
                onClick={() => setActiveTab("background")}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === "background"
                    ? "bg-gray-800 text-white"
                    : "bg-transparent text-gray-600 hover:bg-gray-100",
                )}
              >
                Background
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === "skills" ? "bg-gray-800 text-white" : "bg-transparent text-gray-600 hover:bg-gray-100",
                )}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveTab("interests")}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === "interests"
                    ? "bg-gray-800 text-white"
                    : "bg-transparent text-gray-600 hover:bg-gray-100",
                )}
              >
                Interests
              </button>
            </div>

            {/* Tab content */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              {activeTab === "background" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-900">About Me</h2>
                    <p className="text-gray-600">
                      I'm a passionate Python developer with a unique background in both computer science and music
                      production. With over 5 years of experience in software development, I specialize in data science,
                      machine learning, and audio processing. I love creating tools that bridge the gap between
                      technology and creativity.
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-900">Work Experience</h2>
                    <div className="space-y-4">
                      <div className="relative border-l border-gray-200 pl-6">
                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>
                        <h3 className="text-lg font-medium text-gray-900">Senior Python Developer</h3>
                        <p className="text-sm text-gray-600">TechAudio Inc. • 2022 - Present</p>
                        <p className="mt-2 text-gray-600">
                          Developing audio processing algorithms and machine learning models for music analysis and
                          generation. Leading a team of 3 developers on the core audio engine.
                        </p>
                      </div>
                      <div className="relative border-l border-gray-200 pl-6">
                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>
                        <h3 className="text-lg font-medium text-gray-900">Data Scientist</h3>
                        <p className="text-sm text-gray-600">DataViz Solutions • 2020 - 2022</p>
                        <p className="mt-2 text-gray-600">
                          Created interactive data visualizations and analysis tools for clients in various industries.
                          Specialized in time-series data and predictive modeling.
                        </p>
                      </div>
                      <div className="relative border-l border-gray-200 pl-6">
                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>
                        <h3 className="text-lg font-medium text-gray-900">Python Developer</h3>
                        <p className="text-sm text-gray-600">CodeCraft Studios • 2018 - 2020</p>
                        <p className="mt-2 text-gray-600">
                          Developed backend systems and APIs for web applications. Implemented automated testing and
                          continuous integration workflows.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-900">Education</h2>
                    <div className="space-y-4">
                      <div className="relative border-l border-gray-200 pl-6">
                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>
                        <h3 className="text-lg font-medium text-gray-900">M.S. in Computer Science</h3>
                        <p className="text-sm text-gray-600">Stanford University • 2016 - 2018</p>
                        <p className="mt-2 text-gray-600">
                          Specialized in Machine Learning and Artificial Intelligence. Thesis on "Neural Networks for
                          Audio Generation and Processing."
                        </p>
                      </div>
                      <div className="relative border-l border-gray-200 pl-6">
                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>
                        <h3 className="text-lg font-medium text-gray-900">B.S. in Computer Science</h3>
                        <p className="text-sm text-gray-600">University of California, Berkeley • 2012 - 2016</p>
                        <p className="mt-2 text-gray-600">
                          Minor in Music Technology. Graduated with honors. Participated in the university's electronic
                          music ensemble.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "skills" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                  ref={skillsRef}
                >
                  <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-900">Technical Skills</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Python</span>
                          <span className="text-sm text-gray-600">95%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div
                            className="skill-bar h-full rounded-full bg-gray-800 transition-all duration-1000"
                            style={{ width: "0%" }}
                            data-width="95%"
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Data Science & ML</span>
                          <span className="text-sm text-gray-600">90%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div
                            className="skill-bar h-full rounded-full bg-gray-800 transition-all duration-1000"
                            style={{ width: "0%" }}
                            data-width="90%"
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Audio Processing</span>
                          <span className="text-sm text-gray-600">85%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div
                            className="skill-bar h-full rounded-full bg-gray-800 transition-all duration-1000"
                            style={{ width: "0%" }}
                            data-width="85%"
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Web Development</span>
                          <span className="text-sm text-gray-600">75%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div
                            className="skill-bar h-full rounded-full bg-gray-800 transition-all duration-1000"
                            style={{ width: "0%" }}
                            data-width="75%"
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Music Production</span>
                          <span className="text-sm text-gray-600">80%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div
                            className="skill-bar h-full rounded-full bg-gray-800 transition-all duration-1000"
                            style={{ width: "0%" }}
                            data-width="80%"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-900">Tools & Technologies</h2>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Python",
                        "TensorFlow",
                        "PyTorch",
                        "NumPy",
                        "Pandas",
                        "Scikit-learn",
                        "Matplotlib",
                        "Librosa",
                        "Flask",
                        "Django",
                        "FastAPI",
                        "SQL",
                        "Git",
                        "Docker",
                        "AWS",
                        "Ableton Live",
                        "Max/MSP",
                        "SuperCollider",
                      ].map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-900">Certifications</h2>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-gray-700" />
                        <span className="text-gray-700">TensorFlow Developer Certificate</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-gray-700" />
                        <span className="text-gray-700">AWS Certified Machine Learning Specialist</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-gray-700" />
                        <span className="text-gray-700">Ableton Certified Trainer</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "interests" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-900">Professional Interests</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md">
                        <div className="mb-3 flex items-center">
                          <div className="mr-3 rounded-full bg-gray-100 p-2 text-gray-700">
                            <Code size={20} />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">Algorithmic Composition</h3>
                        </div>
                        <p className="text-gray-600">
                          Exploring the intersection of code and music through generative algorithms and AI-based
                          composition systems.
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md">
                        <div className="mb-3 flex items-center">
                          <div className="mr-3 rounded-full bg-gray-100 p-2 text-gray-700">
                            <Music size={20} />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">Audio Processing</h3>
                        </div>
                        <p className="text-gray-600">
                          Developing tools for audio analysis, manipulation, and synthesis using digital signal
                          processing techniques.
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md">
                        <div className="mb-3 flex items-center">
                          <div className="mr-3 rounded-full bg-gray-100 p-2 text-gray-700">
                            <BookOpen size={20} />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">Machine Learning</h3>
                        </div>
                        <p className="text-gray-600">
                          Applying neural networks and other ML techniques to solve complex problems in audio and music
                          domains.
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md">
                        <div className="mb-3 flex items-center">
                          <div className="mr-3 rounded-full bg-gray-100 p-2 text-gray-700">
                            <Briefcase size={20} />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">Open Source</h3>
                        </div>
                        <p className="text-gray-600">
                          Contributing to and maintaining open-source projects related to audio processing and music
                          technology.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-900">Personal Interests</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Headphones className="mr-3 mt-1 h-5 w-5 text-gray-700" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Electronic Music Production</h3>
                          <p className="text-gray-600">
                            I produce ambient and experimental electronic music, often incorporating sounds generated or
                            processed through my own Python algorithms.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <GraduationCap className="mr-3 mt-1 h-5 w-5 text-gray-700" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Teaching & Mentoring</h3>
                          <p className="text-gray-600">
                            I enjoy teaching programming and music technology, and regularly mentor junior developers
                            and musicians.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-3 mt-1 h-5 w-5 text-gray-700"
                        >
                          <path d="M2 12h20"></path>
                          <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0"></path>
                          <path d="M12 2a10 10 0 0 0-10 10"></path>
                          <path d="M12 12l4.3 4.3"></path>
                          <path d="M12 8v4"></path>
                        </svg>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Hiking & Travel</h3>
                          <p className="text-gray-600">
                            I love exploring nature and different cultures, often recording sounds from my travels to
                            use in my music projects.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
