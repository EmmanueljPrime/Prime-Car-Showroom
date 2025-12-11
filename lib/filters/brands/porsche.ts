import { BrandStrategy } from '../types'
import { CarConfig } from '@/lib/cars'

export const porscheStrategy: BrandStrategy = (cars) => {
  const groups: Record<string, CarConfig[]> = {}
  
  cars.forEach(car => {
    // On normalise en minuscule pour faciliter la détection
    const name = (car.model || car.name).toLowerCase()
    
    // Par défaut, si on ne trouve rien
    let family = 'Autres Modèles'

    // --- 1. LES ICÔNES (911) ---
    // On détecte "911" mais on peut être plus fin si le nom contient la génération
    if (name.includes('911')) {
      family = '911'
      
      // OPTIONNEL : Si tu veux sous-diviser les 911 par génération, décommente ça :
      /*
      if (name.includes('930')) family = '911 (Classic / 930)'
      else if (name.includes('964')) family = '911 (964)'
      else if (name.includes('993')) family = '911 (993)'
      else if (name.includes('996')) family = '911 (996)'
      else if (name.includes('997')) family = '911 (997)'
      else if (name.includes('991')) family = '911 (991)'
      else if (name.includes('992')) family = '911 (992)'
      */
    }
    
    // --- 2. LES SPORTIVES MOTEUR CENTRAL (718, Cayman, Boxster) ---
    else if (
      name.includes('718') || 
      name.includes('cayman') || 
      name.includes('boxster')
    ) {
      family = '718 / Cayman / Boxster'
    }

    // --- 3. LES HYPERCARS & SUPERCAR ---
    else if (
      name.includes('918') || 
      name.includes('carrera gt') || 
      name.includes('959') ||
      name.includes('gt1')
    ) {
      family = 'Hypercars & Supercars'
    }

    // --- 4. ÉLECTRIQUE (Taycan) ---
    else if (name.includes('taycan')) {
      family = 'Taycan (Électrique)'
    }

    // --- 5. BERLINES & SUV (Panamera, Macan, Cayenne) ---
    else if (name.includes('panamera')) {
      family = 'Panamera'
    }
    else if (name.includes('macan')) {
      family = 'Macan'
    }
    else if (name.includes('cayenne')) {
      family = 'Cayenne'
    }

    // --- 6. LÉGENDES & COURSE (Le Mans, Dakar, Classiques) ---
    else if (
      name.includes('917') || 
      name.includes('962') || 
      name.includes('956') || 
      name.includes('935') || 
      name.includes('919') || // LMP1 Hybrid
      name.includes('908') ||
      name.includes('904') ||
      name.includes('906') ||
      name.includes('rs spyder') ||
      name.includes('dakar')
    ) {
      family = 'Légendes de Course'
    }

    // --- 7. ANCÊTRES (356, 550) ---
    else if (
      name.includes('356') || 
      name.includes('550') || 
      name.includes('speedster') // Souvent lié aux anciennes
    ) {
      family = 'Classiques & Ancêtres'
    }

    // --- 8. TRANSAXLES (944, 928, 968, 924) ---
    else if (
      name.includes('944') || 
      name.includes('928') || 
      name.includes('968') || 
      name.includes('924')
    ) {
      family = 'Transaxles (FR)'
    }

    // --- Ajout au groupe ---
    if (!groups[family]) groups[family] = []
    groups[family].push(car)
  })

  // --- TRI FINAL ---
  // On veut souvent afficher la 911 en premier, puis les Hypercars, etc.
  // JS ne garantit pas l'ordre des clés d'objet, mais dans la plupart des UI modernes (Sidebar),
  // on itère souvent via Object.keys(). Pour forcer un ordre visuel, 
  // on peut recréer l'objet dans l'ordre voulu.
  
  const orderedGroups: Record<string, CarConfig[]> = {}
  
  // Ordre de priorité d'affichage
  const priorityOrder = [
    '911',
    'Hypercars & Supercars',
    '718 / Cayman / Boxster',
    'Taycan (Électrique)',
    'Panamera',
    'Macan',
    'Cayenne',
    'Légendes de Course',
    'Classiques & Ancêtres',
    'Transaxles (FR)',
    'Autres Modèles'
  ]

  // On remplit dans l'ordre
  priorityOrder.forEach(key => {
    if (groups[key]) orderedGroups[key] = groups[key]
  })

  // On n'oublie pas ceux qui ne sont pas dans la liste de priorité (au cas où)
  Object.keys(groups).forEach(key => {
    if (!orderedGroups[key]) orderedGroups[key] = groups[key]
  })

  return orderedGroups
}
