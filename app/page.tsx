// app/page.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Sidebar } from '@/components/Sidebar'
import { InitialLoader } from '@/components/InitialLoader'
import { CARS, CarConfig } from '@/lib/cars'
import { CarSpec } from '@/components/CarSpec'
import { Menu } from 'lucide-react'

const Scene = dynamic<{ car: CarConfig; onInitialModelReady: () => void }>(() => import('@/components/canvas/Scene'), {
  ssr: false,
  loading: () => <InitialLoader />
})

export default function Home() {
  const [currentCar, setCurrentCar] = useState<CarConfig>(CARS[0])
  const [hasSidebarUnlocked, setHasSidebarUnlocked] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleInitialModelReady = useCallback(() => {
    setHasSidebarUnlocked(true)
  }, [])

  useEffect(() => {
    if (!hasSidebarUnlocked) return

    const frame = requestAnimationFrame(() => {
      setIsSidebarOpen(true)
    })

    return () => cancelAnimationFrame(frame)
  }, [hasSidebarUnlocked])

  const handleToggleSidebar = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      return
    }

    setIsSidebarOpen(prev => !prev)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      return
    }

    setIsSidebarOpen(false)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden pointer-events-none">
      {hasSidebarUnlocked && (
        <>
          <button
            type="button"
            onClick={handleToggleSidebar}
            className="fixed top-4 left-4 z-40 md:hidden pointer-events-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-zinc-700 shadow-md border border-white/60 hover:bg-white transition-colors"
            aria-label={isSidebarOpen ? 'Fermer le garage' : 'Ouvrir le garage'}
          >
            <Menu size={20} />
          </button>

          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={handleCloseSidebar}
          />

          <Sidebar
            currentCar={currentCar}
            onSelect={setCurrentCar}
            isOpen={isSidebarOpen}
            onClose={handleCloseSidebar}
          />
        </>
      )}
      <CarSpec car={currentCar} />
      <Scene car={currentCar} onInitialModelReady={handleInitialModelReady} />
    </main>
  )
}
