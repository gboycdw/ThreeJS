import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import ControllBox from "../Components/ControllBox";
import { OrbitControls } from "@react-three/drei";

interface RotatingProps {
  cameraDepth: number;
  setMouseDownClientX: React.Dispatch<React.SetStateAction<number>>;
  setMouseDownClientY: React.Dispatch<React.SetStateAction<number>>;
  setMouseUpClientX: React.Dispatch<React.SetStateAction<number>>;
  setMouseUpClientY: React.Dispatch<React.SetStateAction<number>>;
}

function RotatingCube(props: RotatingProps) {
  const {
    setMouseDownClientX,
    setMouseDownClientY,
    setMouseUpClientX,
    setMouseUpClientY,
    cameraDepth,
  } = props;
  const cubeRef = useRef<any>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };
  // // 마우스 휠 컨트롤 관련
  // useEffect(() => {
  //   if (cubeRef.current) {
  //     cubeRef.current.rotation.x += "마우스ㄱㄱㄱㄱ";
  //     cubeRef.current.rotation.y += "마우슥ㄱㄱㄱ";
  //   }
  // }, []);
  // 자동회전 관련
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
  return (
    <>
      <div style={{ width: "1024px", height: "768px" }}>
        <ControllBox
          setBrouserWidth={setBrowserWidth}
          setBrouserHeight={setBrowserHeight}
          setCameraDepth={setCameraDepth}
        />
        <div>
          {[mouseDownClientX, mouseDownClientY, mouseUpClientX, mouseUpClientY]}
        </div>
        <Canvas style={{ width: browserWidth, height: browserHeight }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube
            cameraDepth={cameraDepth}
            setMouseDownClientX={setMouseDownClientX}
            setMouseDownClientY={setMouseDownClientY}
            setMouseUpClientX={setMouseUpClientX}
            setMouseUpClientY={setMouseUpClientY}
          />
        </Canvas>
      </div>
    </>
  );
}

export default MovingCubic2;
