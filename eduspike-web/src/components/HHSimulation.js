import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { IconButton } from '@mui/material';

import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Channel from './cellVisualisation/Channel';
import Membrane from './cellVisualisation/Membrane';

const INITIAL_LIF_VISUALISATION_DATA = {
  data: {
    membrane_voltage: [-70],
    timepoints: [0],
    injected_current: [0],
  },
  visualization: {
    intracellular_color_v: [[255, 255, 255]],
    extracellular_color_v: [[255, 255, 255]],
    membrane_color_v: [[10, 250, 255]],
  },
};

export function HHSimulation(props) {
  const [isActive, setActiveState] = useState(true);
  const [visualisationData, setData] = useState(INITIAL_LIF_VISUALISATION_DATA);

  let playButton;
  if (isActive) {
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
        <Membrane simulationData={visualisationData} />
        {/* <Channel /> */}
        {/* <Membrane /> */}
    </div>
  );
}
