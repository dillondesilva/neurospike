import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Stack,
  Container,
} from '@mui/material';

import { useState, useRef } from 'react';

function getSimulationCode(
  inputCurrent: any,
  pulseDuration: any,
  membraneThreshold: any,
  simulationDuration: any,
  pulseDelay: any
) {
  const codeString = `from neurospikelib.lif import LIFSimulation
# Run sample LIF simulation
neuron_parameters = {
    "length": 100,
    "diam": 20,
    "resting_v": ${membraneThreshold}
}

stimulation_parameters = {
    "duration": ${pulseDuration},
    "amplitude": ${inputCurrent},
    "t_start": ${pulseDelay}               
}

lif_simulation_a = LIFSimulation(stimulation_parameters, neuron_parameters, ${simulationDuration})
simulation_data = lif_simulation_a.simulate()`;

  return codeString;
}

const INITIAL_INPUT_VOLTAGE = 10;
const INITIAL_PULSE_DURATION = 20;
const INITIAL_RESTING_VOLTAGE = -70;
const INITIAL_SIMULATION_DURATION = 100;
const INITIAL_PULSE_DELAY = 0;

export default function LIFControlPanel() {
  const [inputVoltage, setInputVoltage] = useState(INITIAL_INPUT_VOLTAGE);
  const [pulseDuration, setPulseDuration] = useState(INITIAL_PULSE_DURATION);
  const [restingVoltage, setRestingVoltage] = useState(INITIAL_RESTING_VOLTAGE);
  const [simulationDuration, setSimulationDuration] = useState(
    INITIAL_SIMULATION_DURATION
  );
  const [pulseDelay, setPulseDelay] = useState(INITIAL_PULSE_DELAY);

  const inputCurrentSlider = useRef();
  const pulseDurationSlider = useRef();
  const membraneThresholdSlider = useRef();
  const simulationDurationSlider = useRef();
  const pulseDelaySlider = useRef();

  const runSimulation = () => {
    const codeString = getSimulationCode(
      inputVoltage,
      pulseDuration,
      restingVoltage,
      simulationDuration,
      pulseDelay
    );
    
    console.log(codeString);
    window.electron.ipcRenderer.sendMessage('run-code', [codeString]);
  };

  return (
    <div>
      <h3>Control Panel</h3>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Input voltage (mV):</p>
        <Slider
          sx={{
            width: '20vw',
          }}
          min={0}
          max={100}
          step={10}
          value={inputVoltage}
          onChange={(_, newValue) => setInputVoltage(newValue)}
          valueLabelDisplay="auto"
          ref={inputCurrentSlider}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Pulse duration (ms):</p>
        <Slider
          sx={{
            width: '20vw',
          }}
          min={0}
          max={100}
          step={10}
          value={pulseDuration}
          valueLabelDisplay="auto"
          onChange={(_, newValue) => setPulseDuration(newValue)}
          ref={pulseDurationSlider}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Membrane threshold (mV):</p>
        <Slider
          sx={{
            width: '20vw',
          }}
          min={-80}
          max={30}
          value={restingVoltage}
          step={10}
          valueLabelDisplay="auto"
          onChange={(_, newValue) => setRestingVoltage(newValue)}
          ref={membraneThresholdSlider}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Simultation duration (ms):</p>
        <Slider
          sx={{
            width: '20vw',
          }}
          min={0}
          max={500}
          step={10}
          value={simulationDuration}
          valueLabelDisplay="auto"
          onChange={(_, newValue) => setSimulationDuration(newValue)}
          ref={simulationDurationSlider}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Pulse entrypoint (ms):</p>
        <Slider
          sx={{
            width: '20vw',
          }}
          min={0}
          max={100}
          step={10}
          value={pulseDelay}
          valueLabelDisplay="auto"
          onChange={(_, newValue) => setPulseDelay(newValue)}
          ref={pulseDelaySlider}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={10}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '7vh',
        }}
      >
        <Button
          variant="outlined"
          sx={{
            height: '5vh',
          }}
          onClick={runSimulation}
        >
          <p>Run Simulation</p>
        </Button>
      </Stack>
    </div>
  );
}
