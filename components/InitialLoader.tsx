// components/InitialLoader.tsx
'use client'
import { useProgress } from '@react-three/drei'
import { useState, useEffect } from 'react'

export function InitialLoader() {
  const { active, progress } = useProgress()
  const [shouldHide, setShouldHide] = useState(false)
  
  // Quand le chargement est terminé, on attend un peu puis on cache
  useEffect(() => {
    if (!active && progress === 100 && !shouldHide) {
      const timer = setTimeout(() => {
        setShouldHide(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [active, progress, shouldHide])

  // Si un nouveau chargement démarre, on ré-affiche le loader
  useEffect(() => {
    if (!active) return

    const frame = requestAnimationFrame(() => {
      setShouldHide(false)
    })

    return () => cancelAnimationFrame(frame)
  }, [active])

  // On masque complètement le loader
  if (shouldHide) {
    return null
  }

  // Calculer l'opacité : fade out uniquement quand terminé à 100%
  const opacity = (!active && progress === 100) ? 0 : 1
  
  // Afficher une barre minimale au début pour feedback visuel immédiat
  const displayProgress = progress > 0 ? progress : 3

  return (
    <div 
      className="fixed inset-0 z-100 bg-zinc-100 flex flex-col items-center justify-center transition-opacity duration-500 pointer-events-none"
      style={{ opacity }}
    >
      <h1 className="text-4xl font-black text-zinc-900 mb-8 tracking-tighter">
        GARAGE 3D
      </h1>
      
      {/* Barre de progression précise (remplace le spinner) */}
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
