import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import TransitionProvider from "./transition-provider"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alex Coder | Python Developer & Musician",
  description: "Portfolio of Alex, Python developer and musician",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
      {children}
        {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TransitionProvider></TransitionProvider>
        </ThemeProvider> */}
      </body>
    </html>
  )
}
