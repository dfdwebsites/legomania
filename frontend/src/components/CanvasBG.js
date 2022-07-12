import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import styled from 'styled-components';
import * as THREE from 'three';
// import { PointLight } from 'three';

import Model from './Model';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const ViewerContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: -1;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const cameraOpts = {
  fov: 45,
  near: 0.0001,
  far: 100000,
  position: [200, 200, 0]
};

const onCanvasCreated = ({ gl }) => {
  /* eslint no-param-reassign: "error" */
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = THREE.PCFShadowMap;
  // gl.gammaOutput = true;
  // gl.gammaFactor = 2.2;
  gl.toneMappingExposure = 1.0;
  /* eslint-env browser */
  gl.setPixelRatio(window.devicePixelRatio);
};

const CanvasBG = () => {
  return (
    <ViewerContainer>
      <CanvasContainer>
        <Canvas
          camera={cameraOpts}
          //   pixelRatio={window.devicePixelRatio}
          onCreated={onCanvasCreated}
        >
          <pointLight
            visible
            intensity={1}
            debug
            color="white"
            position={[0, 200, 0]}
            rotation={[Math.PI / -2.5, 0, 0]}
          />
          <PerspectiveCamera
            makeDefault
            // renderOrder={'YXZ'}
            far={300}
            near={0.1}
            fov={45}
            zoom={8}
            position={[0, 0, 20]}
            // rotation={[0, 0, 0]}
          >
            <ambientLight color={'white'} intensity={0.5} />
            <directionalLight
              castShadow
              position={[10, 20, 15]}
              shadow-camera-right={8}
              shadow-camera-top={8}
              shadow-camera-left={-8}
              shadow-camera-bottom={-8}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              intensity={0.5}
              shadow-bias={-0.0001}
            />
          </PerspectiveCamera>
          <OrbitControls></OrbitControls>
          <Model />
        </Canvas>
      </CanvasContainer>
    </ViewerContainer>
  );
};

export default CanvasBG;
