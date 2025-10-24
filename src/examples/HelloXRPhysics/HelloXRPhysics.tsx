import { Canvas } from "@react-three/fiber"
import { Box, Grid } from "@react-three/drei"
import { Handle, HandleTarget } from "@react-three/handle"
import { Physics, RigidBody } from "@react-three/rapier"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { createXRStore, XR, XROrigin, noEvents } from "@react-three/xr"

const xrStore = createXRStore()

export function HelloXRPhysics() {
  return (
    <Canvas events={noEvents} >
      <Suspense>
        <Physics debug>
          <XR store={xrStore}>

            <App />
          </XR>
        </Physics>
      </Suspense>
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
          <RigidBody>
            <Box ref={ref}>
              <meshNormalMaterial />
            </Box>
          </RigidBody>
        </Handle>
      </HandleTarget>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />

      <XROrigin position={[0, 0, 1]} />

      <Grid args={[10, 10]} />
      <RigidBody colliders="cuboid" type="fixed">
        <Box args={[10, 0.1, 10]} />
      </RigidBody>
    </>
  )
}


