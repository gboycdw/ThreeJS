import React, { RefObject, useRef, useState } from "react";
import { Canvas, Vector2 } from "@react-three/fiber";
import SelectShapes from "./SelectShapes";
import Checkbox from "../Components/CheckBox";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

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
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);

  useControls("Ambient Light", {
    visible: {
      value: false,
      onChange: (v) => {
        if (ambientRef.current) {
          ambientRef.current.visible = v;
        }
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        if (ambientRef.current) {
          ambientRef.current.color = new THREE.Color(v);
        }
      },
    },
  });

  useControls("Directional Light", {
    visible: {
      value: true,
      onChange: (v) => {
        if (directionalRef.current) {
          directionalRef.current.visible = v;
        }
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        if (directionalRef.current) {
          directionalRef.current.color = new THREE.Color(v);
        }
      },
    },
  });

  useControls("Point Light", {
    visible: {
      value: false,
      onChange: (v) => {
        if (pointRef.current) {
          pointRef.current.visible = v;
        }
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        if (pointRef.current) {
          pointRef.current.color = new THREE.Color(v);
        }
      },
    },
  });

  return (
    <>
      <div style={{ width: "1024px", height: "768px" }}>
        <div style={{ border: "1px solid black", padding: "5px" }}>
          <div>
            <button
              onClick={() => {
                console.log(ambientRef);
              }}
            >
              확인 ㄱㄱ
            </button>
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
          <ambientLight ref={ambientRef} />
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
            ref={directionalRef}
          />
          <pointLight ref={pointRef} position={[1, 10, 1]} />
          {customRotation && <OrbitControls />}
          <SelectShapes option={autoRotation} shapes={shapes} />
          <gridHelper />
          <axesHelper args={[25]} />
          {pointRef.current && <pointLightHelper args={[pointRef.current]} />}
        </Canvas>
      </div>
    </>
  );
}

export default MovingCubic2;
