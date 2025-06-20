"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function SpaceChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm COSMOS, your AI space companion. Ask me anything about space, planets, astronomy, or space exploration!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const spaceResponses = {
    planets: [
      "Our solar system has 8 planets! Mercury is closest to the Sun, while Neptune is the farthest. Each planet has unique characteristics - Jupiter is the largest, Mars is known as the Red Planet, and Earth is the only one known to support life!",
      "Earth is truly special! It's the only planet in our solar system with liquid water on its surface, a protective atmosphere, and the perfect distance from the Sun to support life as we know it.",
      "Mars is fascinating! It has the largest volcano in the solar system (Olympus Mons), polar ice caps, and evidence of ancient water flows. We're actively exploring it with rovers like Perseverance!",
    ],
    space: [
      "Space is incredibly vast! The observable universe is about 93 billion light-years in diameter. It contains billions of galaxies, each with billions of stars, and possibly countless planets!",
      "Stars are massive balls of hot gas that produce energy through nuclear fusion. Our Sun is a medium-sized star, and there are stars much larger and smaller throughout the universe!",
      "The universe is about 13.8 billion years old and is constantly expanding. It started with the Big Bang and has been evolving ever since, creating the cosmic structures we see today!",
    ],
    nasa: [
      "NASA has achieved incredible milestones! From landing on the Moon with Apollo missions to sending rovers to Mars, launching the Hubble Space Telescope, and building the International Space Station!",
      "The James Webb Space Telescope is revolutionizing our understanding of the universe! It can see further into space and time than ever before, revealing the formation of the first galaxies!",
      "NASA's Artemis program aims to return humans to the Moon and establish a sustainable presence there, serving as a stepping stone for future Mars missions!",
    ],
    astronomy: [
      "Astronomy is the study of celestial objects and phenomena beyond Earth's atmosphere. It helps us understand our place in the universe and how everything is connected!",
      "The Moon affects Earth in many ways! It creates tides, stabilizes our planet's rotation, and gradually slows down Earth's rotation. Without it, our days would be much shorter!",
      "Comets are 'dirty snowballs' from the outer solar system. When they approach the Sun, they develop beautiful tails made of gas and dust that can stretch millions of kilometers!",
    ],
    iss: [
      "The International Space Station orbits Earth at about 408 km altitude, traveling at 27,600 km/h! It completes an orbit every 93 minutes and serves as a laboratory for scientific research!",
      "Astronauts on the ISS conduct experiments in microgravity, study Earth from space, and test technologies for future deep space missions. It's humanity's outpost in space!",
      "The ISS has been continuously occupied since November 2000! It's a symbol of international cooperation, with astronauts from many countries working together in space!",
    ],
    default: [
      "That's a great space question! The universe is full of mysteries waiting to be discovered. What specific aspect of space interests you most?",
      "Space exploration is one of humanity's greatest adventures! From the first satellite to Mars rovers, we're constantly pushing the boundaries of what's possible!",
      "Space science helps us understand not just the cosmos, but also our own planet and life itself. Every discovery opens new questions and possibilities!",
    ],
  }

  const getSpaceResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (
      message.includes("planet") ||
      message.includes("mars") ||
      message.includes("earth") ||
      message.includes("jupiter") ||
      message.includes("saturn")
    ) {
      return spaceResponses.planets[Math.floor(Math.random() * spaceResponses.planets.length)]
    }

    if (
      message.includes("space") ||
      message.includes("universe") ||
      message.includes("galaxy") ||
      message.includes("star")
    ) {
      return spaceResponses.space[Math.floor(Math.random() * spaceResponses.space.length)]
    }

    if (
      message.includes("nasa") ||
      message.includes("mission") ||
      message.includes("rocket") ||
      message.includes("apollo")
    ) {
      return spaceResponses.nasa[Math.floor(Math.random() * spaceResponses.nasa.length)]
    }

    if (
      message.includes("astronomy") ||
      message.includes("telescope") ||
      message.includes("moon") ||
      message.includes("comet")
    ) {
      return spaceResponses.astronomy[Math.floor(Math.random() * spaceResponses.astronomy.length)]
    }

    if (
      message.includes("iss") ||
      message.includes("space station") ||
      message.includes("astronaut") ||
      message.includes("orbit")
    ) {
      return spaceResponses.iss[Math.floor(Math.random() * spaceResponses.iss.length)]
    }

    return spaceResponses.default[Math.floor(Math.random() * spaceResponses.default.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getSpaceResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "Tell me about Mars",
    "What is the ISS?",
    "How big is the universe?",
    "What are black holes?",
    "When will we go to Mars?",
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] animate-scale-in">
          <Card className="h-full bg-black/95 border-blue-500/30 backdrop-blur-xl shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bot className="h-6 w-6 text-blue-400" />
                  <div>
                    <CardTitle className="text-white font-orbitron text-lg">COSMOS AI</CardTitle>
                    <p className="text-xs text-gray-400 font-space-mono">Space Knowledge Assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col h-full p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800/50 text-gray-100 border border-gray-700"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && <Bot className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />}
                        {message.sender === "user" && <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />}
                        <div className="text-sm leading-relaxed">{message.text}</div>
                      </div>
                      <div className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-gray-800">
                  <p className="text-xs text-gray-400 mb-2 font-space-mono">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-500/20 text-xs border-blue-500/30 text-blue-400"
                        onClick={() => {
                          setInputValue(question)
                          handleSendMessage()
                        }}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about space..."
                    className="flex-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-space-mono">
                  Ask about planets, space missions, astronomy, and more!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
