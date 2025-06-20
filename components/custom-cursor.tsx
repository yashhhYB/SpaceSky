"use client"

import { useState, useEffect } from "react"

const isHTMLElement = (t: EventTarget | null): t is HTMLElement =>
  !!t && typeof (t as HTMLElement).closest === "function"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handlePointerOver = (e: Event) => {
      if (!isHTMLElement(e.target)) return
      const element = e.target as HTMLElement

      if (
        element.tagName === "BUTTON" ||
        element.tagName === "A" ||
        element.closest("button, a, [role='button'], [tabindex]")
      ) {
        setIsHovering(true)
      }
    }

    const handlePointerOut = (e: Event) => {
      if (!isHTMLElement(e.target)) return
      const element = e.target as HTMLElement

      if (
        element.tagName === "BUTTON" ||
        element.tagName === "A" ||
        element.closest("button, a, [role='button'], [tabindex]")
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handlePointerOver, true)
    document.addEventListener("mouseout", handlePointerOut, true)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handlePointerOver, true)
      document.removeEventListener("mouseout", handlePointerOut, true)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-150 ease-out ${
          isHovering ? "scale-150" : "scale-100"
        }`}
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      />

      {/* Trailing cursor */}
      <div
        className={`fixed w-8 h-8 border border-blue-400/30 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovering ? "scale-125 border-purple-400/50" : "scale-100"
        }`}
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />
    </>
  )
}
