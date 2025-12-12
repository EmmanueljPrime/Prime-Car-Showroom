'use client'

import { useState } from 'react'
import { CarConfig } from '@/lib/cars'
import { Zap, Scale, Cog, ChevronDown, X } from 'lucide-react'

export function CarSpec({ car }: { car: CarConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!car.model) {
    return null
  }

  const content = (
    <>
      <div className="mb-4 border-b border-zinc-100 pb-3">
        <h2 className="text-xl font-bold text-zinc-900 leading-tight">
          {car.model}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          {car.year && (
            <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded">
              {car.year}
            </span>
          )}
          {car.brand && (
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
              {car.brand}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <SpecRow label="Moteur" value={car.engine} icon={<Cog size={14} />} />

        <div className="grid grid-cols-2 gap-2">
          <SpecBox label="Puissance" value={car.horsepower ? `${car.horsepower} ch` : '-'} />
          <SpecBox label="Couple" value={car.torque ? `${car.torque} Nm` : '-'} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <SpecBox label="0-100 km/h" value={car.zeroToSixty ? `${car.zeroToSixty} s` : '-'} />
          <SpecBox label="Vitesse Max" value={car.maxSpeed ? `${car.maxSpeed} km/h` : '-'} />
        </div>

        <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
          <SpecRow label="Poids" value={car.weight ? `${car.weight} kg` : '-'} icon={<Scale size={14} />} />
          <SpecRow label="Transmission" value={car.gearbox} icon={<Zap size={14} />} />
        </div>
      </div>
    </>
  )

  return (
    <div className="pointer-events-auto">
      <button
        type="button"
        onClick={() => setMobileOpen(prev => !prev)}
        className="fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-4xl bg-white/90 text-black shadow-lg md:hidden"
        aria-expanded={mobileOpen}
        aria-controls="car-spec-sheet"
      >
        {mobileOpen ? <X size={18} /> : <ChevronDown size={18} className="-rotate-90" />}
      </button>

      <div
        className={`fixed right-6 top-6 w-72 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-5 z-40 transition-transform duration-300 md:translate-y-0 md:opacity-100 ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'} md:pointer-events-auto`}
      >
        {content}
      </div>
    </div>
  )
}
function SpecRow({ label, value, icon }: { label: string, value?: string | number, icon?: React.ReactNode }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-zinc-500">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-semibold text-zinc-900 text-right">{value}</span>
    </div>
  )
}

// Une boite carrée (pour les grilles)
function SpecBox({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="bg-zinc-50 rounded-lg p-2 flex flex-col items-center justify-center text-center border border-zinc-100">
      <span className="text-[10px] text-zinc-400 uppercase tracking-wide">{label}</span>
      <span className="font-bold text-zinc-800 text-sm mt-0.5">{value}</span>
    </div>
  )
}