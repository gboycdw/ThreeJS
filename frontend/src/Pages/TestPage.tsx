import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";

function TestPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [browserWidth, setBrouserWidth] = useState(1024);
  const [browserHeight, setBrouserHeight] = useState(768);
  const [cameraDepth, setCameraDepth] = useState(5);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
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

  return (
    <>
      <div>
        <div>Controller</div>
        <div>
          <a>화면 사이즈 조정</a>
          <input
            className="w-50px h-10px"
            defaultValue={1024}
            onChange={(e) => {
              setBrouserWidth(parseInt(e.target.value));
            }}
          />
          <input
            className="w-50px h-10px"
            defaultValue={768}
            onChange={(e) => {
              setBrouserHeight(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <a>카메라 원근 조정</a>
          <input
            className="w-50px h-10px"
            defaultValue={5}
            onChange={(e) => {
              setCameraDepth(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
      <div ref={mountRef}>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}
export default TestPage;
