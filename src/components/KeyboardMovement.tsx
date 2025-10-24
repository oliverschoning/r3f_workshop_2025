import { useFrame } from "@react-three/fiber"
import { useKeyboard } from "../hooks/useKeyboard"
import { useRef } from "react"
import * as THREE from "three"

type Props = {
  speed?: number
  children?: any
}

export function KeyboardMovement({ speed = 0.05, children }: Props) {
  const keyboard = useKeyboard()
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (keyboard["w"]) {
      ref.current.position.z -= speed
    }
    if (keyboard["s"]) {
      ref.current.position.z += speed
    }
    if (keyboard["a"]) {
      ref.current.position.x -= speed
    }
    if (keyboard["d"]) {
      ref.current.position.x += speed
    }
  })

  return <group ref={ref}>{children}</group>
}
