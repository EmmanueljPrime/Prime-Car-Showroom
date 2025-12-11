'use client'
import { useProgress } from '@react-three/drei'

export function InitialLoader() {
  const { active, progress } = useProgress()
  
  // Si plus rien n'est actif (chargement fini), on disparait
  // Note : useProgress écoute TOUT ce qui se passe dans le Canvas
  if (!active && progress === 100) return null

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black text-zinc-900 mb-8 tracking-tighter">
        GARAGE 3D
      </h1>
      
      <div className="w-64 h-1 bg-zinc-200 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-black transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-zinc-400 font-mono text-xs">
        INITIALISATION... {Math.round(progress)}%
      </p>
    </div>
  )
}
