
export type EnvironmentConfig = {
  id: string
  name: string
  preset: "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby"
  backgroundColor?: string
  groundColor: string
}

export const ENVIRONMENTS: EnvironmentConfig[] = [
  {
    id: 'studio',
    name: 'Studio Blanc',
    preset: 'studio',
    backgroundColor: '#f4f4f5', 
    groundColor: '#e4e4e7', 
  },
  {
    id: 'city',
    name: 'Ville Urbaine',
    preset: 'city',
    backgroundColor: '#0f172a',
    groundColor: '#18181b', 
  },
  {
    id: 'forest',
    name: 'Forêt Nature',
    preset: 'forest',
    backgroundColor: '#0f2417',
    groundColor: '#3f6212', 
  },
  {
    id: 'night',
    name: 'Nuit',
    preset: 'night',
    backgroundColor: '#020617',
    groundColor: '#000000',
  }
]
