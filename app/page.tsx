// app/page.tsx
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Sidebar } from '@/components/Sidebar'
import { CARS, CarConfig } from '@/lib/cars' // Import du type

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false, loading: () => null })

export default function Home() {
  // On stocke l'objet voiture ENTIER
  const [currentCar, setCurrentCar] = useState<CarConfig>(CARS[0])

  return (
    <main className="relative w-full h-screen overflow-hidden pointer-events-none">
      <Sidebar 
        currentCar={currentCar} // On renomme la prop pour être cohérent
        onSelect={setCurrentCar} 
      />

      {/* On passe l'objet complet à la scène */}
      <Scene car={currentCar} />
    </main>
  )
}
