import { Canvas, useFrame } from "@react-three/fiber"
import { Box, DragControls } from "@react-three/drei"
import { Handle, HandleTarget } from "@react-three/handle"
import { useRef } from "react"
import * as THREE from "three"
import { createXRStore, XR, XROrigin, RayGrab, noEvents } from "@react-three/xr"

const xrStore = createXRStore()

export function HelloXR() {
  return (
    <Canvas events={noEvents} >
      <XR store={xrStore}>
        <App />
      </XR>
    </Canvas>
  )
}

function App() {
  // reference to the three object
  const ref = useRef<THREE.Mesh>(null!)

  return (
    <>
      <HandleTarget>
        <Handle>
          <Box ref={ref}>
            <meshNormalMaterial />
          </Box>
        </Handle>
      </HandleTarget>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />

      <XROrigin position={[0, 0, 1]} />
    </>
  )
}


