import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Viverse,
  SimpleCharacter,
  BvhPhysicsBody,
  PrototypeBox,
  FirstPersonCharacterCameraBehavior,
  PointerLockInput,
  LocomotionKeyboardInput,
} from '@react-three/viverse'

export function ViverseFirstPerson() {
  return (
    <Canvas
      onClick={(e) => (e.target as HTMLElement).requestPointerLock()}
      style={{ position: 'absolute', inset: '0', touchAction: 'none' }}
    >
      <Viverse>
        <Sky />
        <directionalLight intensity={1.2} position={[-10, 10, -10]} />
        <ambientLight intensity={1} />
        <SimpleCharacter
          model={false}
          input={[LocomotionKeyboardInput, PointerLockInput]}
          cameraBehavior={FirstPersonCharacterCameraBehavior}
        />
        <BvhPhysicsBody>
          <PrototypeBox scale={[10, 1, 15]} position={[0, -0.5, 0]} />
        </BvhPhysicsBody>
      </Viverse>
    </Canvas>
  )
}
