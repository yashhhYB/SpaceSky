"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Text, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/navigation"
import { Play, Pause, RotateCcw, Trophy, Fuel, Target, Shield, Heart } from "lucide-react"
import * as THREE from "three"

interface GameState {
  mode: "menu" | "playing" | "paused" | "gameOver" | "levelComplete"
  level: number
  score: number
  fuel: number
  health: number
  shield: number
  visitedPlanets: string[]
  currentTarget: number
  powerUps: string[]
  timeRemaining: number
  difficulty: "easy" | "medium" | "hard"
  asteroidsDestroyed: number
}

interface Planet {
  name: string
  position: [number, number, number]
  size: number
  color: string
  points: number
  hazardous?: boolean
  fuelReward?: number
  powerUp?: string
}

function Spacecraft({
  position,
  onPlanetReach,
  onAsteroidHit,
  gameState,
}: {
  position: [number, number, number]
  onPlanetReach: (planet: Planet) => void
  onAsteroidHit: () => void
  gameState: GameState
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [thrusterActive, setThrusterActive] = useState(false)

  const planets: Planet[] = [
    { name: "Mercury", position: [-8, 0, 0], size: 0.8, color: "#8c7853", points: 100, fuelReward: 10 },
    { name: "Venus", position: [-4, 2, 0], size: 1.0, color: "#ffc649", points: 150, powerUp: "shield" },
    { name: "Earth", position: [0, 0, 0], size: 1.2, color: "#6b93d6", points: 200, fuelReward: 20 },
    { name: "Mars", position: [4, -1, 0], size: 0.9, color: "#cd5c5c", points: 250, powerUp: "fuel" },
    { name: "Jupiter", position: [8, 3, 0], size: 2.0, color: "#d8ca9d", points: 500, hazardous: true },
    { name: "Saturn", position: [12, -2, 0], size: 1.8, color: "#fab27b", points: 750, powerUp: "health" },
  ]

  useFrame((state) => {
    if (meshRef.current && gameState.mode === "playing") {
      // Rotate spacecraft
      meshRef.current.rotation.y += 0.02

      // Find next unvisited planet
      const unvisitedPlanets = planets.filter((p) => !gameState.visitedPlanets.includes(p.name))
      if (unvisitedPlanets.length > 0) {
        const target = unvisitedPlanets[0]
        const targetPos = new THREE.Vector3(...target.position)
        const currentPos = meshRef.current.position

        const direction = targetPos.sub(currentPos).normalize()
        const speed = gameState.difficulty === "hard" ? 0.04 : gameState.difficulty === "medium" ? 0.03 : 0.02

        meshRef.current.position.add(direction.multiplyScalar(speed))
        setThrusterActive(true)

        // Check if reached planet
        if (meshRef.current.position.distanceTo(new THREE.Vector3(...target.position)) < target.size + 0.5) {
          onPlanetReach(target)
          setThrusterActive(false)
        }
      }

      // Add some movement variation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.01
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Main spacecraft body */}
      <mesh>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={gameState.shield > 0 ? "#00ffff" : "#4f46e5"}
          emissiveIntensity={gameState.shield > 0 ? 0.5 : 0.2}
        />
      </mesh>

      {/* Wings */}
      <mesh position={[0.4, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.3]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} />
      </mesh>
      <mesh position={[-0.4, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.3]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} />
      </mesh>

      {/* Thruster effects */}
      {thrusterActive && (
        <>
          <mesh position={[0, -0.8, 0]}>
            <coneGeometry args={[0.1, 0.5, 6]} />
            <meshStandardMaterial color="#ff4500" emissive="#ff4500" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0.3, -0.6, 0]}>
            <coneGeometry args={[0.05, 0.3, 6]} />
            <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[-0.3, -0.6, 0]}>
            <coneGeometry args={[0.05, 0.3, 6]} />
            <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.6} />
          </mesh>
        </>
      )}

      {/* Shield effect */}
      {gameState.shield > 0 && (
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#00ffff" transparent opacity={0.3} emissive="#00ffff" emissiveIntensity={0.2} />
        </mesh>
      )}

      {/* Health indicator */}
      {gameState.health < 50 && (
        <Html distanceFactor={5}>
          <div className="text-red-400 text-xs font-bold animate-pulse">LOW HEALTH!</div>
        </Html>
      )}
    </group>
  )
}

