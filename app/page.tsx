"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Star, Calendar, BookOpen, Play, Telescope, Satellite, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"
import SpaceScene from "@/components/space-scene"
import Navigation from "@/components/navigation"
import SpaceChatbot from "@/components/space-chatbot"
import CustomCursor from "@/components/custom-cursor"

export default function HomePage() {
  const [typingText, setTypingText] = useState("")
  const fullText = "Explore the Infinite Universe"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypingText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 120)

    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: <Play className="h-6 w-6" />,
      title: "Space Games",
      description: "Pilot spacecraft, explore planets, and discover the cosmos through interactive games",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "3D Planet Explorer",
      description: "Explore realistic 3D models of planets with NASA data and detailed information",
      color: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Celestial Database",
      description: "Comprehensive information about stars, comets, asteroids, and other space objects",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Astronomy Events",
      description: "Track upcoming eclipses, meteor showers, planetary alignments, and space missions",
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Study Hub",
      description: "Educational resources, courses, and materials for space science enthusiasts",
      color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    },
    {
      icon: <Telescope className="h-6 w-6" />,
      title: "Observatory",
      description: "Virtual telescope experiences and real-time space observations",
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
  ]

  const upcomingEvents = [
    { name: "Perseid Meteor Shower", date: "Aug 12-13", type: "Meteor Shower" },
    { name: "Jupiter Opposition", date: "Sep 26", type: "Planetary" },
    { name: "Partial Lunar Eclipse", date: "Oct 28", type: "Eclipse" },
    { name: "Geminids Meteor Shower", date: "Dec 13-14", type: "Meteor Shower" },
  ]

  const stats = [
    { number: "8", label: "Planets to Explore" },
    { number: "50+", label: "Interactive Games" },
    { number: "1000+", label: "Space Images" },
    { number: "24/7", label: "Live Space Data" },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-cosmic"></div>

        {/* Smoother Moving Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Smoother Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${12 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 pb-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <SpaceScene />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Badge
              variant="outline"
              className="bg-blue-500/10 text-blue-400 border-blue-400/30 mb-8 px-4 py-2 text-sm animate-glow"
            >
              Welcome to the Future of Space Exploration
            </Badge>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 animate-slide-up">
              <span className="text-gradient-cosmic">SpaceSKY</span>
            </h1>

            <div className="text-lg md:text-xl text-gray-300 mb-6 font-space-mono h-8 flex items-center justify-center">
              <span className="border-r-2 border-blue-400 pr-1">{typingText}</span>
            </div>
          </div>

          <p className="text-base md:text-lg text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto animate-slide-up">
            Embark on an incredible journey through the cosmos. Play space games, explore 3D planets, track astronomy
            events, and expand your knowledge of the universe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up mb-12">
            <Link href="/planets">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-300 animate-glow group"
              >
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="glass-effect rounded-xl p-4 hover-lift transform group-hover:scale-105 transition-all duration-300">
                  <div className="text-xl font-orbitron font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-400 font-space-mono">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 text-gradient">Discover the Universe</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto font-space-mono leading-relaxed">
              Immerse yourself in the wonders of space with our comprehensive platform designed for explorers, students,
              and space enthusiasts of all levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-slide-up hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card
                  className={`bg-gray-900/50 border ${feature.color} hover:border-opacity-50 transition-all duration-300 transform group-hover:scale-105 h-full`}
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:animate-pulse`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-white font-orbitron group-hover:text-gradient transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Space Gallery Showcase */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 text-gradient">Explore the Cosmos</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto font-space-mono">
              Journey through stunning space imagery and discover the wonders of our universe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover-lift group transform hover:scale-105">
              <div className="relative h-48">
                <img
                  src="/assets/images/astronaut-spacewalk.jpg"
                  alt="Astronaut Spacewalk"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-orbitron font-bold text-lg mb-1">Human Space Exploration</h3>
                  <p className="text-gray-300 text-sm">Discover the brave astronauts exploring beyond Earth</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover-lift group transform hover:scale-105">
              <div className="relative h-48">
                <img
                  src="/assets/images/space-station-earth.jpg"
                  alt="Space Station and Earth"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-orbitron font-bold text-lg mb-1">International Space Station</h3>
                  <p className="text-gray-300 text-sm">Humanity's outpost in low Earth orbit</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover-lift group transform hover:scale-105">
              <div className="relative h-48">
                <img
                  src="/assets/images/nebula-colorful.jpg"
                  alt="Colorful Nebula"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-orbitron font-bold text-lg mb-1">Stellar Nurseries</h3>
                  <p className="text-gray-300 text-sm">Where new stars are born in cosmic clouds</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="relative py-20 px-6 bg-gray-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 text-gradient">
              Upcoming Astronomy Events
            </h2>
            <p className="text-gray-400 text-lg font-space-mono">
              Don't miss these spectacular celestial events happening soon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover-lift group transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Calendar className="h-5 w-5 text-blue-400 group-hover:animate-pulse" />
                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-400/30">
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-orbitron font-semibold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {event.name}
                  </h3>
                  <p className="text-blue-400 font-space-mono font-medium">{event.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events">
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-6 py-2 font-orbitron transform hover:scale-105 transition-all duration-300"
              >
                <Calendar className="mr-2 h-4 w-4" />
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-2xl p-12 border border-blue-500/20 animate-fade-in group hover:scale-105 transition-all duration-300">
            <Satellite className="h-16 w-16 text-blue-400 mx-auto mb-6 animate-rotate-slow group-hover:animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 text-gradient">
              Ready to Explore the Cosmos?
            </h2>
            <p className="text-lg text-gray-300 mb-8 font-space-mono leading-relaxed">
              Join thousands of space enthusiasts and begin your journey through the universe today. Discover planets,
              play games, and unlock the mysteries of space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/planets">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-300 animate-glow"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/study">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-300"
                >
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Space Chatbot */}
      <SpaceChatbot />
    </div>
  )
}
