import React, { useEffect, useState, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Stage, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function Custom3D(props: {
  ref: React.RefObject<
    THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>
  >;
}) {
  const { ref } = props;
  const filePath = "/public/3dSample/cat.obj";
  const [model, setModel] = useState<THREE.Group | null>(null);
  const loadedObject = useLoader(OBJLoader, filePath);

  useEffect(() => {
    loadedObject.position.set(0, 0, 0);
    // loadedObject.children.forEach((child) => {
    //   if (child instanceof THREE.Mesh && child.material.side === 0) {
    //     child.material.shininess = 1024;
    //   }
    // });
    setModel(loadedObject);
  }, [loadedObject]);

  return (
    <>
      {model && (
        <mesh ref={ref}>
          {/* <meshStandardMaterial attach="material" color="skyblue" /> */}
          <primitive object={model} scale={[1, 1, 1]} />
        </mesh>
      )}
    </>
  );
}