function GamePlanet({
  planet,
  visited,
  isTarget,
}: {
  planet: Planet
  visited: boolean
  isTarget: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      if (isTarget && !visited) {
        meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.1)
      }
    }
  })

  return (
    <group position={planet.position}>
      <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={visited ? "#00ff00" : isTarget ? "#ffff00" : planet.hazardous ? "#ff0000" : "#000000"}
          emissiveIntensity={visited ? 0.3 : isTarget ? 0.2 : planet.hazardous ? 0.1 : 0}
        />
      </mesh>

      {/* Planet rings for gas giants */}
      {(planet.name === "Saturn" || planet.name === "Jupiter") && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.size + 0.3, planet.size + 0.8, 32]} />
          <meshStandardMaterial color={planet.color} transparent opacity={0.6} />
        </mesh>
      )}

      <Text
        position={[0, planet.size + 1, 0]}
        fontSize={0.4}
        color={visited ? "#00ff00" : isTarget ? "#ffff00" : "white"}
        anchorX="center"
        anchorY="middle"
      >
        {planet.name} {visited && "✓"} {isTarget && "🎯"}
      </Text>

      {/* Power-up indicator */}
      {planet.powerUp && !visited && (
        <Text position={[0, planet.size + 1.5, 0]} fontSize={0.3} color="#00ffff" anchorX="center" anchorY="middle">
          {planet.powerUp === "shield" ? "🛡️" : planet.powerUp === "fuel" ? "⛽" : "❤️"}
        </Text>
      )}

      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm border border-gray-600 max-w-xs">
            <h3 className="font-bold text-sm">{planet.name}</h3>
            <p className="text-xs text-gray-300">Points: {planet.points}</p>
            {planet.hazardous && <p className="text-xs text-red-400">⚠️ Hazardous!</p>}
            {planet.powerUp && <p className="text-xs text-cyan-400">Power-up: {planet.powerUp}</p>}
          </div>
        </Html>
      )}
    </group>
  )
}

function Asteroid({
  position,
  onHit,
  gameActive,
}: { position: [number, number, number]; onHit: () => void; gameActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hit, setHit] = useState(false)

  useFrame(() => {
    if (meshRef.current && !hit && gameActive) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.z += 0.02

      // Reset position when off screen
      if (meshRef.current.position.z > 20) {
        meshRef.current.position.z = -50
        meshRef.current.position.x = (Math.random() - 0.5) * 30
        meshRef.current.position.y = (Math.random() - 0.5) * 20
      }
    }
  })

  const handleClick = () => {
    if (!hit && gameActive) {
      setHit(true)
      onHit()
      setTimeout(() => setHit(false), 1000)
    }
  }

  return (
    <mesh ref={meshRef} position={position} onClick={handleClick}>
      <dodecahedronGeometry args={[0.3]} />
      <meshStandardMaterial
        color={hit ? "#ff0000" : "#8B7355"}
        emissive={hit ? "#ff0000" : "#000000"}
        emissiveIntensity={hit ? 0.5 : 0}
      />
    </mesh>
  )
}

