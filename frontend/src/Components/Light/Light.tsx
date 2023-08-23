import React from 'react';
import { useControls } from 'leva';

function LightController() {
  const ambientControls = useControls('Ambient Light', {
    visible: { value: false },
    color: { value: '#ffffff' },
    intensity: { value: 3, min: 0, max: 14 },
  });
  const directionalControls = useControls('Directional Light', {
    visible: { value: false },
    color: { value: '#ffffff' },
    intensity: { value: 3, min: 0, max: 14 },
    positionX: { value: 0, min: -10, max: 10 },
    positionY: { value: 10, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
  });
  const pointControls = useControls('Point Light', {
    visible: { value: false },
    color: { value: '#ffffff' },
    intensity: { value: 3, min: 0, max: 14 },
    positionX: { value: 0, min: -10, max: 10 },
    positionY: { value: 10, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
  });
  const spotControls = useControls('Spot Light', {
    visible: { value: false },
    color: { value: '#ffffff' },
    intensity: { value: 3, min: 0, max: 14 },
    positionX: { value: 0, min: -10, max: 10 },
    positionY: { value: 10, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
  });

  return (
    <>
      <ambientLight
        visible={ambientControls.visible}
        color={ambientControls.color}
        intensity={ambientControls.intensity}
      />
      <directionalLight
        visible={directionalControls.visible}
        position={[directionalControls.positionX, directionalControls.positionY, directionalControls.positionZ]}
        color={directionalControls.color}
        intensity={directionalControls.intensity}
        // shadow-mapSize-width={1024}
        // shadow-mapSize-height={1024}
        // shadow-camera-far={50}
        // shadow-camera-left={-100}
        // shadow-camera-right={100}
        // shadow-camera-top={100}
        // shadow-camera-bottom={-100}
      />
      <pointLight
        visible={pointControls.visible}
        position={[pointControls.positionX, pointControls.positionY, pointControls.positionZ]}
        color={pointControls.color}
        intensity={pointControls.intensity}
      />
      <spotLight
        visible={spotControls.visible}
        position={[spotControls.positionX, spotControls.positionY, spotControls.positionZ]}
        color={spotControls.color}
        intensity={spotControls.intensity}
      />
    </>
  );
}

export default LightController;
