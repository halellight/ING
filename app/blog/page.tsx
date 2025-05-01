"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const blogPosts = [
  {
    id: 1,
    title: "Building a Music Visualizer with Python and Web Audio API",
    excerpt:
      "Learn how to create a cross-platform music visualizer that processes audio with Python and displays real-time visualizations in the browser.",
    date: "April 8, 2025",
    readTime: "8 min read",
    tags: ["Python", "Web Audio", "Visualization"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Machine Learning for Music Composition: A Beginner's Guide",
    excerpt:
      "Discover how to use machine learning models to generate original music compositions with Python and TensorFlow.",
    date: "March 22, 2025",
    readTime: "12 min read",
    tags: ["Machine Learning", "Music", "TensorFlow"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Creating Custom Audio Effects with Python",
    excerpt: "A step-by-step tutorial on building your own audio effects processors using Python's audio libraries.",
    date: "February 15, 2025",
    readTime: "10 min read",
    tags: ["Python", "Audio Processing", "DSP"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "From Code to Concert: Programming Your Live Music Performance",
    excerpt: "How to use Python to create interactive elements for your live music performances.",
    date: "January 30, 2025",
    readTime: "15 min read",
    tags: ["Live Performance", "Python", "MIDI"],
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Filter posts based on selected tag and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    return matchesTag && matchesSearch
  })

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <Link href="/" className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <h1 className="text-4xl font-medium text-gray-800">Blog</h1>

          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              "rounded-full px-3 py-1 text-sm transition-colors",
              selectedTag === null ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300",
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "rounded-full px-3 py-1 text-sm transition-colors",
                selectedTag === tag ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300",
              )}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <div className="space-y-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ x: -100, opacity: 0 }}
                animate={isLoaded ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="h-48 overflow-hidden md:h-full">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6 md:col-span-2">
                    <div>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              selectedTag === tag ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800",
                            )}
                          >
                            <Tag size={12} className="mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="mb-2 text-xl font-semibold text-gray-900">{post.title}</h2>
                      <p className="mb-4 text-gray-600">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-3">{post.date}</span>
                        <Clock size={14} className="mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700"
                      >
                        Read more
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-gray-200 bg-white p-8 text-center"
            >
              <p className="text-gray-600">No articles found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}
