import { BrandStrategy } from '../types'

export const bmwStrategy: BrandStrategy = (cars) => {
  const groups: Record<string, typeof cars> = {}
  
  cars.forEach(car => {
    const name = (car.model || car.name).toLowerCase()
    let family = 'Autres'

    if (name.includes('m3')) family = 'M3'
    else if (name.includes('m5')) family = 'M5'
    
    if (!groups[family]) groups[family] = []
    groups[family].push(car)
  })
  return groups
}
