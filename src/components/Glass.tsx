import { useMemo } from 'react'
import * as THREE from 'three'
import { degToRad } from 'three/src/math/MathUtils.js'

function Glass() {
  const geometry = useMemo(() => {
    const width = 0.68
    const height = 1.52
    const radius = 0.032
    const segments = 32

    const shape = new THREE.Shape()

    // Create rounded rectangle path
    const x = -width / 2
    const y = -height / 2
    const w = width
    const h = height
    const r = radius

    shape.moveTo(x + r, y)
    shape.lineTo(x + w - r, y)
    shape.quadraticCurveTo(x + w, y, x + w, y + r)
    shape.lineTo(x + w, y + h - r)
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    shape.lineTo(x + r, y + h)
    shape.quadraticCurveTo(x, y + h, x, y + h - r)
    shape.lineTo(x, y + r)
    shape.quadraticCurveTo(x, y, x + r, y)

    const geometry = new THREE.ShapeGeometry(shape, segments)
    return geometry
  }, [])


  return (
    <mesh
      geometry={geometry}
      position={[0, 0, 0.055]}
      rotation={[degToRad(0), degToRad(180), 0]}
      renderOrder={3}
    >
      <meshPhysicalMaterial
        metalness={1}
        roughness={0.1}
        envMapIntensity={0.5}
        clearcoat={0.5}
        transparent={true}
        opacity={0.25}
        reflectivity={0.2}
        side={1}
      />
    </mesh>
  )
}

export default Glass
