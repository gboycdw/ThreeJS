import React, { RefObject, useRef, useState } from "react";
import { Canvas, Vector2 } from "@react-three/fiber";
import SelectShapes from "./SelectShapes";
import Checkbox from "../Components/CheckBox";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Light from "../Components/Light/Light";

function MovingCubic2() {
  const [browserWidth, setBrowserWidth] = useState(1024);
  const [browserHeight, setBrowserHeight] = useState(768);
  const [autoRotation, setAutoRotation] = useState(true);
  const [customRotation, setCustomRotation] = useState(true);
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
            <button
              style={{
                border: "1px solid black",
                padding: "2px",
                width: "75px",
              }}
              onClick={() => {
                setShapes("custom");
              }}
            >
              커스텀
            </button>
          </div>
        </div>
        <div>{shapes}</div>
        <Canvas style={{ width: browserWidth, height: browserHeight }}>
          {customRotation && <OrbitControls />}
          <SelectShapes option={autoRotation} shapes={shapes} />
          <gridHelper />
          <Light />
          <axesHelper args={[25]} />
        </Canvas>
      </div>
    </>
  );
}

export default MovingCubic2;
