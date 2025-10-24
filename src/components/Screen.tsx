import { Root, Container, type ContainerProperties, Text, Image } from '@react-three/uikit'
import { AtSign, FileText, House, User } from '@react-three/uikit-lucide'


import { useEffect, useState } from "react";

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({
    alpha: 0, // rotation around z-axis
    beta: 0,  // rotation around x-axis
    gamma: 0, // rotation around y-axis
  });

  useEffect(() => {
    function handleOrientation(event: any) {
      setOrientation({
        alpha: event.alpha ?? 0,
        beta: event.beta ?? 0,
        gamma: event.gamma ?? 0,
      });
    }

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return orientation;
}

function TopPanel() {
  return (
    <Container width={"100%"} flexDirection={"column"} flexGrow={1}>
      < Container width={"100%"} justifyContent={"space-between"} padding={4} >
        <AtSign color={"white"} width={8} />
        <User color="white" width={8} borderWidth={0.5} borderRadius={10} padding={1} />
      </Container>
    </Container >
  )
}


function Content() {
  return <Container flexGrow={3}>
    <Image src={"/logo.png"} />
  </Container>
}


type MenuButtonProps = ContainerProperties & { active?: boolean }

function MenuButton({ children, active, ...props }: MenuButtonProps) {
  return (
    <Container
      backgroundColor={active ? "#16161D" : "black"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={4}
      hover={{ backgroundColor: "#16161D" }}
      gap={1}
      {...props}
    >
      {children}
    </Container>
  )
}

function BottomPanel() {

  return (
    <Container
      width={"100%"}
      backgroundColor={"black"}
      borderBottomRadius={3}
      justifyContent={"space-between"}
    >
      <MenuButton flexGrow={1} borderBottomLeftRadius={3}
      >
        <House width={4} height={4} color={"white"} />
        <Text fontSize={2} fontWeight="bold" color="white">Meetup</Text>
      </MenuButton>

      <MenuButton flexGrow={1} borderBottomRightRadius={3}>
        <FileText width={4} height={4} color={"white"} />
        <Text fontSize={2} fontWeight="bold" color="white">Discord</Text>
      </MenuButton>
    </Container >
  )
}


function Screen() {
  return (
    <object3D position={[0, 0, 0.05]} renderOrder={2}
    >
      <Root
        width={68}
        height={152}
      >
        <Container
          flexGrow={1}
          borderRadius={2}
          flexDirection={"column"}
          overflow={"hidden"}
          width={"100%"}
          height={"100%"}
          backgroundColor={"black"}
        >
          <TopPanel />
          <Content />
          <BottomPanel />
        </Container>

      </Root>
    </object3D>
  )
}

export default Screen
