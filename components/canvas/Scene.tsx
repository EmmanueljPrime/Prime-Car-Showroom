'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Lightformer, Center, useProgress, ContactShadows } from '@react-three/drei'
import { Box3, Group } from 'three'
import { Model } from './Model'
import { CarConfig } from '@/lib/cars'
import { InitialLoader } from '@/components/InitialLoader'
import { ENVIRONMENTS, type EnvironmentConfig } from '@/lib/environments'

type SceneProps = {
  car: CarConfig
  env?: EnvironmentConfig
  onInitialModelReady?: () => void
}

const DEFAULT_ENV: EnvironmentConfig = {
  id: 'studio',
  name: 'Studio',
  preset: 'studio',
  backgroundColor: '#f4f4f5',
  groundColor: '#e4e4e7',
}

const GROUND_CLEARANCE = 0.02

export default function Scene({ car, env, onInitialModelReady }: SceneProps) {
  const activeEnv = env ?? DEFAULT_ENV
  const hasSignaledInitial = useRef(false)
  const centerRef = useRef<Group | null>(null)
  const [groundY, setGroundY] = useState(0)
  const { active, progress } = useProgress()

  useEffect(() => {
    const preload = (Environment as unknown as { preload?: (preset: EnvironmentConfig['preset']) => void }).preload
    if (!preload) return

    const uniquePresets = new Set(ENVIRONMENTS.map(envOption => envOption.preset))
    uniquePresets.forEach(preset => preload(preset))
  }, [])

  useEffect(() => {
    hasSignaledInitial.current = false

    const frame = requestAnimationFrame(() => {
      setGroundY(0)
    })

    return () => cancelAnimationFrame(frame)
  }, [car.path])

  useEffect(() => {
    if (hasSignaledInitial.current) return
    if (active || progress < 100) return

    hasSignaledInitial.current = true
    onInitialModelReady?.()
  }, [active, progress, onInitialModelReady])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const group = centerRef.current
      if (!group) return

      const bounds = new Box3().setFromObject(group)
      const clearance = car.groundOffset ?? GROUND_CLEARANCE
      setGroundY(bounds.min.y - clearance)
    })

    return () => cancelAnimationFrame(frame)
  }, [car, progress])

  const containerStyle = useMemo(() => {
    return activeEnv.backgroundColor ? { backgroundColor: activeEnv.backgroundColor } : undefined
  }, [activeEnv.backgroundColor])

  const useEnvBackground = useMemo(() => !activeEnv.backgroundColor, [activeEnv.backgroundColor])

  return (
    <div
      className="fixed inset-0 z-10 pointer-events-auto transition-colors duration-700"
      style={containerStyle}
    >
      <InitialLoader />

      <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 1.5, 4], fov: 45 }}>
        {activeEnv.backgroundColor && (
          <color attach="background" args={[activeEnv.backgroundColor]} />
        )}

        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={Math.PI} />

        <group>
          <Center
            key={car.path}
            ref={centerRef}
            scale={car.scale ?? 1}
            rotation={car.rotation ?? [0, 0, 0]}
          >
            <Model url={car.path} />
          </Center>
        </group>

        <group position={[0, groundY - 0.002, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[80, 80]} />
            <meshStandardMaterial
              color={activeEnv.groundColor}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
        </group>

        <ContactShadows
          position={[0, groundY + 0.005, 0]}
          scale={18}
          blur={2}
          opacity={0.5}
          color="#000000"
          resolution={1024}
        />

        {activeEnv.id === 'studio' ? (
          <Environment resolution={512} frames={1} background={false}>
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 10, 1]} />
            <Lightformer intensity={3} rotation-y={Math.PI} position={[0, 2, 10]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-10, 2, 0]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 2, 0]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={0} position={[0, 2, -10]} scale={[10, 10, 1]} />
          </Environment>
        ) : (
          <Environment
            key={activeEnv.id}
            preset={activeEnv.preset}
            background={useEnvBackground}
            blur={0.35}
          />
        )}

        <OrbitControls
          enableZoom
          zoomSpeed={1}
          minDistance={2}
          maxDistance={50}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  )
}
