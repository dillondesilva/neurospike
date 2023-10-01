import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import model from '../assets/scene.gltf';

function TestMesh({ url }) {
  const testRef = useRef();
  const geom = useLoader(GLTFLoader, './multipolar_neuron.glb');
  console.log(geom);

  useFrame(({ clock }) => {
    if (testRef.current) {
      testRef.current.rotation.y = clock.getElapsedTime() / 2;
      // testRef.current.rotation.y = clock.getElapsedTime() / 4;
    }
  });

  return (
    <mesh ref={testRef}>
      <primitive
        object={geom.scene}
        scale={[7, 7, 7]}
        rotation={[0, 0, 0]}
        position={[0, -2, 0]}
      />
    </mesh>
  );
}

export default function LIFSimulation() {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 0]} />
      {/* <mesh>
        <sphereGeometry args={[0, 0, 0]} />
        <meshStandardMaterial />
      </mesh> */}
      <TestMesh />
    </Canvas>
  );
}
