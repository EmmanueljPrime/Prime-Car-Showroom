import { CarConfig } from '@/lib/cars'

export type CarGroup = Record<string, CarConfig[]>
export type BrandStrategy = (cars: CarConfig[]) => CarGroup
