import { Suspense } from "react"
import { Viverse } from '@react-three/viverse'
import { Scene } from "./Scene"
import { Canvas } from "@react-three/fiber"

export function ViverseThirdPerson() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Viverse>
          <Scene />
        </Viverse>
      </Suspense>
    </Canvas>
  )
}
