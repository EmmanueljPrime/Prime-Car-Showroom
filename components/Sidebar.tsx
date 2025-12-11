'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { CARS, CarConfig } from '@/lib/cars'
import { organizeGarage } from '@/lib/filters' // Ton nouvel import magique
import { ChevronDown, ChevronRight, X } from 'lucide-react'

interface SidebarProps {
  currentCar: CarConfig
  onSelect: (car: CarConfig) => void
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ currentCar, onSelect, isOpen = true, onClose }: SidebarProps) {
  // 1. On organise tout le garage au chargement
  const garage = useMemo(() => organizeGarage(CARS), [])
  const brands = Object.keys(garage)

  // 2. États d'ouverture
  // On ouvre par défaut la marque ET la famille de la voiture actuelle
  const [openBrands, setOpenBrands] = useState<string[]>([currentCar.brand || 'Autre'])
  
  // Petite astuce : on stocke les familles ouvertes sous forme "Marque/Famille" pour éviter les collisions si deux marques ont une famille "Autres"
  const [openFamilies, setOpenFamilies] = useState<string[]>([])

  useEffect(() => {
    const brand = currentCar.brand || 'Autre'

    const frame = requestAnimationFrame(() => {
      setOpenBrands(prev => (prev.includes(brand) ? prev : [...prev, brand]))

      const familiesForBrand = garage[brand]
      if (!familiesForBrand) return

      const matchingFamily = Object.entries(familiesForBrand).find(([, cars]) =>
        cars.some(car => car.path === currentCar.path)
      )

      if (!matchingFamily) return

      const familyKey = `${brand}/${matchingFamily[0]}`
      setOpenFamilies(prev => (prev.includes(familyKey) ? prev : [...prev, familyKey]))
    })

    return () => cancelAnimationFrame(frame)
  }, [currentCar, garage])

  const toggleBrand = (brand: string) => {
    setOpenBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])
  }

  const toggleFamily = (brand: string, family: string) => {
    const key = `${brand}/${family}`
    setOpenFamilies(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  return (
    <nav
      className={`
        fixed left-0 top-0 h-full w-full max-w-sm bg-white/95 backdrop-blur-xl border-r border-zinc-200
        p-4 flex flex-col gap-6 pointer-events-auto z-50 overflow-y-auto custom-scrollbar
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:w-80 md:max-w-none
      `}
      role="navigation"
      aria-label="Garage"
      aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between px-2">
        <h2 className="font-bold text-2xl text-zinc-900 tracking-tight flex items-center gap-2">
          GARAGE
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-colors"
            aria-label="Fermer le garage"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <div className="flex flex-col gap-3">
        {brands.map(brand => {
          const families = garage[brand]
          const familyNames = Object.keys(families)
          const firstCar = families[familyNames[0]][0]
          const isBrandOpen = openBrands.includes(brand)

          return (
            <div key={brand} className="flex flex-col border border-zinc-100 rounded-xl overflow-hidden bg-zinc-50/50">
              <button 
                onClick={() => toggleBrand(brand)}
                className="flex items-center justify-between w-full p-4 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  {firstCar.brandLogo && (
                    <Image
                      src={firstCar.brandLogo}
                      alt={brand}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  )}
                  <span className="font-bold text-base text-zinc-800">{brand}</span>
                </div>
                {isBrandOpen ? <ChevronDown size={18} className="text-zinc-400"/> : <ChevronRight size={18} className="text-zinc-400"/>}
              </button>

              {isBrandOpen && (
                <div className="bg-white border-t border-zinc-100 flex flex-col">
                  {familyNames.map(family => {
                    const carsInFamily = families[family]
                    const familyKey = `${brand}/${family}`
                    const isFamilyOpen = openFamilies.includes(familyKey)
                    const showDirectly = family === 'Modèles' || carsInFamily.length === 1

                    if (showDirectly) {
                      return carsInFamily.map(car => (
                        <CarButton key={car.path} car={car} currentCar={currentCar} onSelect={onSelect} onClose={onClose} />
                      ))
                    }

                    return (
                      <div key={family} className="flex flex-col">
                        <button
                          onClick={() => toggleFamily(brand, family)}
                          className="flex items-center justify-between w-full py-2 px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                        >
                          <span>{family}</span>
                          <div className="flex items-center gap-2">
                            <span className="bg-zinc-100 text-zinc-400 px-1.5 py-0.5 rounded text-[10px]">{carsInFamily.length}</span>
                            {isFamilyOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                          </div>
                        </button>

                        {isFamilyOpen && (
                          <div className="flex flex-col pb-2">
                            {carsInFamily.map(car => (
                              <CarButton key={car.path} car={car} currentCar={currentCar} onSelect={onSelect} onClose={onClose} />
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

// Petit composant extrait pour éviter la répétition
function CarButton({ car, currentCar, onSelect, onClose }: { car: CarConfig, currentCar: CarConfig, onSelect: (c: CarConfig) => void, onClose?: () => void }) {
  const isSelected = currentCar.path === car.path // Ou car.id si tu as des ids uniques
  return (
    <button
      onClick={() => {
        onSelect(car)
        onClose?.()
      }}
      className={`
        text-left py-2 px-4 text-sm transition-all border-l-2 ml-4
        ${isSelected 
          ? 'border-black text-black font-semibold bg-zinc-50' 
          : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-200'}
      `}
    >
      {/* On nettoie le nom pour éviter "Porsche 911..." dans la liste sous Porsche */}
      {car.model || car.name}
    </button>
  )
}
