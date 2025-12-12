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
  displacement?: string
  horsepower?: number
  torque?: number
  weight?: number
  zeroToSixty?: number
  gearbox?: string
  groundOffset?: number
  maxSpeed?: number
}
export const CARS: CarConfig[] = [
  {
    name: 'Porsche 1975 911 (930)',
    path: '/models/Porsche-1975-911-930.glb',
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 Turbo (930)',
    year: 1975,
    engine: 'Flat-6 Turbo (Air-Cooled)',
    displacement: '3.0L',
    horsepower: 260, // 260 ch DIN
    torque: 343, // Nm
    weight: 1195, // kg
    zeroToSixty: 5.2, // s (0-100 km/h)
    gearbox: '4-speed manual',
    maxSpeed: 250 // km/h
  },
  {
    name: 'Porsche 2023 911 (992) GT3 RS',
    path: '/models/porsche-2023-911-992-gt3rs.glb',
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 (992) GT3 RS',
    year: 2023,
    engine: 'Flat-6 NA',
    displacement: '4.0L',
    horsepower: 525,
    torque: 465,
    weight: 1450,
    zeroToSixty: 3.2,
    gearbox: '7-speed PDK',
    maxSpeed: 296
  },
  {
    name: 'Porsche 2012 911 GT3 RS 4.0',
    path: '/models/porsche-2012-911-gt3-rs-4.0.glb',
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 GT3 RS 4.0',
    year: 2012,
    engine: 'Flat-6 NA (Mezger)',
    displacement: '4.0L',
    horsepower: 500,
    torque: 460,
    weight: 1360,
    zeroToSixty: 3.9,
    gearbox: '6-speed manual',
    maxSpeed: 310
  },
  {
    name: 'Porsche 911 Carrera 4S (997.1)',
    path: '/models/Porsche-911-carrera-4s.glb',
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 Carrera 4S (997)',
    year: 2005,
    engine: 'Flat-6 NA',
    displacement: '3.8L', // 3.8L
    horsepower: 355,
    torque: 400,
    weight: 1475,
    zeroToSixty: 4.8,
    gearbox: '6-speed manual', // ou Tiptronic S
    maxSpeed: 288
  },
  {
    name: 'Porsche 2022 911 GT3 (992)',
    path: '/models/porsche-2022-911-gt3.glb',
    scale: 120,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 GT3 (992)',
    year: 2022,
    engine: 'Flat-6 NA',
    displacement: '4.0L',
    horsepower: 510,
    torque: 470,
    weight: 1435,
    zeroToSixty: 3.4,
    gearbox: '7-speed PDK',
    maxSpeed: 318
  },
  {
    name: 'Porsche 2020 718 Cayman GT4',
    path: '/models/porsche-2020-718-cayman-gt4.glb',
    scale: 120,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '718 Cayman GT4',
    year: 2020,
    engine: 'Flat-6 NA',
    displacement: '4.0L',
    horsepower: 420,
    torque: 420,
    weight: 1420,
    zeroToSixty: 4.4,
    gearbox: '6-speed manual',
    maxSpeed: 304
  },
  {
    name: 'Porsche 962C',
    path: '/models/porsche-962c.glb',
    scale: 1.5,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '962C (Group C)',
    year: 1986, // Année pic de performance (modèle introduit en 84)
    engine: 'Flat-6 Twin-Turbo',
    displacement: '3.0L', // 3.0L
    horsepower: 640, // Varie selon config
    torque: 630,
    weight: 850,
    zeroToSixty: 2.6,
    gearbox: '5-speed manual',
    maxSpeed: 350
  },
  {
    name: 'Porsche 908-04 Concept',
    path: '/models/porsche-2020-908-04.glb',
    scale: 0.3,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: 'Vision 908-04',
    year: 2020,
    engine: 'Hybrid Concept', // Concept car (basé sur 918)
    displacement: '4.5L', // Théorique (V8)
    horsepower: 887, // Théorique (System)
    torque: 1280, // Théorique
    weight: 890, // Objectif concept
    zeroToSixty: 2.5,
    gearbox: '7-speed PDK',
    maxSpeed: 340
  },
  {
    name: 'Porsche 2018 911 Carrera GTS (991.2)',
    path: '/models/porsche-2018-911-carrera-gts.glb',
    scale: 100,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 Carrera GTS (991.2)',
    year: 2018,
    engine: 'Flat-6 Twin-Turbo',
    displacement: '3.0L', // 3.0L
    horsepower: 450,
    torque: 550,
    weight: 1450,
    zeroToSixty: 3.7,
    gearbox: '7-speed PDK',
    maxSpeed: 310
  },
  {
    name: 'Porsche 2019 911 Speedster (991.2)',
    path: '/models/porsche-2019-911-speedster-991.2.glb',
    scale: 100,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 Speedster (991.2)',
    year: 2019,
    engine: 'Flat-6 NA (GT3)',
    displacement: '4.0L', // 4.0L
    horsepower: 510,
    torque: 470,
    weight: 1465,
    zeroToSixty: 4.0,
    gearbox: '6-speed manual',
    maxSpeed: 310
  },
  {
    name: 'Porsche 2019 911 Targa 4S (991.2)',
    path: '/models/porsche-2019-911-targa-4s-991.2.glb',
    scale: 100,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '911 Targa 4S (991.2)',
    year: 2019,
    engine: 'Flat-6 Twin-Turbo',
    displacement: '3.0L', // 3.0L
    horsepower: 420,
    torque: 500,
    weight: 1600, // Targa is heavy
    zeroToSixty: 4.2,
    gearbox: '7-speed PDK',
    maxSpeed: 301
  },
  {
    name: 'Porsche 2015 918 Spyder',
    path: '/models/porsche-2015-918-spyder.glb',
    scale: 100,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Porsche',
    brandLogo: '/brands/porsche-logo.webp',
    model: '918 Spyder',
    year: 2015,
    engine: 'V8 Hybrid',
    displacement: '4.6L', // 4.6L
    horsepower: 887, // System Power
    torque: 1280, // System Torque
    weight: 1634,
    zeroToSixty: 2.6,
    gearbox: '7-speed PDK',
    maxSpeed: 345
  },
  {
    name: 'Datsun 240K GT (C110)',
    path: '/models/Datsun-1972-240k-gt.glb',
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Datsun',
    brandLogo: '/brands/datsun-logo.webp',
    model: '240K GT (Skyline)',
    year: 1972,
    engine: 'L24 Inline-6',
    displacement: '2.4L', // 2.4L
    horsepower: 130,
    torque: 196,
    weight: 1180,
    zeroToSixty: 9.5,
    gearbox: '5-speed manual',
    maxSpeed: 195
  },
  {
    name: 'Alfa Romeo 33 Stradale',
    path: '/models/alfa-romeo-1967-stradale.glb',
    scale: 14,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Alfa Romeo',
    brandLogo: '/brands/alfa-romeo-logo.webp',
    model: '33 Stradale',
    year: 1967,
    engine: 'V8',
    displacement: '2.0L', // 2.0L
    horsepower: 230,
    torque: 206,
    weight: 700, // Ultra light
    zeroToSixty: 5.5,
    gearbox: '6-speed manual',
    maxSpeed: 260
  },
  {
    name: 'Bugatti EB110 Super Sport',
    path: '/models/bugatti-1992-eb110-super-sport.glb',
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Bugatti',
    brandLogo: '/brands/bugatti-logo.webp',
    model: 'EB110 SS',
    year: 1992,
    engine: 'V12 Quad-Turbo',
    displacement: '3.5L', // 3.5L
    horsepower: 611,
    torque: 650,
    weight: 1418,
    zeroToSixty: 3.2,
    gearbox: '6-speed manual',
    maxSpeed: 355
  },
  {
    name: 'BMW M3 E30 Sport Evolution',
    path: '/models/bmw-1991-m3-e30.glb',
    scale: 1.2,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'BMW',
    brandLogo: '/brands/bmw-logo.webp',
    model: 'M3 E30 (Sport Evo)',
    year: 1991,
    engine: 'S14 Inline-4',
    displacement: '2.5L', // 2.5L
    horsepower: 238,
    torque: 240,
    weight: 1200,
    zeroToSixty: 6.5,
    gearbox: '5-speed manual (Dogleg)',
    maxSpeed: 248
  },
  {
    name: 'BMW M3 CSL (E46)',
    path: '/models/bmw-2003-m3-csl-e46.glb',
    scale: 124,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'BMW',
    brandLogo: '/brands/bmw-logo.webp',
    model: 'M3 CSL (E46)',
    year: 2003,
    engine: 'S54 Inline-6',
    displacement: '3.2L', // 3.2L
    horsepower: 360,
    torque: 370,
    weight: 1385,
    zeroToSixty: 4.9,
    gearbox: '6-speed SMG II',
    maxSpeed: 250 // Limité
  },
  {
    name: 'Toyota AE86 Sprinter Trueno GT-Apex',
    path: '/models/toyota-1995-ae86-sprinter-trueno.glb',
    scale: 0.014,
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    brand: 'Toyota',
    brandLogo: '/brands/toyota-logo.webp',
    model: 'AE86 Sprinter Trueno',
    year: 1985, // Production 83-87. 1995 est une erreur (Initial D era popularity?)
    engine: '4A-GE Inline-4',
    displacement: '1.6L', // 1.6L
    horsepower: 128,
    torque: 149,
    weight: 970, // Lightweight
    zeroToSixty: 8.5,
    gearbox: '5-speed manual',
    maxSpeed: 193
  }
]
