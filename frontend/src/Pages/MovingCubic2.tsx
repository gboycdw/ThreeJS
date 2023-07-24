import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import ControllBox from "../Components/ControllBox";

function RotatingCube() {
  const cubeRef = useRef<any>(null);

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box
      ref={cubeRef}
      args={[1, 1, 1]}
      position={[0, 0, 0]}
      material-color="skyblue"
    />
  );
}

function MovingCubic2() {
  const [browserWidth, setBrowserWidth] = useState(1024);
  const [browserHeight, setBrowserHeight] = useState(768);
  const [cameraDepth, setCameraDepth] = useState(5);

  return (
    <>
      <div style={{ width: "1024px", height: "768px" }}>
        <ControllBox
          setBrouserWidth={setBrowserWidth}
          setBrouserHeight={setBrowserHeight}
          setCameraDepth={setCameraDepth}
        />
        <div> ㄱㅁㅇ</div>
        <Canvas
          style={{ width: browserWidth, height: browserHeight }}
          camera={{ position: [0, 0, cameraDepth], fov: 75 }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
        </Canvas>
      </div>
    </>
  );
}

export default MovingCubic2;
