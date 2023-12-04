import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Button,
  Container,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const INITIAL_LIF_VISUALISATION_DATA = {
  membrane_voltage: [-70],
  intracellular_color_v: [[132, 215, 206]],
  extracellular_color_v: [[238, 128, 238]],
  timepoints: [0],
  stim_pulse_train: [1],
};

function TestMesh(data, active) {
  const testRef = useRef();
  const ecRef = useRef();
  const ecText = useRef();
  const icText = useRef();
  const stimRef = useRef();
  const { timepoints } = data.data;
  const membraneVoltageData = data.data.membrane_voltage;

  const initialICColor = data.data.intracellular_color_v[0];
  const initialECColor = data.data.extracellular_color_v[0];
  const initialMembraneV = data.data.membrane_voltage[0];
  const initialMembraneVText = `Transmembrane Potential: ${initialMembraneV} mV`;

  const [currentTimepoint, setNewTimepoint] = useState(timepoints[0]);
  const [currentICColor, setICColor] = useState(initialICColor);
  const [currentECColor, setECColor] = useState(initialECColor);
  const [currentMembraneV, setMembraneV] = useState(initialMembraneV);
  const [currentMembraneVText, setMembraneVText] = useState(initialMembraneVText);
  const [timeText, setTimeText] = useState('Time: 0 ms');
  const [isCurrentOn, setCurrentState] = useState(false);

  window.electron.ipcRenderer.on('run-code', async (arg: string) => {
    if (arg.includes('{')) {
      setNewTimepoint(timepoints[0]);
    }
  });

  const updateTimepoint = () => {
    if (currentTimepoint === timepoints.length - 1) {
      setNewTimepoint(0);
    } else {
      setNewTimepoint(currentTimepoint + 1);
    }
    const newICColor = data.data.intracellular_color_v[currentTimepoint];
    const newECColor = data.data.extracellular_color_v[currentTimepoint];


    setICColor(newICColor);
    setECColor(newECColor);
    setMembraneV(Math.round(membraneVoltageData[currentTimepoint] * 100) / 100);
    setMembraneVText(`Transmembrane Potential: ${currentMembraneV} mV`);
    setTimeText(`Time: ${currentTimepoint} ms`);

    if (data.data.stim_pulse_train[currentTimepoint] === 1) {
      setCurrentState(true);
    } else {
      setCurrentState(false);
    }
  };

  let tick = 0;
  useFrame(({ clock }) => {
    if (data.active) {
      if (tick === 6) {
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

      if (stimRef.current) {
        stimRef.current.visible = isCurrentOn;
      }
    }
  });

  const geom = useLoader(GLTFLoader, './electrode.glb');

  return (
    <mesh>
      <Text
        ref={ecText}
        scale={[0.175, 0.175, 0.175]}
        position={[-2.5, 1.25, 2]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        {timeText}
        {'\n\n'}
        {currentMembraneVText}
      </Text>
      {/* <Text
        scale={[0.175, 0.175, 0.175]}
        position={[-2.75, 1.5, 2]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        {timeText}
      </Text> */}
      <mesh ref={testRef} visible position={[0, 0, 0]}>
        <torusGeometry args={[0.03, 1.7, 20, 100]} />
        <meshStandardMaterial opacity={0.75} transparent />
      </mesh>
      <mesh ref={ecRef} visible position={[0, 0, -5]}>
        <boxGeometry args={[25, 15, 3]} />
        <meshStandardMaterial />
      </mesh>
      <mesh>
        <primitive
          object={geom.scene}
          scale={[0.08, 0.08, 0.08]}
          rotation={[-Math.PI / 2, Math.PI, Math.PI / 2]}
          position={[1.5, 0, 0]}
        />
      </mesh>
    </mesh>
  );
}

export default function LIFSimulation() {
  const [simulationDataStr, setSimulationDataStr] = useState('');
  const [isUpdated, setUpdatedStatus] = useState(false);
  const [isActive, setActiveState] = useState(true);
  const [visualization, setData] = useState(INITIAL_LIF_VISUALISATION_DATA);

  let playButton;
  if (isActive) {
    playButton = <PauseCircleIcon />;
  } else {
    playButton = <PlayCircleIcon />;
  }

  const updateVisualisation = () => {
    const parsedData = JSON.parse(simulationDataStr);
    setData(parsedData);
  };

  window.electron.ipcRenderer.on('run-code', async (arg: string) => {
    if (arg.includes('{')) {
      setUpdatedStatus(true);
      const dataStartingIndex = arg.indexOf('{');
      await setSimulationDataStr(arg.substring(dataStartingIndex, arg.length));
      updateVisualisation();
    }
  });

  useEffect(() => {
    if (isUpdated) {
      updateVisualisation();
    }
    // updatePlotData();
  }, [simulationDataStr, isUpdated]);

  return (
    <Container
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
        padding: '0!important',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          padding: '0!important',
        }}
      >
        <Canvas>
          <ambientLight intensity={1.5} />
          <TestMesh data={visualization} active={isActive} />
        </Canvas>
      </Container>
      <Container
        sx={{
          position: 'absolute',
          zIndex: 10,
          padding: 0,
          bottom: 10,
          width: '70%',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          
          onClick={() => {
            setActiveState(!isActive);
          }}
        >
          {playButton}
        </IconButton>
        {/* <Slider defaultValue={30} />
        <FormControl size="small">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Speed"
          >
            <MenuItem value={10}>1x</MenuItem>
            <MenuItem value={20}>2x</MenuItem>
            <MenuItem value={30}>0.5x</MenuItem>
          </Select>
        </FormControl> */}
      </Container>
    </Container>
  );
}
