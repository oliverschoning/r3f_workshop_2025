import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Box, OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei"
import { Container, Fullscreen, Root, Text } from "@react-three/uikit"
import { useCallback, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { createXRStore, useXRStore, XR } from "@react-three/xr"
import { colorscheme } from "../../store"
import { useWebSocket } from "../../hooks/useWebSocket"

const urlParams = new URLSearchParams(window.location.search);
const xr = urlParams.get('xr');

const store = createXRStore({ offerSession: xr === "true" })

export function Presentation() {
  return (
    <Canvas>
      <XR store={store}>
        <App />
      </XR>
    </Canvas>
  )
}

const SLIDE_WIDTH = 8
const SLIDE_HEIGHT = 4
const OFFSET = 4

const positions = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0)
]

positions.forEach((p, i) => {
  p.x = i * SLIDE_WIDTH + (OFFSET * i)
})

function App() {
  const ref = useRef<THREE.Group>(null!)
  const { camera } = useThree()

  const { sendMessage } = useWebSocket((message) => {
    console.log(message.data);
    try {
      const data = JSON.parse(message.data);
      setState(data)
    } catch (err) {
      console.log(err);
    }
  })

  const [state, setState] = useState({ slide: 0, pluggedIn: false })

  useEffect(() => {
    const group = ref.current
    if (!group) {
      return
    }

    const p = positions[state.slide]
    if (!p) {
      return
    }

    camera.position.x = p.x
  }, [state])

  function handleSlidePrevClicked() {
    if (state.slide === 0) {
      return
    }
    const data = { ...state, slide: state.slide - 1 }
    const message = JSON.stringify(data)
    sendMessage(message)
  }

  function handleSlideNextClicked() {
    const data = { ...state, slide: state.slide + 1 }
    if (data.slide >= positions.length) {
      data.slide = 0;
    }
    console.log(data);
    const message = JSON.stringify(data)
    sendMessage(message)
  }

  const [xr, setXR] = useState(false)

  const xrStore = useXRStore()

  useEffect(() => {
    xrStore.subscribe(state => {
      setXR(!!state.session);
    })
  }, [])


  if (xr) {
    return (<>
      <Box>
        <meshStandardMaterial color={"white"} />
      </Box>
    </>)

  }

  return (
    <>
      <Fullscreen>
        {state.slide === 0 && (<Slide0 />)}
      </Fullscreen>
    </>
  );
}

function Slide0(props: any) {
  return (
    <Container
      borderWidth={10}
      flexGrow={1}
      width={"100%"}
      height={"100%"}
      alignItems="flex-end"
      justifyContent={"center"}
      padding={10}
      flexDirection={"column"}
    >
      <Container width={"100%"} flexGrow={1} backgroundColor={colorscheme.tokionightmoon.bg}>
        <Text color={colorscheme.tokionightmoon.fg} margin={10}>{
          `
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );

}
        `

        }</Text>
      </Container>
      <Container gap={10} borderWidth={10}>

      </Container>
    </Container >
  );
}