export default function GamesPage() {
  const [gameState, setGameState] = useState<GameState>({
    mode: "menu",
    level: 1,
    score: 0,
    fuel: 100,
    health: 100,
    shield: 0,
    visitedPlanets: [],
    currentTarget: 0,
    powerUps: [],
    timeRemaining: 300,
    difficulty: "easy",
    asteroidsDestroyed: 0,
  })

  const planets: Planet[] = [
    { name: "Mercury", position: [-8, 0, 0], size: 0.8, color: "#8c7853", points: 100, fuelReward: 10 },
    { name: "Venus", position: [-4, 2, 0], size: 1.0, color: "#ffc649", points: 150, powerUp: "shield" },
    { name: "Earth", position: [0, 0, 0], size: 1.2, color: "#6b93d6", points: 200, fuelReward: 20 },
    { name: "Mars", position: [4, -1, 0], size: 0.9, color: "#cd5c5c", points: 250, powerUp: "fuel" },
    { name: "Jupiter", position: [8, 3, 0], size: 2.0, color: "#d8ca9d", points: 500, hazardous: true },
    { name: "Saturn", position: [12, -2, 0], size: 1.8, color: "#fab27b", points: 750, powerUp: "health" },
  ]

  const asteroids = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, -Math.random() * 50] as [number, number, number],
  }))

  const handlePlanetReach = useCallback(
    (planet: Planet) => {
      if (!gameState.visitedPlanets.includes(planet.name)) {
        setGameState((prev) => {
          const newState = { ...prev }
          newState.visitedPlanets = [...prev.visitedPlanets, planet.name]
          newState.score += planet.points

          if (planet.fuelReward) {
            newState.fuel = Math.min(100, prev.fuel + planet.fuelReward)
          }

          if (planet.powerUp) {
            switch (planet.powerUp) {
              case "shield":
                newState.shield = 100
                break
              case "fuel":
                newState.fuel = 100
                break
              case "health":
                newState.health = Math.min(100, prev.health + 25)
                break
            }
            newState.powerUps = [...prev.powerUps, planet.powerUp]
          }

          if (planet.hazardous && prev.shield === 0) {
            newState.health = Math.max(0, prev.health - 25)
          }

          // Check level completion
          if (newState.visitedPlanets.length === planets.length) {
            newState.mode = "levelComplete"
            newState.level += 1
            newState.score += 1000 // Bonus for completing level
          }

          return newState
        })
      }
    },
    [gameState.visitedPlanets, planets.length],
  )

  const handleAsteroidHit = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + 50,
      fuel: Math.min(100, prev.fuel + 5),
      asteroidsDestroyed: prev.asteroidsDestroyed + 1,
    }))
  }, [])

  const startGame = (difficulty: "easy" | "medium" | "hard") => {
    setGameState({
      mode: "playing",
      level: 1,
      score: 0,
      fuel: 100,
      health: 100,
      shield: 0,
      visitedPlanets: [],
      currentTarget: 0,
      powerUps: [],
      timeRemaining: difficulty === "hard" ? 180 : difficulty === "medium" ? 240 : 300,
      difficulty,
      asteroidsDestroyed: 0,
    })
  }

  const pauseGame = () => {
    setGameState((prev) => ({ ...prev, mode: "paused" }))
  }

  const resumeGame = () => {
    setGameState((prev) => ({ ...prev, mode: "playing" }))
  }

  const resetGame = () => {
    setGameState({
      mode: "menu",
      level: 1,
      score: 0,
      fuel: 100,
      health: 100,
      shield: 0,
      visitedPlanets: [],
      currentTarget: 0,
      powerUps: [],
      timeRemaining: 300,
      difficulty: "easy",
      asteroidsDestroyed: 0,
    })
  }

  const nextLevel = () => {
    setGameState((prev) => ({
      ...prev,
      mode: "playing",
      visitedPlanets: [],
      currentTarget: 0,
      fuel: Math.min(100, prev.fuel + 50),
      health: Math.min(100, prev.health + 25),
      timeRemaining: prev.difficulty === "hard" ? 180 : prev.difficulty === "medium" ? 240 : 300,
      powerUps: [],
    }))
  }

  // Game timers and effects
  useEffect(() => {
    if (gameState.mode === "playing") {
      const gameTimer = setInterval(() => {
        setGameState((prev) => {
          const newState = { ...prev }

          // Decrease fuel over time
          const fuelDrain = prev.difficulty === "hard" ? 2 : prev.difficulty === "medium" ? 1.5 : 1
          newState.fuel = Math.max(0, prev.fuel - fuelDrain)

          // Decrease shield over time
          if (prev.shield > 0) {
            newState.shield = Math.max(0, prev.shield - 2)
          }

          // Decrease time
          newState.timeRemaining = Math.max(0, prev.timeRemaining - 1)

          // Check game over conditions
          if (newState.fuel <= 0 || newState.health <= 0 || newState.timeRemaining <= 0) {
            newState.mode = "gameOver"
          }

          return newState
        })
      }, 1000)

      return () => clearInterval(gameTimer)
    }
  }, [gameState.mode])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getNextTarget = () => {
    const unvisited = planets.filter((p) => !gameState.visitedPlanets.includes(p.name))
    return unvisited[0]
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-16 flex">
        {/* Game Scene */}
        <div className="w-2/3 h-screen relative">
          <Canvas camera={{ position: [0, 5, 15], fov: 75 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[0, 0, 0]} intensity={0.8} color="#ffaa00" />
            <Stars radius={300} depth={60} count={3000} factor={4} saturation={0} fade speed={1} />

            {planets.map((planet) => {
              const nextTarget = getNextTarget()
              return (
                <GamePlanet
                  key={planet.name}
                  planet={planet}
                  visited={gameState.visitedPlanets.includes(planet.name)}
                  isTarget={nextTarget?.name === planet.name}
                />
              )
            })}

            {gameState.mode === "playing" && (
              <>
                <Spacecraft
                  position={[-10, 0, 0]}
                  onPlanetReach={handlePlanetReach}
                  onAsteroidHit={handleAsteroidHit}
                  gameState={gameState}
                />

                {asteroids.map((asteroid) => (
                  <Asteroid
                    key={asteroid.id}
                    position={asteroid.position}
                    onHit={handleAsteroidHit}
                    gameActive={gameState.mode === "playing"}
                  />
                ))}
              </>
            )}
          </Canvas>

          {/* Game HUD */}
          {gameState.mode === "playing" && (
            <div className="absolute top-4 left-4 space-y-2">
              <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-600 min-w-[320px]">
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span>Score: {gameState.score.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-400" />
                    <span>Level: {gameState.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>⏱️</span>
                    <span className={gameState.timeRemaining < 60 ? "text-red-400 animate-pulse" : ""}>
                      Time: {formatTime(gameState.timeRemaining)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🎯</span>
                    <span>
                      Visited: {gameState.visitedPlanets.length}/{planets.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="flex items-center">
                        <Fuel className="h-3 w-3 mr-1 text-blue-400" />
                        Fuel
                      </span>
                      <span className={gameState.fuel < 25 ? "text-red-400" : ""}>{gameState.fuel}%</span>
                    </div>
                    <Progress value={gameState.fuel} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1 text-red-400" />
                        Health
                      </span>
                      <span className={gameState.health < 50 ? "text-red-400" : ""}>{gameState.health}%</span>
                    </div>
                    <Progress value={gameState.health} className="h-2" />
                  </div>

                  {gameState.shield > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="flex items-center">
                          <Shield className="h-3 w-3 mr-1 text-cyan-400" />
                          Shield
                        </span>
                        <span>{gameState.shield}%</span>
                      </div>
                      <Progress value={gameState.shield} className="h-2" />
                    </div>
                  )}
                </div>

                {gameState.powerUps.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-gray-600">
                    <div className="text-xs text-gray-400 mb-1">Active Power-ups:</div>
                    <div className="flex space-x-1">
                      {gameState.powerUps.map((powerUp, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-cyan-500/20 text-cyan-400 border-cyan-400/30"
                        >
                          {powerUp === "shield" ? "🛡️" : powerUp === "fuel" ? "⛽" : "❤️"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Game Modals */}
          {gameState.mode === "menu" && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Card className="bg-gray-900/90 border-gray-700 max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">Space Explorer Mission</CardTitle>
                  <CardDescription className="text-gray-300">
                    Pilot your advanced spacecraft through the solar system and visit all planets!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-300 space-y-2">
                    <p>🚀 Navigate to planets to collect points and resources</p>
                    <p>⛽ Manage fuel carefully - it depletes over time</p>
                    <p>❤️ Avoid hazardous planets without shields</p>
                    <p>🎯 Collect power-ups for shields, fuel, and health</p>
                    <p>💥 Click asteroids for bonus points and fuel</p>
                    <p>⏱️ Complete missions before time runs out</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Choose Difficulty:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button onClick={() => startGame("easy")} className="bg-green-600 hover:bg-green-700 text-xs">
                        Easy
                        <br />5 min
                      </Button>
                      <Button onClick={() => startGame("medium")} className="bg-yellow-600 hover:bg-yellow-700 text-xs">
                        Medium
                        <br />4 min
                      </Button>
                      <Button onClick={() => startGame("hard")} className="bg-red-600 hover:bg-red-700 text-xs">
                        Hard
                        <br />3 min
                      </Button>
                    </div>
                  </div>

                  {gameState.score > 0 && (
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">
                          Previous Score: {gameState.score.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-300">Level Reached: {gameState.level}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {gameState.mode === "paused" && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Card className="bg-gray-900/90 border-gray-700 max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-yellow-400">Mission Paused</CardTitle>
                  <CardDescription className="text-gray-300">Your spacecraft is in standby mode</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <div className="text-center space-y-2">
                      <div className="text-lg font-bold text-white">Current Progress</div>
                      <div className="text-sm text-gray-300">
                        Score: {gameState.score.toLocaleString()} | Level: {gameState.level}
                      </div>
                      <div className="text-sm text-gray-300">
                        Planets Visited: {gameState.visitedPlanets.length}/{planets.length}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={resumeGame}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Resume Mission
                    </Button>
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Abort
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {gameState.mode === "levelComplete" && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Card className="bg-gray-900/90 border-gray-700 max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-green-400">Level Complete! 🎉</CardTitle>
                  <CardDescription className="text-gray-300">
                    Excellent piloting! You've explored all planets in this sector.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-green-400">Level {gameState.level - 1} Complete!</div>
                      <div className="text-lg text-white">Score: {gameState.score.toLocaleString()}</div>
                      <div className="text-sm text-gray-300">
                        Fuel Remaining: {gameState.fuel}% | Health: {gameState.health}%
                      </div>
                      <div className="text-sm text-gray-300">Asteroids Destroyed: {gameState.asteroidsDestroyed}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={nextLevel}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Next Level
                    </Button>
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Main Menu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {gameState.mode === "gameOver" && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Card className="bg-gray-900/90 border-gray-700 max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-red-400">Mission Failed</CardTitle>
                  <CardDescription className="text-gray-300">
                    {gameState.fuel <= 0 && "Your spacecraft ran out of fuel!"}
                    {gameState.health <= 0 && "Your spacecraft was destroyed!"}
                    {gameState.timeRemaining <= 0 && "Time ran out!"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                    <div className="text-center space-y-2">
                      <div className="text-lg font-bold text-white">
                        Final Score: {gameState.score.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">
                        Level Reached: {gameState.level} | Planets Visited: {gameState.visitedPlanets.length}/
                        {planets.length}
                      </div>
                      <div className="text-sm text-gray-300">Asteroids Destroyed: {gameState.asteroidsDestroyed}</div>
                    </div>
                  </div>

                  <Button
                    onClick={resetGame}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Game Info Panel */}
        <div className="w-1/3 p-6 bg-gray-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Space Mission Control
            </h1>
            <p className="text-gray-400">Advanced spacecraft simulation and planetary exploration</p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="mr-2 h-5 w-5 text-green-400" />
                Mission Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Visit all planets</span>
                  <Badge variant={gameState.visitedPlanets.length === planets.length ? "default" : "outline"}>
                    {gameState.visitedPlanets.length}/{planets.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Maintain fuel levels</span>
                  <Badge variant={gameState.fuel > 25 ? "default" : "destructive"}>{gameState.fuel}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Spacecraft integrity</span>
                  <Badge variant={gameState.health > 50 ? "default" : "destructive"}>{gameState.health}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Time remaining</span>
                  <Badge variant={gameState.timeRemaining > 60 ? "default" : "destructive"}>
                    {formatTime(gameState.timeRemaining)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Planetary Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {planets.map((planet) => (
                  <div key={planet.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: planet.color }} />
                      <div>
                        <div className="text-white font-medium">{planet.name}</div>
                        <div className="text-xs text-gray-400">
                          {planet.points} pts
                          {planet.hazardous && " ⚠️"}
                          {planet.powerUp && ` • ${planet.powerUp}`}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={gameState.visitedPlanets.includes(planet.name) ? "default" : "outline"}
                      className={
                        gameState.visitedPlanets.includes(planet.name)
                          ? "bg-green-500/20 text-green-400 border-green-400/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-400/30"
                      }
                    >
                      {gameState.visitedPlanets.includes(planet.name) ? "Visited" : "Unexplored"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Game Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  onClick={() => startGame(gameState.difficulty)}
                  disabled={gameState.mode === "playing"}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {gameState.mode === "playing" ? "Mission Active" : "Start Mission"}
                </Button>

                <Button
                  onClick={() => (gameState.mode === "playing" ? pauseGame() : resumeGame())}
                  disabled={gameState.mode === "menu" || gameState.mode === "gameOver"}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  {gameState.mode === "playing" ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause Mission
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Resume Mission
                    </>
                  )}
                </Button>

                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="w-full border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Abort Mission
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-semibold mb-2">Pro Tips:</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Click asteroids to destroy them for bonus fuel</p>
                  <p>• Collect power-ups before visiting hazardous planets</p>
                  <p>• Plan your route efficiently to save fuel</p>
                  <p>• Higher difficulty = more points but less time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
