import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import ControllBox from "../Components/ControllBox";
import Checkbox from "../Components/CheckBox";
import { OrbitControls } from "@react-three/drei";

interface RotatingProps {
  cameraDepth: number;
  mouseDownClientX: number;
  mouseDownClientY: number;
  mouseUpClientX: number;
  mouseUpClientY: number;
  currentClientX: number;
  currentClientY: number;
  autoRotation: boolean;
  customRotation: boolean;
}

function RotatingCube(props: RotatingProps) {
  const {
    mouseDownClientX,
    mouseDownClientY,
    mouseUpClientX,
    mouseUpClientY,
    cameraDepth,
    customRotation,
    autoRotation,
  } = props;
  const cubeRef = useRef<any>(null);

  // // 마우스 휠 컨트롤 관련

  useEffect(() => {
    if (cubeRef.current) {
      if (customRotation) {
        cubeRef.current.rotation.y +=
          (mouseUpClientX - mouseDownClientX) / 1000;
        cubeRef.current.rotation.x +=
          (mouseUpClientY - mouseDownClientY) / 1000;
      }
    }
  }, [mouseDownClientX, mouseDownClientY, mouseUpClientX, mouseUpClientY]);
  // 자동회전 관련
  useFrame(() => {
    if (cubeRef.current) {
      if (autoRotation) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }
    }
  });

  return (
    <Box
      ref={cubeRef}
      args={[1, 1, 1]}
      position={[0, 0, cameraDepth]}
      material-color="skyblue"
    />
  );
}

function MovingCubic2() {
  const [browserWidth, setBrowserWidth] = useState(1024);
  const [browserHeight, setBrowserHeight] = useState(768);
  const [cameraDepth, setCameraDepth] = useState<number>(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);
  const [currentClientX, setCurrentClientX] = useState(0);
  const [currentClientY, setCurrentClientY] = useState(0);
  const [autoRotation, setAutoRotation] = useState(false);
  const [customRotation, setCustomRotation] = useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };

  return (
    <>
      <div style={{ width: "1024px", height: "768px" }}>
        <ControllBox
          setBrouserWidth={setBrowserWidth}
          setBrouserHeight={setBrowserHeight}
          setCameraDepth={setCameraDepth}
        />
        <div>{mouseUpClientX - mouseDownClientX}</div>
        <Checkbox checked={autoRotation} onChange={setAutoRotation}>
          자동회전
        </Checkbox>
        <Checkbox checked={customRotation} onChange={setCustomRotation}>
          수동회전
        </Checkbox>
        <Canvas
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          style={{ width: browserWidth, height: browserHeight }}
        >
          <ambientLight />
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={4}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
          />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube
            cameraDepth={cameraDepth}
            mouseDownClientX={mouseDownClientX}
            mouseDownClientY={mouseDownClientY}
            currentClientX={currentClientX}
            currentClientY={currentClientY}
            mouseUpClientX={mouseUpClientX}
            mouseUpClientY={mouseUpClientY}
            autoRotation={autoRotation}
            customRotation={customRotation}
          />
        </Canvas>
      </div>
    </>
  );
}

export default MovingCubic2;
