import { Canvas, useFrame } from "@react-three/fiber"
import { Box } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import { createXRStore, XR, XROrigin } from "@react-three/xr"

const store = createXRStore()

const xrStore = createXRStore()

export function HelloXR() {
  return (
    <Canvas>
      <XR store={xrStore}>
        <App />
      </XR>
    </Canvas>
  )
}

function App() {
  // reference to the three object
  const ref = useRef<THREE.Mesh>(null!)

  // on every frame:
  useFrame(() => {
    const box = ref.current

    box.rotation.x += 0.01
    box.rotation.y += 0.01
    box.rotation.z += 0.01
  })

  return (
    <>
      <Box ref={ref}>
        <meshNormalMaterial />
      </Box>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />

      <XROrigin position={[0, 0, 1]} />
    </>
  )
}


