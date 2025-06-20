"use client"

import { useState, useEffect } from "react"
import { Globe, Play, Calendar, BookOpen, Star, Satellite } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "3D Planets", href: "/planets", icon: <Globe className="h-5 w-5" /> },
    { name: "Space Games", href: "/games", icon: <Play className="h-5 w-5" /> },
    { name: "Gallery", href: "/gallery", icon: <Star className="h-5 w-5" /> },
    { name: "Live Data", href: "/live-data", icon: <Satellite className="h-5 w-5" /> },
    { name: "Events", href: "/events", icon: <Calendar className="h-5 w-5" /> },
    { name: "Study Hub", href: "/study", icon: <BookOpen className="h-5 w-5" /> },
  ]

  return (
    <>
      {/* Top Logo Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md border-b border-gray-800/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-orbitron font-bold text-white group-hover:text-gradient transition-all duration-300">
                  SpaceSKY
                </span>
                <span className="text-xs text-gray-400 font-space-mono tracking-wider">EXPLORE THE UNIVERSE</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-1 bg-gray-900/50 rounded-full p-2 m-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 px-4 py-3 rounded-full transition-all duration-300 group hover:scale-105 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
                  <span className="text-xs font-medium font-space-mono">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
