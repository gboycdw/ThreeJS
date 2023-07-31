import { Box, Torus, Sphere, Stage } from "@react-three/drei";
import Custom3D from "./Custom3D";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function SelectShapes(props: { option: boolean; shapes: string }) {
  const { option, shapes } = props;
  const shapesRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (shapesRef.current && option) {
      shapesRef.current.rotation.x += 0.01;
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
          <meshStandardMaterial attach="material" color="skyblue" />
        </Sphere>
      )}
      {shapes === "custom" && <Custom3D ref={shapesRef} />}
    </>
  );
}

export default SelectShapes;
