'use client'

import { useEffect, useState } from 'react'
// import { useGLTF } from '@react-three/drei' // <-- Plus besoin pour l'instant
import { Environment } from '@react-three/drei' // <-- On a besoin de ça pour le preload
// import { CARS } from '@/lib/cars' // <-- On commente les voitures
import { ENVIRONMENTS } from '@/lib/environments' // <-- On importe les environnements

export function BackgroundLoader() {
  const [loadedCount, setLoadedCount] = useState(0)
  
  // On filtre pour ne garder que les presets uniques (ex: pas besoin de charger 'city' 2 fois)
  // et on enlève 'studio' qui n'a pas de fichier à télécharger.
  const presetsToLoad = ENVIRONMENTS
    .map(e => e.preset)
    .filter(p => p !== 'studio')
    .filter((value, index, self) => self.indexOf(value) === index)

  const total = presetsToLoad.length // On change le total pour baser sur les environnements
  
  useEffect(() => {
    let mounted = true
    
    const preloadAll = async () => {
      // --- PARTIE VOITURE COMMENTÉE (OFF) ---
      /*
      for (const car of CARS) {
        if (!mounted) break
        try {
          await useGLTF.preload(car.path)
          setLoadedCount(prev => prev + 1)
        } catch (e) {
          console.error(`Erreur chargement ${car.name}`, e)
        }
      }
      */

      // --- NOUVELLE PARTIE : ENVIRONNEMENTS (ON) ---
      // On récupère la fonction preload cachée dans le composant Environment de Drei
      const preloadEnv = (Environment as any).preload
      
      if (!preloadEnv) return

      for (const preset of presetsToLoad) {
        if (!mounted) break
        
        try {
          // On déclenche le téléchargement du HDRI
          // Note : preloadEnv n'est pas toujours une Promise, mais on le traite comme une action
          preloadEnv(preset)
          
          // On simule un petit délai pour l'UX (optionnel) ou on incrémente direct
          // Comme on ne peut pas savoir exactement quand le HDRI est fini sans être dans le Canvas,
          // on suppose que le déclenchement est un succès.
          setLoadedCount(prev => prev + 1)
        } catch (e) {
          console.error(`Erreur chargement env ${preset}`, e)
        }
      }
    }

    // Petit délai avant de lancer pour laisser la priorité au chargement initial de la page
    const timeout = setTimeout(() => {
      preloadAll()
    }, 1000)

    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [presetsToLoad]) // Ajout de la dépendance

  // Si tout est chargé (ou s'il n'y a rien à charger), on cache
  if (loadedCount >= total || total === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur border border-zinc-200 p-3 rounded-lg shadow-lg flex items-center gap-3 transition-all pointer-events-none">
      
      {/* Petit Spinner Discret */}
      <div className="w-4 h-4 border-2 border-zinc-300 border-t-blue-600 rounded-full animate-spin" />
      
      <div className="flex flex-col">
        <span className="text-xs font-bold text-zinc-700 uppercase">
          Préparation des décors {/* Texte mis à jour */}
        </span>
        <span className="text-[10px] text-zinc-500">
          {loadedCount} / {total} environnements prêts
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
