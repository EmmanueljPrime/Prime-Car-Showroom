'use client'

import { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { CARS } from '@/lib/cars'

export function BackgroundLoader() {
  const [loadedCount, setLoadedCount] = useState(0)
  const total = CARS.length
  
  // On ne veut pas charger la voiture actuelle deux fois, 
  // on suppose que la Scène s'en occupe. On charge les autres.
  
  useEffect(() => {
    let mounted = true
    
    const preloadAll = async () => {
      // On charge séquentiellement pour ne pas bloquer le réseau
      for (const car of CARS) {
        if (!mounted) break
        
        try {
          // useGLTF.preload met le fichier dans le cache Blob du navigateur
          await useGLTF.preload(car.path)
          setLoadedCount(prev => prev + 1)
        } catch (e) {
          console.error(`Erreur chargement ${car.name}`, e)
        }
      }
    }

    // On attend un peu que la page soit interactive avant de bourriner le réseau
    const timeout = setTimeout(() => {
      preloadAll()
    }, 2000)

    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [])

  // Si tout est chargé, on cache la barre
  if (loadedCount === total) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur border border-zinc-200 p-3 rounded-lg shadow-lg flex items-center gap-3 transition-all pointer-events-none">
      
      {/* Petit Spinner Discret */}
      <div className="w-4 h-4 border-2 border-zinc-300 border-t-blue-600 rounded-full animate-spin" />
      
      <div className="flex flex-col">
        <span className="text-xs font-bold text-zinc-700 uppercase">
          Optimisation du garage
        </span>
        <span className="text-[10px] text-zinc-500">
          {loadedCount} / {total} véhicules prêts
        </span>
      </div>

      {/* Mini barre de progression */}
      <div className="w-20 h-1 bg-zinc-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-300" 
          style={{ width: `${(loadedCount / total) * 100}%` }}
        />
      </div>
    </div>
  )
}
