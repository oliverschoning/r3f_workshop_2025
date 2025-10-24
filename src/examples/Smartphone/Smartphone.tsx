import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

import Phone from "../../components/Smartphone"
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei"
import { createXRStore, XR } from "@react-three/xr"

const store = createXRStore()

export function Smartphone() {
  return (
    <Canvas>
      <XR store={store}>
        <App />
      </XR>
    </Canvas>
  )
}


function App() {
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, -5]} />
      <directionalLight position={[0, 0, 5]} />
      <Phone />
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <Sky />
    </>
  )
}
