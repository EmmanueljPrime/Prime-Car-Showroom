import { CarConfig } from '@/lib/cars'
import { BrandStrategy } from './types'

// Imports des stratégies individuelles
import { porscheStrategy } from './brands/porsche'
import { bmwStrategy } from './brands/bmw'
import { defaultStrategy } from './brands/default'

// Registre central
const STRATEGIES: Record<string, BrandStrategy> = {
  'Porsche': porscheStrategy,
  'BMW': bmwStrategy,
  // Ajoute tes futures marques ici...
}

export type GarageHierarchy = Record<string, Record<string, CarConfig[]>>

export function organizeGarage(cars: CarConfig[]): GarageHierarchy {
  const hierarchy: GarageHierarchy = {}

  // 1. Groupement par marque
  const carsByBrand: Record<string, CarConfig[]> = {}
  cars.forEach(car => {
    const brand = car.brand || 'Autre'
    if (!carsByBrand[brand]) carsByBrand[brand] = []
    carsByBrand[brand].push(car)
  })

  // 2. Application des stratégies
  Object.keys(carsByBrand).forEach(brand => {
    // Si la marque a son fichier dédié, on l'utilise, sinon default
    const strategy = STRATEGIES[brand] || defaultStrategy
    hierarchy[brand] = strategy(carsByBrand[brand])
  })

  return hierarchy
}
