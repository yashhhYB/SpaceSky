"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import { Calendar, Clock, MapPin, Star, Moon, Telescope, Satellite, Search, Bell } from "lucide-react"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const events = [
    {
      id: 1,
      name: "Perseid Meteor Shower Peak",
      date: "2024-08-12",
      time: "22:00 - 04:00",
      type: "Meteor Shower",
      category: "meteor",
      visibility: "Global",
      description:
        "The Perseid meteor shower reaches its peak, producing up to 60 meteors per hour. Best viewed from dark sky locations.",
      nextOccurrence: "Annual",
      difficulty: "Easy",
      equipment: "None required",
    },
    {
      id: 2,
      name: "Jupiter at Opposition",
      date: "2024-09-26",
      time: "All night",
      type: "Planetary",
      category: "planet",
      visibility: "Global",
      description:
        "Jupiter reaches opposition, appearing at its brightest and largest in the night sky. Perfect for telescope observations.",
      nextOccurrence: "Every 13 months",
      difficulty: "Easy",
      equipment: "Telescope recommended",
    },
    {
      id: 3,
      name: "Partial Lunar Eclipse",
      date: "2024-10-28",
      time: "20:35 - 00:53",
      type: "Eclipse",
      category: "eclipse",
      visibility: "Europe, Asia, Australia, Pacific",
      description: "A partial lunar eclipse will be visible, with the Moon passing through Earth's shadow.",
      nextOccurrence: "Variable",
      difficulty: "Easy",
      equipment: "Binoculars helpful",
    },
    {
      id: 4,
      name: "Geminids Meteor Shower",
      date: "2024-12-13",
      time: "21:00 - 06:00",
      type: "Meteor Shower",
      category: "meteor",
      visibility: "Global",
      description: "One of the best meteor showers of the year, producing up to 120 meteors per hour at peak.",
      nextOccurrence: "Annual",
      difficulty: "Easy",
      equipment: "None required",
    },
    {
      id: 5,
      name: "Mars Close Approach",
      date: "2024-11-18",
      time: "All night",
      type: "Planetary",
      category: "planet",
      visibility: "Global",
      description: "Mars makes its closest approach to Earth, appearing bright and red in the night sky.",
      nextOccurrence: "Every 26 months",
      difficulty: "Easy",
      equipment: "Telescope recommended",
    },
    {
      id: 6,
      name: "International Space Station Flyover",
      date: "2024-07-15",
      time: "21:45 - 21:51",
      type: "Satellite",
      category: "satellite",
      visibility: "North America",
      description: "The ISS will make a bright pass across the sky, visible to the naked eye.",
      nextOccurrence: "Daily (varies)",
      difficulty: "Easy",
      equipment: "None required",
    },
  ]

  const upcomingLaunches = [
    {
      name: "Artemis III Moon Landing",
      date: "2026-09-01",
      agency: "NASA",
      mission: "Crewed lunar landing mission",
      status: "Planned",
    },
    {
      name: "Europa Clipper Launch",
      date: "2024-10-14",
      agency: "NASA",
      mission: "Jupiter's moon Europa exploration",
      status: "Scheduled",
    },
    {
      name: "James Webb Space Telescope Observations",
      date: "Ongoing",
      agency: "NASA/ESA",
      mission: "Deep space observations",
      status: "Active",
    },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getEventIcon = (category: string) => {
    switch (category) {
      case "meteor":
        return <Star className="h-5 w-5" />
      case "planet":
        return <Telescope className="h-5 w-5" />
      case "eclipse":
        return <Moon className="h-5 w-5" />
      case "satellite":
        return <Satellite className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  const getEventColor = (category: string) => {
    switch (category) {
      case "meteor":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      case "planet":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      case "eclipse":
        return "bg-purple-500/20 text-purple-400 border-purple-400/30"
      case "satellite":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-16 px-4 max-w-7xl mx-auto">
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Astronomy Events Tracker
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Stay updated with upcoming celestial events, space missions, and astronomical phenomena. Never miss a
              spectacular show in the night sky!
            </p>
          </div>

          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="events" className="data-[state=active]:bg-blue-600">
                Celestial Events
              </TabsTrigger>
              <TabsTrigger value="launches" className="data-[state=active]:bg-blue-600">
                Space Missions
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-600">
                Event Calendar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                    className={
                      selectedCategory === "all" ? "bg-blue-600" : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedCategory === "meteor" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("meteor")}
                    className={
                      selectedCategory === "meteor"
                        ? "bg-yellow-600"
                        : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    Meteors
                  </Button>
                  <Button
                    variant={selectedCategory === "planet" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("planet")}
                    className={
                      selectedCategory === "planet" ? "bg-blue-600" : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    Planets
                  </Button>
                  <Button
                    variant={selectedCategory === "eclipse" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("eclipse")}
                    className={
                      selectedCategory === "eclipse"
                        ? "bg-purple-600"
                        : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    Eclipses
                  </Button>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const daysUntil = getDaysUntil(event.date)
                  return (
                    <Card
                      key={event.id}
                      className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            {getEventIcon(event.category)}
                            <Badge variant="outline" className={getEventColor(event.category)}>
                              {event.type}
                            </Badge>
                          </div>
                          {daysUntil > 0 && (
                            <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-400/30">
                              {daysUntil} days
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-white text-lg">{event.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-gray-300">{event.description}</CardDescription>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock className="h-4 w-4 mr-2" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.visibility}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <div className="text-xs text-gray-500">{event.equipment}</div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                          >
                            <Bell className="h-3 w-3 mr-1" />
                            Remind Me
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="launches" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingLaunches.map((launch, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-400/30">
                          {launch.agency}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            launch.status === "Active"
                              ? "bg-blue-500/20 text-blue-400 border-blue-400/30"
                              : launch.status === "Scheduled"
                                ? "bg-orange-500/20 text-orange-400 border-orange-400/30"
                                : "bg-gray-500/20 text-gray-400 border-gray-400/30"
                          }
                        >
                          {launch.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">{launch.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-gray-300">{launch.mission}</CardDescription>

                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {launch.date === "Ongoing"
                          ? "Ongoing Mission"
                          : new Date(launch.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                      </div>

                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Event Calendar View</CardTitle>
                  <CardDescription className="text-gray-400">
                    Interactive calendar showing all upcoming astronomy events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Calendar View Coming Soon</h3>
                    <p className="text-gray-400 mb-6">
                      We're working on an interactive calendar view to help you visualize all upcoming events.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Notified When Ready
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
