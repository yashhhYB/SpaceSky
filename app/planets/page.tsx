"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Html, Environment, PerspectiveCamera, useTexture } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/navigation"
import * as THREE from "three"

interface PlanetData {
  name: string
  position: [number, number, number]
  size: number
  color: string
  textureUrl?: string
  distance: string
  diameter: string
  temperature: string
  facts: string[]
  moons: number
  dayLength: string
  yearLength: string
  atmosphere: string
  gravity: string
  discovered: string
  rotationSpeed: number
}

function Planet3D({
  planet,
  onClick,
  isSelected,
}: {
  planet: PlanetData
  onClick: () => void
  isSelected: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Load texture with fallback
  const texture = planet.textureUrl ? useTexture(planet.textureUrl) : null
  if (planet.textureUrl && !texture) {
    console.warn(`Failed to load texture for ${planet.name}:`)
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed

      if (isSelected) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
      } else {
        meshRef.current.scale.setScalar(hovered ? 1.1 : 1)
      }
    }
  })

  return (
    <group position={planet.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[planet.size, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color={texture ? "#ffffff" : planet.color}
          roughness={0.8}
          metalness={0.1}
          emissive={isSelected ? "#ffffff" : "#000000"}
          emissiveIntensity={isSelected ? 0.1 : 0}
        />
      </mesh>

      {/* Planet rings for Saturn */}
      {planet.name === "Saturn" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.size + 0.3, planet.size + 0.8, 64]} />
          <meshStandardMaterial color="#fab27b" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Jupiter's Great Red Spot */}
      {planet.name === "Jupiter" && (
        <mesh position={[0, 0, planet.size + 0.01]}>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial color="#ff4444" transparent opacity={0.8} />
        </mesh>
      )}

      <Text
        position={[0, planet.size + 1.5, 0]}
        fontSize={0.4}
        color={isSelected ? "#00ff00" : hovered ? "#ffff00" : "white"}
        anchorX="center"
        anchorY="middle"
      >
        {planet.name}
      </Text>

      {hovered && !isSelected && (
        <Html distanceFactor={8}>
          <div className="bg-black/90 text-white p-3 rounded-lg backdrop-blur-sm border border-gray-600 max-w-xs">
            <h3 className="font-bold text-sm mb-1">{planet.name}</h3>
            <p className="text-xs text-gray-300 mb-1">{planet.distance}</p>
            <p className="text-xs text-blue-400">Click to explore</p>
          </div>
        </Html>
      )}
    </group>
  )
}

function SolarSystem({
  planets,
  onPlanetClick,
  selectedPlanet,
}: {
  planets: PlanetData[]
  onPlanetClick: (planet: PlanetData) => void
  selectedPlanet: PlanetData | null
}) {
  const sunRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005
    }
  })

  return (
    <>
      {/* Sun */}
      <mesh ref={sunRef} position={[0, 0, -20]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.5} />
      </mesh>

      {/* Sun's glow effect */}
      <mesh position={[0, 0, -20]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial color="#ffaa00" transparent opacity={0.1} emissive="#ffaa00" emissiveIntensity={0.2} />
      </mesh>

      {/* Planets */}
      {planets.map((planet) => (
        <Planet3D
          key={planet.name}
          planet={planet}
          onClick={() => onPlanetClick(planet)}
          isSelected={selectedPlanet?.name === planet.name}
        />
      ))}

      {/* Asteroid belt */}
      {Array.from({ length: 200 }, (_, i) => {
        const angle = (i / 200) * Math.PI * 2
        const radius = 15 + Math.random() * 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (Math.random() - 0.5) * 2

        return (
          <mesh key={i} position={[x, y, z]}>
            <dodecahedronGeometry args={[0.02 + Math.random() * 0.08]} />
            <meshStandardMaterial color="#8B7355" />
          </mesh>
        )
      })}

      {/* Orbital paths */}
      {planets.map((planet, index) => {
        const radius = Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2)
        const points = []
        for (let i = 0; i <= 64; i++) {
          const angle = (i / 64) * Math.PI * 2
          points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        return (
          <line key={`orbit-${index}`}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial attach="material" color="#444444" transparent opacity={0.3} />
          </line>
        )
      })}
    </>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
        <div>Loading Solar System...</div>
      </div>
    </Html>
  )
}

