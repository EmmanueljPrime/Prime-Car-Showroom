'use client'

import { useState, useMemo } from 'react'
import { CARS, CarConfig } from '@/lib/cars'
import { organizeGarage } from '@/lib/filters' // Ton nouvel import magique
import { ChevronDown, ChevronRight } from 'lucide-react'

interface SidebarProps {
  currentCar: CarConfig
  onSelect: (car: CarConfig) => void
}

export function Sidebar({ currentCar, onSelect }: SidebarProps) {
  // 1. On organise tout le garage au chargement
  const garage = useMemo(() => organizeGarage(CARS), [])
  const brands = Object.keys(garage)

  // 2. États d'ouverture
  // On ouvre par défaut la marque ET la famille de la voiture actuelle
  const [openBrands, setOpenBrands] = useState<string[]>([currentCar.brand || 'Autre'])
  
  // Petite astuce : on stocke les familles ouvertes sous forme "Marque/Famille" pour éviter les collisions si deux marques ont une famille "Autres"
  const [openFamilies, setOpenFamilies] = useState<string[]>([])

  const toggleBrand = (brand: string) => {
    setOpenBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])
  }

  const toggleFamily = (brand: string, family: string) => {
    const key = `${brand}/${family}`
    setOpenFamilies(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  return (
    <nav className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-zinc-200 p-4 flex flex-col gap-6 pointer-events-auto z-50 overflow-y-auto custom-scrollbar">
      <h2 className="font-bold text-2xl px-2 text-zinc-900 tracking-tight flex items-center gap-2">
        GARAGE
      </h2>
      
      <div className="flex flex-col gap-3">
        {brands.map(brand => {
          // On récupère les familles de cette marque (ex: { "911": [...], "Hypercars": [...] })
          const families = garage[brand]
          const familyNames = Object.keys(families)
          
          // On chope le logo depuis la première voiture trouvée
          // (On prend la première voiture de la première famille)
          const firstCar = families[familyNames[0]][0]
          
          const isBrandOpen = openBrands.includes(brand)

          return (
            <div key={brand} className="flex flex-col border border-zinc-100 rounded-xl overflow-hidden bg-zinc-50/50">
              {/* --- NIVEAU 1 : MARQUE --- */}
              <button 
                onClick={() => toggleBrand(brand)}
                className="flex items-center justify-between w-full p-4 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {firstCar.brandLogo && (
                    <img 
                      src={firstCar.brandLogo} 
                      alt={brand} 
                      className="w-6 h-6 object-contain" 
                    />
                  )}
                  <span className="font-bold text-base text-zinc-800">{brand}</span>
                </div>
                {isBrandOpen ? <ChevronDown size={18} className="text-zinc-400"/> : <ChevronRight size={18} className="text-zinc-400"/>}
              </button>

              {/* Contenu de la marque */}
              {isBrandOpen && (
                <div className="bg-white border-t border-zinc-100 flex flex-col">
                  {familyNames.map(family => {
                    const carsInFamily = families[family]
                    const isFamilyOpen = openFamilies.includes(`${brand}/${family}`)
                    
                    // Cas Spécial : Si la famille s'appelle "Modèles" (défaut) ou n'a qu'une seule voiture, 
                    // on affiche directement les voitures sans sous-menu pour alléger
                    const showDirectly = family === 'Modèles' || carsInFamily.length === 1

                    if (showDirectly) {
                      return carsInFamily.map(car => (
                        <CarButton key={car.path} car={car} currentCar={currentCar} onSelect={onSelect} />
                      ))
                    }

                    // Sinon, on affiche le sous-menu Famille
                    return (
                      <div key={family} className="flex flex-col">
                         {/* --- NIVEAU 2 : FAMILLE --- */}
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

                        {/* --- NIVEAU 3 : MODÈLES --- */}
                        {isFamilyOpen && (
                           <div className="flex flex-col pb-2">
                             {carsInFamily.map(car => (
                               <CarButton key={car.path} car={car} currentCar={currentCar} onSelect={onSelect} />
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
function CarButton({ car, currentCar, onSelect }: { car: CarConfig, currentCar: CarConfig, onSelect: (c: CarConfig) => void }) {
  const isSelected = currentCar.path === car.path // Ou car.id si tu as des ids uniques
  return (
    <button
      onClick={() => onSelect(car)}
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
