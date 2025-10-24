import { Environment, OrbitControls, RoundedBox } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import Screen, { useDeviceOrientation } from "./Screen"
import Glass from "./Glass"
import { useRef } from "react"



export default function Smartphone() {
  const { beta, gamma } = useDeviceOrientation()
  const ref = useRef<any>(null!)

  useFrame(() => {
    const meshRef = ref;

    if (meshRef.current) {
      // scale down so it’s not too sensitive
      meshRef.current.rotation.x = (beta / 180) * Math.PI;
      meshRef.current.rotation.y = (gamma / 90) * Math.PI;
    }
  });


  return (
    <group ref={ref}>
      <RoundedBox
        args={[0.733, 1.565, 0.096]}
        radius={0.02}
        renderOrder={1}
      >
        <meshStandardMaterial metalness={1} roughness={0.4} color={"#C0C0C0"} />


        {/* Volume Up Button */}
        <RoundedBox
          args={[0.03, 0.15, 0.04]}
          radius={0.01}
          position={[-0.36, 0.2, 0]}
        >
          <meshStandardMaterial metalness={1} roughness={0.4} color={"#C0C0C0"} />
        </RoundedBox>

        {/* Volume Down Button */}
        <RoundedBox
          args={[0.03, 0.15, 0.04]}
          radius={0.01}
          position={[-0.36, 0.01, 0]}
        >
          <meshStandardMaterial metalness={1} roughness={0.4} color={"#C0C0C0"} />
        </RoundedBox>
      </RoundedBox>

      <Screen />

      <Glass />
    </group>
  )
}

