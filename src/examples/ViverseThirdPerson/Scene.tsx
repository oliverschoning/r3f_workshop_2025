import { Sky } from '@react-three/drei'
import { SimpleCharacter, BvhPhysicsBody, PrototypeBox } from '@react-three/viverse'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export function Scene() {
const characterRef = useRef<Group>(null)

// Respawn logic - reset character position if they fall off the map
useFrame(() => {
  if (characterRef.current == null) {
    return
  }
  if (characterRef.current.position.y < -10) {
    characterRef.current.position.set(0, 0, 0)
  }
})

return (
  <>
    {/* Environment */}
    <Sky />
    
    {/* Lighting */}
    <directionalLight
      intensity={1.2}
      position={[5, 10, 10]}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
    <ambientLight intensity={1} />
    
    {/* Character */}
    <SimpleCharacter ref={characterRef} />
    
    {/* Level Geometry */}
    <BvhPhysicsBody>
      {/* Main ground */}
      <PrototypeBox 
        color="#ffffff" 
        scale={[10, 0.5, 10]} 
        position={[0, -2, 0]} 
      />
      
      {/* Platforms */}
      <PrototypeBox 
        color="#cccccc" 
        scale={[2, 1, 3]} 
        position={[4, 0, 0]} 
      />
      <PrototypeBox 
        color="#ffccff" 
        scale={[3, 1, 3]} 
        position={[3, 1.5, -1]} 
      />
      <PrototypeBox 
        color="#ccffff" 
        scale={[2, 0.5, 3]} 
        position={[2, 2.5, -3]} 
      />
      <PrototypeBox 
        color="#ffccff" 
        scale={[2, 1, 3]} 
        position={[-3, 0, -2]} 
      />
      <PrototypeBox 
        color="#ccffff" 
        scale={[1, 1, 4]} 
        position={[0, -1, 0]} 
      />
      <PrototypeBox 
        color="#ffffcc" 
        scale={[4, 1, 1]} 
        position={[0, 3.5, 0]} 
      />
    </BvhPhysicsBody>
  </>
)
}
