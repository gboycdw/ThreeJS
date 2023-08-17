import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import ControllBox from "../ControllBox";
import { useLoaderData } from "react-router-dom";
import { loader } from "../loader/loader";

function MovingCubic() {
  console.log("MovingCubic 컴포넌트 동작");

  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  //   const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [browserWidth, setBrouserWidth] = useState(1024);
  const [browserHeight, setBrouserHeight] = useState(768);
  const [cameraDepth, setCameraDepth] = useState(5);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1024 / 768, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current ?? undefined,
    });
    renderer.setSize(browserWidth, browserHeight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = cameraDepth;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [browserHeight, browserWidth, cameraDepth]);
  console.log("MovingCubic 컴포넌트 함수 실행완료");
  return (
    <>
      <div
        style={{ border: "1px solid", padding: "6px", width: "fit-content" }}
      >
        query로 받은 초기값 : {initialData.map((a: any) => a.categoryName)}
      </div>
      <div style={{ width: "1024px", height: "768px" }}>
        <ControllBox
          setBrouserWidth={setBrouserWidth}
          setBrouserHeight={setBrouserHeight}
          setCameraDepth={setCameraDepth}
        />
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}
export default MovingCubic;
