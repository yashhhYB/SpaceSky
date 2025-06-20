"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

function EarthPlanet({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial color="#6b93d6" roughness={0.8} metalness={0.2} />
    </mesh>
  )
}

function AnimatedPlanet({
  position,
  size,
  color,
  speed,
}: { position: [number, number, number]; size: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
    </mesh>
  )
}

function SpaceStation({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Main body */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Solar panels */}
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#0066cc" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#0066cc" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function FloatingAsteroids() {
  const asteroids = useMemo(() => {
    const temp = []
    for (let i = 0; i < 30; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100] as [
          number,
          number,
          number,
        ],
        size: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.02 + 0.01,
      })
    }
    return temp
  }, [])

  return (
    <>
      {asteroids.map((asteroid, index) => (
        <AnimatedPlanet
          key={index}
          position={asteroid.position}
          size={asteroid.size}
          color="#8B7355"
          speed={asteroid.speed}
        />
      ))}
    </>
  )
}

export default function SpaceScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        <pointLight position={[0, 0, 0]} intensity={0.8} color="#ffaa00" />

        <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          {/* Earth with solid color */}
          <EarthPlanet position={[0, 0, -5]} />

          {/* Other planets */}
          <AnimatedPlanet position={[-8, 2, -8]} size={1.0} color="#ff6b35" speed={0.01} />
          <AnimatedPlanet position={[6, -3, -10]} size={0.8} color="#4f46e5" speed={0.015} />
          <AnimatedPlanet position={[-12, -2, -15]} size={0.6} color="#f59e0b" speed={0.02} />

          {/* Space Station */}
          <SpaceStation position={[8, 4, -6]} />
        </Suspense>

        {/* Floating Asteroids */}
        <FloatingAsteroids />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  )
}
