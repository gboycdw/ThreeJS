import { useEffect, useState, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface movingProps {
  turnLeft: boolean;
  turnRight: boolean;
  goStraight: boolean;
  goBack: boolean;
  goRight: boolean;
  goLeft: boolean;
}

export default function Custom3D(props: {
  move: movingProps;
  center: boolean;
  setCenter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { move, center, setCenter } = props;
  const shapesRef = useRef<THREE.Mesh>(null);
  const filePath = "/3dSample/cat.obj";
  const [geometry, setGeometry] = useState<any>(null);
  const myObject = useLoader(OBJLoader, filePath);
  myObject.position.set(0, 0, 0);

  useEffect(() => {
    console.log(myObject);
    // 기존 방법
    // if (myObject) {
    //   myObject.traverse((child) => {
    //     if (child instanceof THREE.Mesh) {
    //       const geo = child.geometry;
    //       setGeometry(geo);
    //     }
    //   });
    // }

    // 다른 방법
    if (myObject.children[0] instanceof THREE.Mesh) {
      const geo2 = myObject.children[0].geometry;
      // geometry를 사용하여 작업 수행
      setGeometry(geo2);
    }
  }, [myObject]);

  const texturePath = "/texture/catt.png";
  const myTexture = useLoader(TextureLoader, texturePath);
  myTexture.repeat.set(2, 1);
  myTexture.wrapS = THREE.RepeatWrapping;
  myTexture.wrapT = THREE.RepeatWrapping;
  const moving = { dx: 0, dy: 0, rotation: 0 };
  useFrame(() => {
    if (shapesRef.current) {
      if (move.goBack) {
        moving.dy = -0.01;
      }
      if (move.goStraight) {
        moving.dy = 0.01;
      }
      if (move.goRight) {
        moving.dx = -0.01;
      }
      if (move.goLeft) {
        moving.dx = 0.01;
      }
      if (move.turnLeft) {
        moving.rotation = 0.01;
      }
      if (move.turnRight) {
        moving.rotation = -0.01;
      }
      shapesRef.current.position.x += moving.dx;
      shapesRef.current.position.z += moving.dy;
      shapesRef.current.rotation.y += moving.rotation;
    }
  });
  useEffect(() => {
    if (center) {
      if (shapesRef.current) {
        shapesRef.current.position.x = 0;
        shapesRef.current.position.y = 0;
        shapesRef.current.position.z = 0;
        shapesRef.current.rotation.x = 0;
        shapesRef.current.rotation.y = 0;
        shapesRef.current.rotation.z = 0;
      }
      setCenter(false);
    }
  }, [center]);
  // useEffect(() => {
  //   if (shapesRef.current) {
  //     if (move.goBack) {
  //       moving.dx = -1;
  //     }
  //     if (move.goStraight) {
  //       moving.dx = 1;
  //     }
  //     if (move.turnLeft) {
  //       moving.dy = 1;
  //     }
  //     if (move.turnRight) {
  //       moving.dy = -1;
  //     }
  //     shapesRef.current.position.x += moving.dx;
  //     shapesRef.current.rotation.y += moving.dy;
  //   }
  // }, [move.goBack, move.goStraight, move.turnLeft, move.turnRight]);

  return (
    <>
      {geometry && (
        <mesh ref={shapesRef} geometry={geometry}>
          <meshStandardMaterial map={myTexture} attach="material" />
        </mesh>
      )}
      {geometry && (
        <mesh ref={shapesRef} geometry={geometry}>
          <meshStandardMaterial map={myTexture} attach="material" />
        </mesh>
      )}
    </>
  );
}
