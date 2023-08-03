import { Box, Torus, Sphere, Stage } from "@react-three/drei";
import Custom3D from "./Custom3D";
import { useRef } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface movingProps {
  turnLeft: boolean;
  turnRight: boolean;
  goStraight: boolean;
  goBack: boolean;
  goRight: boolean;
  goLeft: boolean;
}

function SelectShapes(props: {
  option: boolean;
  shapes: string;
  move: movingProps;
  center: boolean;
  setCenter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { option, shapes, move, center, setCenter } = props;
  const shapesRef = useRef<THREE.Mesh>(null);
  const texturePath = "/texture/earth.jpg";
  const myTexture = useLoader(TextureLoader, texturePath);

  useFrame(() => {
    if (shapesRef.current && option) {
      if (shapes !== "Sphere") {
        shapesRef.current.rotation.x += 0.01;
      }
      shapesRef.current.rotation.y += 0.01;
    }
    // console.log(shapesRef);
  });

  return (
    <>
      {shapes === "Cubic" && (
        <Box ref={shapesRef} args={[1, 1, 1]} position={[0, 1, 0]}>
          <meshStandardMaterial attach="material" color="skyblue" />
        </Box>
      )}
      {shapes === "Torus" && (
        <Torus ref={shapesRef} args={[1, 0.5, 50, 50]} position={[0, 1.5, 0]}>
          <meshStandardMaterial attach="material" color="skyblue" />
        </Torus>
      )}
      {shapes === "Sphere" && (
        <Sphere ref={shapesRef} args={[1, 32, 32]} position={[0, 1.5, 0]}>
          <meshStandardMaterial
            map={myTexture}
            attach="material"
            color="skyblue"
          />
        </Sphere>
      )}
      {shapes === "custom" && (
        <Custom3D move={move} center={center} setCenter={setCenter} />
      )}
    </>
  );
}

export default SelectShapes;
