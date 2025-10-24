import { Canvas } from "@react-three/fiber"
import { Box, Grid, PerspectiveCamera, Sky } from "@react-three/drei"
import { KeyboardMovement } from "../../components/KeyboardMovement"
import { degToRad } from "three/src/math/MathUtils.js"

export function KeyboardMovementExample() {
  return (
    <Canvas>
      <App />
    </Canvas>
  )
}

function App() {
  return (
    <>
      <Grid args={[10, 10]} />
      <Sky />
      <KeyboardMovement>
        <Box>
          <meshBasicMaterial color={"cornflowerblue"} />
        </Box>
      </KeyboardMovement>
      <PerspectiveCamera makeDefault position={[0, 10, 10]} rotation={[degToRad(-45), 0, 0]} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
    </>
  )
}


