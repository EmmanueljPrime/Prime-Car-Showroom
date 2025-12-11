import { BrandStrategy } from '../types'

export const defaultStrategy: BrandStrategy = (cars) => {
  // Par défaut, on met tout dans "Tous les modèles"
  return { 'Modèles': cars }
}
