import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import SelectShapes from "./SelectShapes";
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
}

function MovingCubic2() {
  const [browserWidth, setBrowserWidth] = useState(1024);
  const [browserHeight, setBrowserHeight] = useState(768);
  const [autoRotation, setAutoRotation] = useState(false);
  const [customRotation, setCustomRotation] = useState(false);
  const [shapes, setShapes] = useState("Cubic");

  return (
    <>
      <div style={{ width: "1024px", height: "768px" }}>
        <div style={{ border: "1px solid black", padding: "5px" }}>
          <div>
            <div>회전</div>
            <div>
              <Checkbox checked={autoRotation} onChange={setAutoRotation}>
                자동회전
              </Checkbox>
              <Checkbox checked={customRotation} onChange={setCustomRotation}>
                수동회전
              </Checkbox>
            </div>
          </div>
          <div>
            <div>도형 선택</div>
            <button
              style={{
                border: "1px solid black",
                padding: "2px",
                width: "75px",
              }}
              onClick={() => {
                setShapes("Cubic");
              }}
            >
              정육면체
            </button>
            <button
              style={{
                border: "1px solid black",
                padding: "2px",
                width: "75px",
              }}
              onClick={() => {
                setShapes("Torus");
              }}
            >
              도넛
            </button>
            <button
              style={{
                border: "1px solid black",
                padding: "2px",
                width: "75px",
              }}
              onClick={() => {
                setShapes("Sphere");
              }}
            >
              구
            </button>
          </div>
        </div>
        <div>{shapes}</div>
        <Canvas style={{ width: browserWidth, height: browserHeight }}>
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
          {customRotation && <OrbitControls />}
          <SelectShapes option={autoRotation} shapes={shapes} />
        </Canvas>
      </div>
    </>
  );
}

export default MovingCubic2;
