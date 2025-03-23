import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { IconButton } from '@mui/material';

import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const INITIAL_LIF_VISUALISATION_DATA = {
  data: {
    membrane_voltage: [-70],
    timepoints: [0],
    injected_current: [0],
  },
  visualization: {
    intracellular_color_v: [[255, 255, 255]],
    extracellular_color_v: [[255, 255, 255]],
    membrane_color_v: [[214, 96, 77]],
  },
};

function TestMesh(props, data, active) {
  const testRef = useRef();
  const ecRef = useRef();
  const ecText = useRef();
  const stimRef = useRef();
  const membraneMeshRef = useRef();

  const timepoints = props.data.data.timepoints;
  const membraneVoltageData = props.data.data.membrane_voltage;
  const initialICColor = props.data.visualization.intracellular_color_v[0];
  const initialECColor = props.data.visualization.extracellular_color_v[0];
  const initialMembraneColor = props.data.visualization.membrane_color_v[0];

  const initialMembraneV = props.data.data.membrane_voltage[0];
  const initialMembraneVText = `Transmembrane Potential: ${initialMembraneV} mV`;

  // const [currentTimepoint, setNwTimepoint] = useState(timepoints[0]);
  const [currentICColor, setICColor] = useState(initialICColor);
  const [currentECColor, setECColor] = useState(initialECColor);
  const [currentMembraneV, setMembraneV] = useState(initialMembraneV);
  const [currentMembraneVText, setMembraneVText] =
    useState(initialMembraneVText);
  const [currentMembraneColor, setMembraneColor] =
    useState(initialMembraneColor);
  const [timeText, setTimeText] = useState('Time: 0 ms');
  const [isCurrentOn, setCurrentState] = useState(false);

  useEffect(() => {
    props.setNewTimepoint(timepoints[0]);
  }, [timepoints])

  const updateTimepoint = async () => {
    if (props.currentTimepoint === timepoints.length - 1) {
      props.setNewTimepoint(0);
    } else {
      props.setNewTimepoint(props.currentTimepoint + 1);
    }

    const newICColor = props.data.visualization.intracellular_color_v[props.currentTimepoint];
    const newECColor = props.data.visualization.extracellular_color_v[props.currentTimepoint];
    const newMembraneColor = props.data.visualization.membrane_color_v[props.currentTimepoint];

    await setICColor(newICColor);
    await setECColor(newECColor);
    await setMembraneColor(newMembraneColor);
    await setMembraneV((Math.round(membraneVoltageData[props.currentTimepoint] * 100) / 100).toFixed(2));
    await setMembraneVText(`Transmembrane Potential: ${currentMembraneV} mV`);
    let formattedTime = (Math.round(timepoints[props.currentTimepoint] * 100) / 100).toFixed(2);
    setTimeText(`Time: ${formattedTime} ms`);

  };

  let tick = 0;
  useFrame(({ clock }) => {
    if (props.active) {
      if (tick === 3) {
        updateTimepoint();
      } else {
        tick += 1;
      }

      if (testRef.current) {
        testRef.current.material.color.r = currentICColor[0] / 255;
        testRef.current.material.color.g = currentICColor[1] / 255;
        testRef.current.material.color.b = currentICColor[2] / 255;
      }

      if (ecRef.current) {
        ecRef.current.material.color.r = currentECColor[0] / 255;
        ecRef.current.material.color.g = currentECColor[1] / 255;
        ecRef.current.material.color.b = currentECColor[2] / 255;
      }

      if (membraneMeshRef.current) {
        membraneMeshRef.current.material.color.r =
          currentMembraneColor[0] / 255;
        membraneMeshRef.current.material.color.g =
          currentMembraneColor[1] / 255;
        membraneMeshRef.current.material.color.b =
          currentMembraneColor[2] / 255;
      }

      if (stimRef.current) {
        stimRef.current.visible = isCurrentOn;
      }
      
      // props.setFocus(false);
    } else if (props.isFocusOn) {
      updateTimepoint();
      if (testRef.current) {
        testRef.current.material.color.r = currentICColor[0] / 255;
        testRef.current.material.color.g = currentICColor[1] / 255;
        testRef.current.material.color.b = currentICColor[2] / 255;
      }

      if (ecRef.current) {
        ecRef.current.material.color.r = currentECColor[0] / 255;
        ecRef.current.material.color.g = currentECColor[1] / 255;
        ecRef.current.material.color.b = currentECColor[2] / 255;
      }

      if (membraneMeshRef.current) {
        membraneMeshRef.current.material.color.r =
          currentMembraneColor[0] / 255;
        membraneMeshRef.current.material.color.g =
          currentMembraneColor[1] / 255;
        membraneMeshRef.current.material.color.b =
          currentMembraneColor[2] / 255;
      }

      props.setFocus(false)
    }
  });

  return (
    <mesh>
      <Text
        ref={ecText}
        scale={[0.175, 0.175, 0.175]}
        position={[-2.25, 1.5, 2]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
        fontWeight={"bold"}
      >
        {currentMembraneVText}
        {'\n\n'}
        {timeText}
      </Text>
      <mesh ref={testRef} visible position={[0, 0, 0]}>
        <torusGeometry args={[0.03, 1.7, 20, 100]} />
        <meshStandardMaterial opacity={0.75} transparent />
      </mesh>
      <mesh ref={membraneMeshRef} position={[0, 0, 2]}>
        <torusGeometry args={[1.2, 0.1, 20, 100]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={ecRef} visible position={[0, 0, -5]}>
        <boxGeometry args={[25, 15, 3]} />
        <meshStandardMaterial />
      </mesh>
    </mesh>
  );
}

export default function LIFSimulation(props) {
  // const [isActive, setActiveState] = useState(true);
  const [visualization, setData] = useState(INITIAL_LIF_VISUALISATION_DATA);

  let playButton;
  if (props.isActive) {
    playButton = <PauseCircleIcon />;
  } else {
    playButton = <PlayCircleIcon />;
  }

  const updateVisualisation = () => {
    try {
      const parsedData = JSON.parse(props.simulationDataStr[0]);
      setData(parsedData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    updateVisualisation();
  }, [props.simulationDataStr]);

  return (
    <div className="w-[45vw] h-[45vh] overflow-hidden \
    grid place-items-center rounded-[20px] relative">
      <div className="w-[45vw] h-[47vh] grid place-items-center">
        <Canvas>
          <ambientLight intensity={1.5} />
          <TestMesh 
            data={visualization} 
            active={props.isActive}
            isFocusOn={props.isFocusOn}
            setFocus={props.setFocus}
            currentTimepoint={props.currentTimepoint}
            setNewTimepoint={props.setNewTimepoint}
          />
        </Canvas>
      </div>
      <div className="z-[10] absolute bottom-[2%]">
      <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            props.setActiveState(!props.isActive);
          }}
        >
          {playButton}
        </IconButton>
      </div>
    </div>
  );
}
