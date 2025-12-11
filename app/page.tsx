// app/page.tsx
'use client'

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { Sidebar } from '@/components/Sidebar'
import { InitialLoader } from '@/components/InitialLoader'
import { CARS, CarConfig } from '@/lib/cars'

const Scene = dynamic<{ car: CarConfig; onInitialModelReady: () => void }>(() => import('@/components/canvas/Scene'), {
  ssr: false,
  loading: () => <InitialLoader />
})

export default function Home() {
  const [currentCar, setCurrentCar] = useState<CarConfig>(CARS[0])
  const [isInitialModelReady, setIsInitialModelReady] = useState(false)

  const handleInitialModelReady = useCallback(() => {
    setIsInitialModelReady(true)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden pointer-events-none">
      {isInitialModelReady && (
        <Sidebar currentCar={currentCar} onSelect={setCurrentCar} />
      )}
      <Scene car={currentCar} onInitialModelReady={handleInitialModelReady} />
    </main>
  )
}
