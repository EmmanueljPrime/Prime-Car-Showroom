'use client'

import { ENVIRONMENTS, EnvironmentConfig } from '@/lib/environments'

interface EnvSelectorProps {
  currentEnv: EnvironmentConfig
  onChange: (env: EnvironmentConfig) => void
}

export function EnvSelector({ currentEnv, onChange }: EnvSelectorProps) {
  
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/20 pointer-events-auto">
      
      {ENVIRONMENTS.map(env => {
        const isActive = currentEnv.id === env.id
        
        return (
          <button
            key={env.id}
            onClick={() => onChange(env)}
            className={`
              px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 relative overflow-hidden
              ${isActive 
                ? 'bg-black text-white shadow-lg scale-105' 
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'}
            `}
          >
             {/* Pastille de couleur simple */}
             <div 
               className="w-3 h-3 rounded-full border border-white/20"
               style={{ backgroundColor: env.groundColor }} 
             />
            
            {env.name}
          </button>
        )
      })}
    </div>
  )
}
