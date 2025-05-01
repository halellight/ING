"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, Share2, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const blogPosts = [
  {
    id: "1",
    title: "Building a Music Visualizer with Python and Web Audio API",
    content: `
# Building a Music Visualizer with Python and Web Audio API

Music visualization is a fascinating intersection of audio processing and visual design. In this tutorial, we'll create a cross-platform music visualizer that processes audio with Python and displays real-time visualizations in the browser.

## Prerequisites

Before we begin, make sure you have:

- Python 3.8+ installed
- Basic knowledge of JavaScript and HTML
- Familiarity with audio concepts

## Setting Up the Python Backend

First, we'll create a Python script that analyzes audio in real-time:

\`\`\`python
import numpy as np
import librosa
import pyaudio
import time
import json
import websockets
import asyncio

# Audio parameters
CHUNK = 2048
FORMAT = pyaudio.paFloat32
CHANNELS = 1
RATE = 44100

# Initialize PyAudio
p = pyaudio.PyAudio()
stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

async def audio_server(websocket, path):
    """WebSocket server that sends audio analysis data to clients"""
    try:
        while True:
            # Read audio data
            data = np.frombuffer(stream.read(CHUNK), dtype=np.float32)
            
            # Perform FFT
            spectrum = np.abs(np.fft.rfft(data))
            
            # Normalize and convert to dB scale
            spectrum = 20 * np.log10(spectrum + 1e-10)
            
            # Divide spectrum into frequency bands
            bands = 64
            spectrum_bands = np.array_split(spectrum, bands)
            band_averages = [float(np.mean(band)) for band in spectrum_bands]
            
            # Normalize band averages to 0-1 range
            min_val = min(band_averages)
            max_val = max(band_averages)
            normalized = [(val - min_val) / (max_val - min_val) for val in band_averages]
            
            # Send to client
            await websocket.send(json.dumps({"spectrum": normalized}))
            
            # Slight delay to prevent overwhelming the client
            await asyncio.sleep(0.03)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Clean up
        if stream:
            stream.stop_stream()
            stream.close()
        if p:
            p.terminate()

# Start WebSocket server
start_server = websockets.serve(audio_server, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
\`\`\`

## Creating the Web Frontend

Next, we'll build a web interface to display our visualizations:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Visualizer</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #000;
        }
        canvas {
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="visualizer"></canvas>
    
    <script>
        // Set up canvas
        const canvas = document.getElementById('visualizer');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Connect to WebSocket server
        const socket = new WebSocket('ws://localhost:8765');
        
        // Handle incoming data
        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            drawVisualization(data.spectrum);
        };
        
        // Draw visualization
        function drawVisualization(spectrum) {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = canvas.width / spectrum.length;
            const centerY = canvas.height / 2;
            
            // Draw mirrored bars
            for (let i = 0; i < spectrum.length; i++) {
                const barHeight = spectrum[i] * (canvas.height / 2);
                
                // Create gradient
                const gradient = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY);
                gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
                gradient.addColorStop(1, 'rgba(0, 0, 255, 0.4)');
                
                // Draw top bar
                ctx.fillStyle = gradient;
                ctx.fillRect(i * barWidth, centerY - barHeight, barWidth - 2, barHeight);
                
                // Draw bottom bar (mirrored)
                ctx.fillRect(i * barWidth, centerY, barWidth - 2, barHeight);
            }
            
            // Draw center line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(canvas.width, centerY);
            ctx.stroke();
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    </script>
</body>
</html>
\`\`\`

## Connecting Python and JavaScript

The magic happens when we connect our Python audio analysis with our JavaScript visualization. The WebSocket protocol allows real-time communication between the two.

## Advanced Techniques

For more advanced visualizations, consider:

1. Using Three.js for 3D visualizations
2. Implementing beat detection algorithms
3. Adding user controls for visualization styles
4. Incorporating machine learning for pattern recognition

## Conclusion

By combining Python's powerful audio processing capabilities with web technologies, we've created a cross-platform music visualizer that can be extended in countless ways. Experiment with different visualization techniques and audio analysis methods to create your own unique audio-visual experience.
    `,
    date: "April 8, 2025",
    readTime: "8 min read",
    tags: ["Python", "Web Audio", "Visualization"],
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "Alex",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    comments: 12,
  },
  {
    id: "2",
    title: "Machine Learning for Music Composition: A Beginner's Guide",
    content: `
# Machine Learning for Music Composition: A Beginner's Guide

Artificial intelligence is revolutionizing music composition. In this guide, we'll explore how to use machine learning models to generate original music with Python and TensorFlow.

## Understanding Music Generation

Music generation involves creating new musical content using algorithms. With machine learning, we can train models on existing music to generate new compositions that sound similar but are original.

## Setting Up Your Environment

First, let's set up our Python environment with the necessary libraries:

\`\`\`python
# Install required packages
!pip install tensorflow music21 numpy matplotlib

import tensorflow as tf
import music21 as m21
import numpy as np
import matplotlib.pyplot as plt
import os
\`\`\`

## Preparing the Data

We need to prepare our musical data for the model:

\`\`\`python
def preprocess_midi(dataset_path):
    """Process all MIDI files in the dataset"""
    notes = []
    
    for file in os.listdir(dataset_path):
        if file.endswith(".mid"):
            midi = m21.converter.parse(os.path.join(dataset_path, file))
            
            # Extract notes and chords
            notes_to_parse = None
            parts = m21.instrument.partitionByInstrument(midi)
            
            if parts:  # File has instrument parts
                notes_to_parse = parts.parts[0].recurse()
            else:  # File has notes in a flat structure
                notes_to_parse = midi.flat.notes
            
            for element in notes_to_parse:
                if isinstance(element, m21.note.Note):
                    notes.append(str(element.pitch))
                elif isinstance(element, m21.chord.Chord):
                    notes.append('.'.join(str(n) for n in element.normalOrder))
    
    return notes

# Process dataset
notes = preprocess_midi('path/to/midi/files')
\`\`\`

## Building the Model

Now, let's create a simple LSTM model for music generation:

\`\`\`python
def create_sequences(notes, sequence_length=100):
    """Create input sequences and corresponding outputs"""
    # Create mapping between notes and integers
    pitchnames = sorted(set(notes))
    note_to_int = {note: number for number, note in enumerate(pitchnames)}
    
    # Create sequences
    network_input = []
    network_output = []
    
    for i in range(0, len(notes) - sequence_length, 1):
        sequence_in = notes[i:i + sequence_length]
        sequence_out = notes[i + sequence_length]
        network_input.append([note_to_int[char] for char in sequence_in])
        network_output.append(note_to_int[sequence_out])
    
    # Reshape and normalize input
    n_patterns = len(network_input)
    n_vocab = len(pitchnames)
    
    network_input = np.reshape(network_input, (n_patterns, sequence_length, 1))
    network_input = network_input / float(n_vocab)
    
    # One-hot encode the output
    network_output = tf.keras.utils.to_categorical(network_output)
    
    return (network_input, network_output, n_vocab, pitchnames)

# Create sequences
network_input, network_output, n_vocab, pitchnames = create_sequences(notes)

# Build the LSTM model
model = tf.keras.Sequential([
    tf.keras.layers.LSTM(256, input_shape=(network_input.shape[1], network_input.shape[2]), return_sequences=True),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.LSTM(512, return_sequences=True),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.LSTM(256),
    tf.keras.layers.Dense(256),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(n_vocab, activation='softmax')
])

model.compile(loss='categorical_crossentropy', optimizer='rmsprop')
\`\`\`

## Training the Model

Let's train our model on the prepared data:

\`\`\`python
# Train the model
history = model.fit(network_input, network_output, epochs=50, batch_size=64)

# Plot training history
plt.figure(figsize=(12, 5))
plt.plot(history.history['loss'])
plt.title('Model Loss During Training')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.show()

# Save the model
model.save('music_generator.h5')
\`\`\`

## Generating Music

Now we can use our trained model to generate new music:

\`\`\`python
def generate_notes(model, network_input, pitchnames, n_vocab, notes_to_generate=500):
    """Generate notes using the trained model"""
    # Pick a random sequence from the input as a starting point
    start = np.random.randint(0, len(network_input)-1)
    int_to_note = {number: note for number, note in enumerate(pitchnames)}
    pattern = network_input[start]
    prediction_output = []
    
    # Generate notes
    for _ in range(notes_to_generate):
        prediction_input = np.reshape(pattern, (1, len(pattern), 1))
        prediction_input = prediction_input / float(n_vocab)
        
        prediction = model.predict(prediction_input, verbose=0)
        
        # Get the index with the highest probability
        index = np.argmax(prediction)
        
        # Map the index to the corresponding note
        result = int_to_note[index]
        prediction_output.append(result)
        
        # Remove the first value and append the prediction for the next iteration
        pattern = np.append(pattern[1:], [[index/float(n_vocab)]], axis=0)
    
    return prediction_output

# Generate notes
generated_notes = generate_notes(model, network_input, pitchnames, n_vocab)

# Convert notes to MIDI
def create_midi(notes_array, filename="generated_music.mid"):
    """Convert the generated notes to a MIDI file"""
    offset = 0
    output_notes = []
    
    # Create note and chord objects
    for pattern in notes_array:
        # Pattern is a chord
        if ('.' in pattern) or pattern.isdigit():
            notes_in_chord = pattern.split('.')
            notes = []
            for current_note in notes_in_chord:
                new_note = m21.note.Note(int(current_note))
                new_note.storedInstrument = m21.instrument.Piano()
                notes.append(new_note)
            new_chord = m21.chord.Chord(notes)
            new_chord.offset = offset
            output_notes.append(new_chord)
        # Pattern is a note
        else:
            new_note = m21.note.Note(pattern)
            new_note.offset = offset
            new_note.storedInstrument = m21.instrument.Piano()
            output_notes.append(new_note)
        
        # Increase offset for next note/chord
        offset += 0.5
    
    # Create a stream and write to MIDI file
    midi_stream = m21.stream.Stream(output_notes)
    midi_stream.write('midi', fp=filename)

# Create MIDI file
create_midi(generated_notes)
\`\`\`

## Conclusion

We've just scratched the surface of what's possible with machine learning for music composition. As you become more comfortable with these techniques, you can experiment with:

1. Different model architectures (Transformers, GANs)
2. Style transfer between musical genres
3. Conditioning the generation on specific parameters
4. Multi-track music generation

The intersection of AI and music is a rapidly evolving field with endless creative possibilities. Happy composing!
    `,
    date: "March 22, 2025",
    readTime: "12 min read",
    tags: ["Machine Learning", "Music", "TensorFlow"],
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "Alex",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    comments: 8,
  },
]

