// components/InitialLoader.tsx
'use client'
import { useProgress } from '@react-three/drei'
import { useState, useEffect } from 'react'

export function InitialLoader() {
  const { active, progress } = useProgress()
  const [visible, setVisible] = useState(true)
  const [hasFinishedOnce, setHasFinishedOnce] = useState(false)
  
  useEffect(() => {
    if (hasFinishedOnce) return

    if (!active && progress === 100) {
      const timer = setTimeout(() => {
        setVisible(false)
        setHasFinishedOnce(true)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [active, progress, hasFinishedOnce])

  if (!visible) {
    return null
  }

  const isFadingOut = !active && progress === 100 && !hasFinishedOnce
  const opacity = isFadingOut ? 0 : 1

  const displayProgress = progress > 0 ? progress : 3

  return (
    <div 
      className="fixed inset-0 z-100 bg-zinc-100 flex flex-col items-center justify-center transition-opacity duration-500 pointer-events-none"
      style={{ opacity }}
    >
      <h1 className="text-4xl font-black text-zinc-900 mb-8 tracking-tighter">
        GARAGE 3D
      </h1>
      
      <div className="w-64 h-1 bg-zinc-200 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-black transition-all duration-200"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      
      <p className="mt-4 text-zinc-400 font-mono text-xs">
        {progress > 0 ? `CHARGEMENT DU MODÈLE... ${Math.round(progress)}%` : 'INITIALISATION...'}
      </p>
    </div>
  )
}
