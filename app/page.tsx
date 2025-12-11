'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Sidebar } from '@/components/Sidebar'
import { BackgroundLoader } from '@/components/PreLoader' // Le discret
import { CARS, CarConfig } from '@/lib/cars'

// La scène contient l'InitialLoader (le gros) car useProgress ne marche que DANS ou À CÔTÉ du Canvas
const Scene = dynamic(() => import('@/components/canvas/Scene'), { 
  ssr: false,
  // Pendant que le fichier Scene.js se télécharge, on affiche un écran blanc simple
  loading: () => <div className="fixed inset-0 bg-zinc-100 z-[200]" /> 
})

export default function Home() {
  const [currentCar, setCurrentCar] = useState<CarConfig>(CARS[0])

  return (
    <main className="relative w-full h-screen overflow-hidden pointer-events-none">
      
      {/* 1. Sidebar (UI) */}
      <Sidebar currentCar={currentCar} onSelect={setCurrentCar} />

      {/* 2. Loader d'arrière-plan (UI Discrète) */}
      {/* Il se lance tout seul et charge les autres voitures une par une */}
      <BackgroundLoader />

      {/* 3. Scène 3D */}
      <Scene car={currentCar} />
      
    </main>
  )
}
