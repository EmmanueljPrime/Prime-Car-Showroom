export type CarConfig = {
  name: string
  path: string
  scale?: number // Échelle (défaut: 1)
  position?: [number, number, number] // Position X, Y, Z (défaut: [0, 0, 0])
  rotation?: [number, number, number] // Rotation X, Y, Z (défaut: [0, 0, 0])
  brand?: string
  brandLogo?: string
  model?: string
  year?: number
  engine?: string
  horsepower?: number
  torque?: number
  weight?: number
  zeroToSixty?: number
  gearbox?: string
}
export const CARS: CarConfig[] = [
  {
    name: 'Porsche 1975 911 (930)',
    path: '/models/Porsche-1975-911-930.glb', // Ton fichier actuel
    scale : 1,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 (930)',
    year: 1975,
    engine: 'Flat-6',
    horsepower: 260,
    torque: 273,
    weight: 1200,
    zeroToSixty: 5.5,
    gearbox: '4-speed manual',
  },
  {
    name: 'Porsche 2023 911 (992) GT3 RS',
    path: '/models/porsche-2023-911-992-gt3rs.glb', // Ton fichier actuel
    scale : 1,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 (992) GT3 RS',
    year: 2023,
  },
  {
    name: 'Porsche 2012 911 GT3 RS 4.0',
    path: '/models/porsche-2012-911-gt3-rs-4.0.glb', // Ton fichier actuel
    scale : 1,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 GT3 RS 4.0',
    year: 2012,
  },
  {
    name: 'Porsche 911 carrera 4s',
    path: '/models/Porsche-911-carrera-4s.glb', // Ton fichier actuel
    scale : 1,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 carrera 4s',
    year: 2005,
  },
  {
    name: 'Porsche 2022 911 GT3',
    path: '/models/porsche-2022-911-gt3.glb', // Ton fichier actuel
    scale : 120,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 gt3',
    year: 2022,
  },
  {
    name: 'Porsche 2020 718 Cayman GT4 rs',
    path: '/models/porsche-2020-718-cayman-gt4.glb', // Ton fichier actuel
    scale : 120,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '718 Cayman GT4',
    year: 2020,
  },
  {
    name: 'Porsche 962c',
    path: '/models/porsche-962c.glb', // Ton fichier actuel
    scale : 1.5,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '962c',
    year: 1992,
  },
  {
    name: 'Porsche 2020 908 04',
    path: '/models/porsche-2020-908-04.glb', // Ton fichier actuel
    scale : 0.3,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '908 04',
    year: 2020,
  },
  {
    name: 'Porsche 2018 911 carrera gts',
    path: '/models/porsche-2018-911-carrera-gts.glb', // Ton fichier actuel
    scale : 100,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 carrera gts',
    year: 2018,
  },
  {
    name: 'Porsche 2019 911 speedster 991.2',
    path: '/models/porsche-2019-911-speedster-991.2.glb', // Ton fichier actuel
    scale : 100,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 speedster 991.2',
    year: 2019,
  },
  {
    name: 'Porsche 2019 911 targa 4s 991.2',
    path: '/models/porsche-2019-911-targa-4s-991.2.glb', // Ton fichier actuel
    scale : 100,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 targa 4s 991.2',
    year: 2019,
  },
  {
    name: 'Porsche 2015 918 spyder',
    path: '/models/porsche-2015-918-spyder.glb', // Ton fichier actuel
    scale : 100,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '918 spyder',
    year: 2015,
  },
  {
    name: 'Datsun 1972 240k gt',
    path: '/models/Datsun-1972-240k-gt.glb', // Ton fichier actuel
    scale : 1,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Datsun',
    brandLogo: '/brands/datsun-logo.webp',
    model: '240k gt',
    year: 1972,
  },
  {
    name: 'Alfa Romeo 1967 Stradale',
    path: '/models/alfa-romeo-1967-stradale.glb',
    scale : 14,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Alfa Romeo',
    brandLogo: '/brands/alfa-romeo-logo.webp',
    model: 'Stradale',
    year: 1967,
  },
  {
    name: 'Bugatti 1992 EB110 Super Sport',
    path: '/models/bugatti-1992-eb110-super-sport.glb',
    scale : 1,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Bugatti',
    brandLogo: '/brands/bugatti-logo.webp',
    model: 'EB110 Super Sport',
    year: 1992,
  },
  {
    name: 'Bmw 1991 M3 E30',
    path: '/models/bmw-1991-m3-e30.glb',
    scale : 1.2,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'BMW',
    brandLogo: '/brands/bmw-logo.webp',
    model: 'M3 E30',
    year: 1991,
  },
  {
    name: 'Bmw 2003 M3 CSL E46',
    path: '/models/bmw-2003-m3-csl-e46.glb',
    scale : 124,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'BMW',
    brandLogo: '/brands/bmw-logo.webp',
    model: 'M3 CSL E46',
    year: 2003,
  },
  {
    name: 'Toyota 1995 AE86 Sprinter Trueno',
    path: '/models/toyota-1995-ae86-sprinter-trueno.glb',
    scale : 0.014,
    position : [0, 0, 0],
    rotation : [0, Math.PI, 0],
    brand: 'Toyota',
    brandLogo: '/brands/toyota-logo.webp',
    model: 'AE86 Sprinter Trueno',
    year: 1995,
  },
  
]