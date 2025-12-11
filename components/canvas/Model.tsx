// components/canvas/Model.tsx
'use client'
import { useGLTF } from '@react-three/drei'

// On s'assure que Model accepte bien scale, position, rotation via props
export function Model({ url, ...props }: { url: string; [key: string]: any }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} {...props} />
}
