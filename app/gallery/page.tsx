"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import { Search, Download, Heart, Share2, ZoomIn } from "lucide-react"

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const images = [
    {
      id: 1,
      title: "Astronaut Spacewalk",
      description: "An astronaut performing a spacewalk outside the International Space Station",
      src: "/assets/images/astronaut-spacewalk.jpg",
      category: "human-exploration",
      tags: ["astronaut", "spacewalk", "ISS", "EVA"],
      resolution: "1920x1080",
      credit: "NASA",
    },
    {
      id: 2,
      title: "International Space Station",
      description: "The ISS orbiting Earth with our beautiful blue planet in the background",
      src: "/assets/images/space-station-earth.jpg",
      category: "space-stations",
      tags: ["ISS", "Earth", "orbit", "space station"],
      resolution: "1920x1080",
      credit: "NASA",
    },
    {
      id: 3,
      title: "Colorful Nebula",
      description: "A stunning nebula showcasing the birthplace of new stars",
      src: "/assets/images/nebula-colorful.jpg",
      category: "deep-space",
      tags: ["nebula", "stars", "cosmic", "colorful"],
      resolution: "1920x1080",
      credit: "Hubble Space Telescope",
    },
    {
      id: 4,
      title: "Spiral Galaxy",
      description: "A magnificent spiral galaxy showing billions of stars",
      src: "/assets/images/galaxy-spiral.jpg",
      category: "galaxies",
      tags: ["galaxy", "spiral", "stars", "cosmic"],
      resolution: "1920x1080",
      credit: "Hubble Space Telescope",
    },
    {
      id: 5,
      title: "Earth from Space",
      description: "Our beautiful blue marble as seen from space",
      src: "/assets/textures/earth-day.jpg",
      category: "planets",
      tags: ["Earth", "planet", "blue marble", "home"],
      resolution: "1024x1024",
      credit: "NASA",
    },
    {
      id: 6,
      title: "Mars Surface",
      description: "The rusty red surface of Mars showing its unique terrain",
      src: "/assets/textures/mars-surface.jpg",
      category: "planets",
      tags: ["Mars", "red planet", "surface", "terrain"],
      resolution: "1024x1024",
      credit: "NASA Mars Rovers",
    },
  ]

  const categories = [
    { id: "all", name: "All Images", count: images.length },
    { id: "planets", name: "Planets", count: images.filter((img) => img.category === "planets").length },
    { id: "deep-space", name: "Deep Space", count: images.filter((img) => img.category === "deep-space").length },
    {
      id: "human-exploration",
      name: "Human Exploration",
      count: images.filter((img) => img.category === "human-exploration").length,
    },
    {
      id: "space-stations",
      name: "Space Stations",
      count: images.filter((img) => img.category === "space-stations").length,
    },
    { id: "galaxies", name: "Galaxies", count: images.filter((img) => img.category === "galaxies").length },
  ]

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-16 px-4 max-w-7xl mx-auto">
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Space Image Gallery
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Explore stunning high-resolution images from space missions, telescopes, and astronomical observations.
              Discover the beauty and wonder of our universe.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search images, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square">
                  <img src={image.src || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-sm mb-1">{image.title}</h3>
                      <p className="text-gray-300 text-xs line-clamp-2">{image.description}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-400/30 text-xs">
                      {image.category.replace("-", " ")}
                    </Badge>
                    <span className="text-xs text-gray-500">{image.resolution}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {image.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-gray-500/20 text-gray-400 border-gray-400/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Credit: {image.credit}</span>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400 p-1">
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-400 p-1">
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400 p-1">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No images found matching your search criteria.</div>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl max-h-full bg-gray-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <Button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                size="sm"
              >
                ✕
              </Button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
              <p className="text-gray-300 mb-4">{selectedImage.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedImage.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  <div>Resolution: {selectedImage.resolution}</div>
                  <div>Credit: {selectedImage.credit}</div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
