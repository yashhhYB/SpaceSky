import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import CustomCursor from "@/components/custom-cursor"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "SpaceSKY - Explore the Universe",
  description: "Your ultimate gateway to space exploration, 3D planets, games, and cosmic discoveries",
  keywords: "space, planets, astronomy, NASA, solar system, exploration, games, education",
  authors: [{ name: "SpaceSKY Team" }],
  openGraph: {
    title: "SpaceSKY - Explore the Universe",
    description: "Your ultimate gateway to space exploration",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} ${spaceMono.variable} font-inter antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CustomCursor />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
