'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows, Lightformer, Center } from '@react-three/drei'
import { Model } from './Model'
import { CarConfig } from '@/lib/cars' // On importe le type


export default function Scene({ car }: { car: CarConfig }) {
  return (
    <div className="fixed inset-0 z-10 bg-zinc-100 pointer-events-auto">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4, 1.5, 4], fov: 45 }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={Math.PI} />

        <group position={[0, 0, 0]}>
          <Center key={car.path} scale={car.scale ?? 1} rotation={car.rotation ?? [0, 0, 0]} position={[0, 0, 0]}>
            <Model 
              key={car.path} 
              url={car.path}
            />
          </Center>
        </group>

        <Environment resolution={512} frames={1} background={false}>
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 10, 1]} />
            <Lightformer intensity={3} rotation-y={Math.PI} position={[0, 2, 10]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-10, 2, 0]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 2, 0]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={0} position={[0, 2, -10]} scale={[10, 10, 1]} />
        </Environment>

        <OrbitControls enableZoom={true} zoomSpeed={1} minDistance={2} maxDistance={50} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} autoRotate={true} autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  )
}