export default function BlogPostPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [post, setPost] = useState<(typeof blogPosts)[0] | null>(null)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    setIsLoaded(true)
    const foundPost = blogPosts.find((p) => p.id === id)
    setPost(foundPost || null)
  }, [id])

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold text-gray-800">Post not found</h1>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">
            Return to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <Link href="/blog" className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, x: -100 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-lg bg-white shadow-sm"
        >
          <div className="h-64 overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover" />
          </div>

          <div className="p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-4 text-3xl font-semibold text-gray-900">{post.title}</h1>

            <div className="mb-6 flex items-center">
              <img
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                className="mr-3 h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span className="mr-3">{post.date}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4">
                <button className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
                  <MessageSquare size={16} className="mr-1" />
                  {post.comments} Comments
                </button>
                <button className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
                  <Share2 size={16} className="mr-1" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </main>
  )
}

// Simple markdown to HTML converter (in a real app, use a proper markdown library)
function markdownToHtml(markdown: string): string {
  const html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
    // Code blocks
    .replace(
      /```(.*?)\n([\s\S]*?)```/g,
      '<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto my-4"><code>$2</code></pre>',
    )
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded">$1</code>')
    // Lists
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    // Paragraphs
    .replace(/^(?!<h|<pre|<li|<code)(.*$)/gm, '<p class="mb-4">$1</p>')
    // Line breaks
    .replace(/\n/g, "")

  return html
}
