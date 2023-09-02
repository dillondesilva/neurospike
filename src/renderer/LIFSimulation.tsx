import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function TestMesh() {
  const testRef = useRef();

  useFrame(({ clock }) => {
    if (testRef.current) {
      testRef.current.rotation.x = clock.getElapsedTime();
      testRef.current.rotation.y = clock.getElapsedTime() / 4;
    }
  });

  return (
    <mesh ref={testRef}>
      <boxGeometry />
      <meshBasicMaterial color="royalblue" />
    </mesh>
  );
}

export default function LIFSimulation() {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <TestMesh />
    </Canvas>
  );
}
