import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import SelectShapes from "./SelectShapes";
import Checkbox from "../CheckBox";
import { OrbitControls } from "@react-three/drei";
import Light from "../Light/Light";
import styled from "styled-components";

function MovingCubic2(props: any) {
  const { controls, setControls } = props;
  const [browserWidth, setBrowserWidth] = useState(1024);
  const [browserHeight, setBrowserHeight] = useState(768);
  const [autoRotation, setAutoRotation] = useState(true);
  const [customRotation, setCustomRotation] = useState(true);
  const [shapes, setShapes] = useState("custom");

  const orbitRef = useRef<any>(null);
  const orbitHandler = () => {
    const orbit = orbitRef.current;
    if (orbit) {
      console.log(orbit.object);
      // orbit.object.rotation._z += 1;
      // orbit.object.rotation._y += 1;
      // orbit.object.rotation._x += 10;
      // orbit.object.position.x += 1;
      // orbit.object.position.y += 1;
      // orbit.object.position.z += 1;
    }
  };
  // useFrame(() => {
  //   if (orbitRef.current) {
  //     orbitRef.current.object.position.z = +1;
  //   }
  // });

  // 커스텀 조명 추가
  // const newlight = useControls("additional light-1", {
  //   visible: { value: false },
  //   color: { value: "#ffffff" },
  //   intensity: { value: 3, min: 0, max: 14 },
  //   positionX: { value: 0, min: -10, max: 10 },
  //   positionY: { value: 10, min: -10, max: 10 },
  //   positionZ: { value: 0, min: -10, max: 10 },
  // });

  const [move, setMove] = useState({
    turnLeft: false,
    turnRight: false,
    goStraight: false,
    goBack: false,
    goRight: false,
    goLeft: false,
  });
  const [center, setCenter] = useState(false);

  return (
    <>
      <div style={{ width: "1024px", height: "768px" }}>
        <div style={{ border: "1px solid black", padding: "5px" }}>
          <div>
            <button onClick={orbitHandler}>orbit변수</button>
            <div>회전</div>
            <div>
              {shapes !== "custom" && (
                <Checkbox checked={autoRotation} onChange={setAutoRotation}>
                  자동회전
                </Checkbox>
              )}
              <Checkbox checked={customRotation} onChange={setCustomRotation}>
                축 회전
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
                setAutoRotation(false);
              }}
            >
              커스텀
            </button>
          </div>
        </div>
        <div>{shapes}</div>
        <div style={{ border: "1px solid black" }}>
          <Canvas style={{ width: browserWidth, height: browserHeight }}>
            {customRotation && <OrbitControls ref={orbitRef} />}
            {/* <OrbitControls ref={orbitRef} /> */}
            <SelectShapes
              option={autoRotation}
              shapes={shapes}
              move={move}
              center={center}
              setCenter={setCenter}
            />
            <gridHelper />
            <Light />
            <axesHelper args={[25]} />
          </Canvas>
        </div>
        {shapes === "custom" && (
          <div style={{ display: "flex", height: "64px", border: "1px solid" }}>
            {/* 이동 조정 */}
            <div>Moving</div>
            <ControllButton
              style={{
                color: move.goStraight ? "gray" : "black",
              }}
              onClick={() => {
                setMove({
                  ...move,
                  goStraight: !move.goStraight,
                  goBack: move.goBack === true ? false : move.goBack,
                });
              }}
            >
              ▲
            </ControllButton>
            <ControllButton
              style={{
                color: move.goBack ? "gray" : "black",
              }}
              onClick={() => {
                setMove({
                  ...move,
                  goBack: !move.goBack,
                  goStraight:
                    move.goStraight === true ? false : move.goStraight,
                });
              }}
            >
              ▼
            </ControllButton>
            <ControllButton
              style={{
                color: move.goLeft ? "gray" : "black",
              }}
              onClick={() => {
                setMove({
                  ...move,
                  goLeft: !move.goLeft,
                  goRight: move.goRight === true ? false : move.goRight,
                });
              }}
            >
              ◀
            </ControllButton>
            <ControllButton
              style={{
                color: move.goRight ? "gray" : "black",
              }}
              onClick={() => {
                setMove({
                  ...move,
                  goRight: !move.goRight,
                  goLeft: move.goLeft === true ? false : move.goLeft,
                });
              }}
            >
              ▶
            </ControllButton>

            {/* 회전 조정 */}
            <div>Rotation</div>
            <ControllButton
              style={{
                color: move.turnLeft ? "gray" : "black",
              }}
              onClick={() => {
                setMove({
                  ...move,
                  turnLeft: !move.turnLeft,
                  turnRight: move.turnRight === true ? false : move.turnRight,
                });
              }}
            >
              ☞
            </ControllButton>
            <ControllButton
              style={{
                color: move.turnRight ? "gray" : "black",
              }}
              onClick={() => {
                setMove({
                  ...move,
                  turnRight: !move.turnRight,
                  turnLeft: move.turnLeft === true ? false : move.turnLeft,
                });
              }}
            >
              ☜
            </ControllButton>
            {/* 중앙으로 이동 */}
            <div>Reset(제자리로)</div>
            <ControllButton
              style={{
                color: move.turnLeft ? "gray" : "black",
              }}
              onClick={() => {
                setCenter(true);
              }}
            >
              ◎
            </ControllButton>
          </div>
        )}
        <div>조명 추가/삭제</div>
        <div style={{ display: "flex", padding: "1px" }}>
          <div>🌟AL</div>
          <div>🌞DL</div>
          <div>💡PL</div>
          <div>🔦SL</div>
        </div>
        <div>
          <div>현재 적용 중인 조명</div>
        </div>
      </div>
    </>
  );
}

export default MovingCubic2;

const ControllButton = styled.button`
  width: 35px;
  height: 35px;
  padding: 7px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
