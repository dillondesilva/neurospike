import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import model from '../assets/scene.gltf';

const INITIAL_LIF_VISUALISATION_DATA = {
  membrane_voltage: [-70],
  intracellular_color_v: [[132, 215, 206]],
  extracellular_color_v: [[238, 128, 238]],
  timepoints: [0],
};

function TestMesh(data) {
  const testRef = useRef();
  const ecRef = useRef();
  const ecText = useRef();
  const icText = useRef();
  const { timepoints } = data.data;
  // Figuring out initial intracellular color

  const initialICColor = data.data.intracellular_color_v[0];
  const initialECColor = data.data.extracellular_color_v[0];
  const initialICText = `Intracellular Potential: ${data.data.membrane_voltage[0].toString()}`;

  const [currentTimepoint, setNewTimepoint] = useState(0);
  const [currentICColor, setICColor] = useState(initialICColor);
  const [currentECColor, setECColor] = useState(initialECColor);
  const [currentICText, setICText] = useState(initialICText);

  const updateTimepoint = () => {
    if (currentTimepoint === timepoints.length - 1) {
      setNewTimepoint(0);
    } else {
      setNewTimepoint(currentTimepoint + 1);
    }
    const newICColor = data.data.intracellular_color_v[currentTimepoint];
    const newECColor = data.data.extracellular_color_v[currentTimepoint];
    const newICValue = data.data.membrane_voltage[currentTimepoint];

    setICColor(newICColor);
    setECColor(newECColor);
    setICText(`Intracellular Potential: ${newICValue.toString()}`);
  };

  let tick = 0;
  useFrame(({ clock }) => {
    if (tick === 20) {
      updateTimepoint();
    } else {
      tick += 1;
    }

    if (testRef.current) {
      testRef.current.rotation.z = clock.getElapsedTime() / 2;
      testRef.current.rotation.x = clock.getElapsedTime() / 2;
      testRef.current.material.color.r = currentICColor[0] / 255;
      testRef.current.material.color.g = currentICColor[1] / 255;
      testRef.current.material.color.b = currentICColor[2] / 255;
    }

    if (ecRef.current) {
      ecRef.current.material.color.r = currentECColor[0] / 255;
      ecRef.current.material.color.g = currentECColor[1] / 255;
      ecRef.current.material.color.b = currentECColor[2] / 255;
    }
  });

  return (
    // <mesh ref={testRef}>
    //   <primitive
    //     object={geom.scene}
    //     scale={[7, 7, 7]}
    //     rotation={[0, 0, 0]}
    //     position={[0, -2, 0]}
    //   />
    // </mesh>
    <mesh>
      <Text
        ref={icText}
        scale={[0.15, 0.15, 0.15]}
        position={[0, 0, 2]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        {currentICText}
      </Text>
      <Text
        ref={ecText}
        scale={[0.15, 0.15, 0.15]}
        position={[-2.75, 1, 2]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        Extracellular potential: 0 mV
      </Text>
      <mesh visible position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.3, 20, 100]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={testRef} visible position={[0, 0, 0]}>
        <torusGeometry args={[0.03, 1.7, 20, 100]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={ecRef} visible position={[0, 0, -5]}>
        <boxGeometry args={[25, 15, 3]} />
        <meshStandardMaterial />
      </mesh>
    </mesh>
  );
}

export default function LIFSimulation() {
  const [simulationDataStr, setSimulationDataStr] = useState('');
  const [visualization, setData] = useState(INITIAL_LIF_VISUALISATION_DATA);

  const updateVisualisation = () => {
    const parsedData = JSON.parse(simulationDataStr);
    setData(parsedData);
  };

  window.electron.ipcRenderer.on('run-code', async (arg: string) => {
    if (arg.includes('{')) {
      const dataStartingIndex = arg.indexOf('{');
      await setSimulationDataStr(arg.substring(dataStartingIndex, arg.length));
      updateVisualisation();
    }
  });

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <TestMesh data={visualization} />
    </Canvas>
  );
}