export default function PlanetsPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
  const [cameraMode, setCameraMode] = useState<"overview" | "focused">("overview")

  const planets: PlanetData[] = [
    {
      name: "Mercury",
      position: [-8, 0, 0],
      size: 0.8,
      color: "#8c7853",
      textureUrl: "/placeholder.svg?height=512&width=512",
      distance: "57.9 million km from Sun",
      diameter: "4,879 km",
      temperature: "427°C (day), -173°C (night)",
      moons: 0,
      dayLength: "59 Earth days",
      yearLength: "88 Earth days",
      atmosphere: "None",
      gravity: "3.7 m/s²",
      discovered: "Known since ancient times",
      rotationSpeed: 0.005,
      facts: [
        "Closest planet to the Sun",
        "No atmosphere or moons",
        "Extreme temperature variations",
        "Has a large iron core",
        "Heavily cratered surface",
      ],
    },
    {
      name: "Venus",
      position: [-4, 2, 0],
      size: 1.0,
      color: "#ffc649",
      textureUrl: "/placeholder.svg?height=512&width=512",
      distance: "108.2 million km from Sun",
      diameter: "12,104 km",
      temperature: "462°C (surface)",
      moons: 0,
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      atmosphere: "96% CO₂, 3.5% N₂",
      gravity: "8.87 m/s²",
      discovered: "Known since ancient times",
      rotationSpeed: 0.003,
      facts: [
        "Hottest planet in solar system",
        "Thick, toxic atmosphere",
        "Rotates backwards (retrograde)",
        "Often called Earth's twin",
        "Surface pressure 90x Earth's",
      ],
    },
    {
      name: "Earth",
      position: [0, 0, 0],
      size: 1.2,
      color: "#6b93d6",
      textureUrl: "/placeholder.svg?height=512&width=512",
      distance: "149.6 million km from Sun",
      diameter: "12,756 km",
      temperature: "15°C (average)",
      moons: 1,
      dayLength: "24 hours",
      yearLength: "365.25 days",
      atmosphere: "78% N₂, 21% O₂",
      gravity: "9.8 m/s²",
      discovered: "Our home planet",
      rotationSpeed: 0.01,
      facts: [
        "Only known planet with life",
        "71% of surface is water",
        "Has one natural satellite (Moon)",
        "Protective magnetic field",
        "Active plate tectonics",
      ],
    },
    {
      name: "Mars",
      position: [4, -1, 0],
      size: 0.9,
      color: "#cd5c5c",
      textureUrl: "/placeholder.svg?height=512&width=512",
      distance: "227.9 million km from Sun",
      diameter: "6,792 km",
      temperature: "-65°C (average)",
      moons: 2,
      dayLength: "24.6 hours",
      yearLength: "687 Earth days",
      atmosphere: "95% CO₂, 3% N₂",
      gravity: "3.71 m/s²",
      discovered: "Known since ancient times",
      rotationSpeed: 0.008,
      facts: [
        "Known as the Red Planet",
        "Has the largest volcano (Olympus Mons)",
        "Two small moons: Phobos and Deimos",
        "Evidence of ancient water flows",
        "Polar ice caps made of water and CO₂",
      ],
    },
    {
      name: "Jupiter",
      position: [8, 1, 0],
      size: 2.0,
      color: "#d8ca9d",
      textureUrl: "/placeholder.svg?height=512&width=512",
      distance: "778.5 million km from Sun",
      diameter: "142,984 km",
      temperature: "-110°C (cloud tops)",
      moons: 95,
      dayLength: "9.9 hours",
      yearLength: "12 Earth years",
      atmosphere: "89% H₂, 10% He",
      gravity: "24.79 m/s²",
      discovered: "Known since ancient times",
      rotationSpeed: 0.02,
      facts: [
        "Largest planet in solar system",
        "Great Red Spot is a giant storm",
        "Has over 95 known moons",
        "Acts as solar system's vacuum cleaner",
        "Could fit all other planets inside it",
      ],
    },
    {
      name: "Saturn",
      position: [12, -2, 0],
      size: 1.8,
      color: "#fab27b",
      textureUrl: "/placeholder.svg?height=512&width=512",
      distance: "1.43 billion km from Sun",
      diameter: "120,536 km",
      temperature: "-140°C (cloud tops)",
      moons: 146,
      dayLength: "10.7 hours",
      yearLength: "29 Earth years",
      atmosphere: "96% H₂, 3% He",
      gravity: "10.44 m/s²",
      discovered: "Known since ancient times",
      rotationSpeed: 0.015,
      facts: [
        "Famous for its spectacular ring system",
        "Less dense than water",
        "Has over 140 known moons",
        "Titan is larger than Mercury",
        "Hexagonal storm at north pole",
      ],
    },
  ]

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedPlanet(planet)
    setCameraMode("focused")
  }

  const resetView = () => {
    setSelectedPlanet(null)
    setCameraMode("overview")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-16 flex">
        {/* 3D Scene */}
        <div className="w-2/3 h-screen relative">
          <Canvas>
            <PerspectiveCamera
              makeDefault
              position={
                cameraMode === "focused" && selectedPlanet
                  ? [selectedPlanet.position[0], selectedPlanet.position[1] + 3, selectedPlanet.position[2] + 5]
                  : [0, 8, 20]
              }
              fov={75}
            />

            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, -20]} intensity={2} color="#ffaa00" />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4f46e5" />

            <Suspense fallback={<LoadingFallback />}>
              <Environment preset="night" />
              <SolarSystem planets={planets} onPlanetClick={handlePlanetClick} selectedPlanet={selectedPlanet} />
            </Suspense>

            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              target={selectedPlanet ? selectedPlanet.position : [0, 0, 0]}
              maxDistance={50}
              minDistance={3}
              autoRotate={cameraMode === "overview"}
              autoRotateSpeed={0.5}
            />
          </Canvas>

          {/* View Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button
              onClick={resetView}
              variant="outline"
              className="bg-black/80 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Solar System View
            </Button>
            {selectedPlanet && (
              <Button onClick={() => setCameraMode("focused")} className="bg-blue-600 hover:bg-blue-700 w-full">
                Focus on {selectedPlanet.name}
              </Button>
            )}
          </div>

          {/* Loading indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-gray-600">
              <div className="text-xs text-gray-400">
                🖱️ Click & drag to rotate • 🔍 Scroll to zoom • 🪐 Click planets to explore
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="w-1/3 p-6 bg-gray-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Solar System Explorer
            </h1>
            <p className="text-gray-400">Interactive 3D exploration of our solar system with detailed planetary data</p>
          </div>

          {selectedPlanet ? (
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-white">{selectedPlanet.name}</CardTitle>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                      Planet
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300">{selectedPlanet.distance}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Diameter:</span>
                      <div className="text-white font-medium">{selectedPlanet.diameter}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Temperature:</span>
                      <div className="text-white font-medium">{selectedPlanet.temperature}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Moons:</span>
                      <div className="text-white font-medium">{selectedPlanet.moons}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Day Length:</span>
                      <div className="text-white font-medium">{selectedPlanet.dayLength}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Year Length:</span>
                      <div className="text-white font-medium">{selectedPlanet.yearLength}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Gravity:</span>
                      <div className="text-white font-medium">{selectedPlanet.gravity}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400">Atmosphere:</span>
                      <div className="text-white font-medium">{selectedPlanet.atmosphere}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Interesting Facts</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {selectedPlanet.facts.map((fact: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">Discovery: {selectedPlanet.discovered}</div>
                    <Button
                      onClick={resetView}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Explore Other Planets
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Planet Comparison */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Size Comparison to Earth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Relative Size:</span>
                      <span className="text-white">{((selectedPlanet.size / 1.2) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(selectedPlanet.size / 1.2) * 100} className="h-2" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Distance from Sun:</span>
                      <span className="text-white">{selectedPlanet.distance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exploration Stats */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Exploration History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Missions Sent:</span>
                      <span className="text-white">
                        {selectedPlanet.name === "Mars"
                          ? "50+"
                          : selectedPlanet.name === "Venus"
                            ? "40+"
                            : selectedPlanet.name === "Jupiter"
                              ? "10+"
                              : selectedPlanet.name === "Saturn"
                                ? "5+"
                                : selectedPlanet.name === "Mercury"
                                  ? "3"
                                  : "0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">First Flyby:</span>
                      <span className="text-white">
                        {selectedPlanet.name === "Mars"
                          ? "1965"
                          : selectedPlanet.name === "Venus"
                            ? "1962"
                            : selectedPlanet.name === "Jupiter"
                              ? "1973"
                              : selectedPlanet.name === "Saturn"
                                ? "1979"
                                : selectedPlanet.name === "Mercury"
                                  ? "1974"
                                  : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Missions:</span>
                      <span className="text-white">
                        {selectedPlanet.name === "Mars"
                          ? "Active"
                          : selectedPlanet.name === "Jupiter"
                            ? "Juno"
                            : selectedPlanet.name === "Saturn"
                              ? "Completed"
                              : "None"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Welcome to Solar System Explorer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Explore our solar system in stunning 3D! Click on any planet to discover fascinating details about our
                  cosmic neighbors.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">🖱️ Click and drag to rotate the view</p>
                  <p className="text-gray-400">🔍 Scroll to zoom in/out</p>
                  <p className="text-gray-400">🪐 Click planets for detailed information</p>
                  <p className="text-gray-400">☀️ The Sun provides light and warmth</p>
                  <p className="text-gray-400">🌌 Asteroid belt between Mars and Jupiter</p>
                  <p className="text-gray-400">🔄 Auto-rotation in overview mode</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Planet Quick Facts</h3>
            <div className="grid grid-cols-1 gap-2">
              {planets.map((planet) => (
                <Button
                  key={planet.name}
                  variant="ghost"
                  className={`justify-start text-left hover:bg-gray-800/50 ${
                    selectedPlanet?.name === planet.name ? "bg-blue-600/20 border border-blue-600/30" : ""
                  }`}
                  onClick={() => handlePlanetClick(planet)}
                >
                  <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: planet.color }} />
                  <div className="flex-1">
                    <div className="text-white font-medium">{planet.name}</div>
                    <div className="text-xs text-gray-400">
                      {planet.moons} moon{planet.moons !== 1 ? "s" : ""} • {planet.diameter}
                    </div>
                  </div>
                  {selectedPlanet?.name === planet.name && <Badge className="bg-blue-600 text-white">Selected</Badge>}
                </Button>
              ))}
            </div>
          </div>

          {/* Solar System Facts */}
          <Card className="bg-gray-800/50 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Solar System Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-300">
                <p>🌟 Our solar system is about 4.6 billion years old</p>
                <p>🚀 It would take over 9 years to walk to the Moon</p>
                <p>🪐 Saturn's rings are made mostly of ice particles</p>
                <p>🌍 Earth is the only planet not named after a god</p>
                <p>☄️ There are over 1 million asteroids in our solar system</p>
                <p>🌌 The solar system extends far beyond Pluto</p>
                <p>⭐ The Sun contains 99.86% of the system's mass</p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Info */}
          <Card className="bg-gray-800/50 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white">3D Rendering Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs text-gray-400">
                <p>• Powered by Three.js and React Three Fiber</p>
                <p>• Real-time 3D rendering with WebGL</p>
                <p>• Interactive orbital mechanics simulation</p>
                <p>• Procedural asteroid belt generation</p>
                <p>• Dynamic lighting and material systems</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
