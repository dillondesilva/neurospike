import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Stack,
  Container,
  Tooltip,
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

const INITIAL_INPUT_CURRENT = 2;
const INITIAL_PULSE_DURATION = 20;
const INITIAL_RESTING_VOLTAGE = -70;
const INITIAL_SIMULATION_DURATION = 100;
const INITIAL_PULSE_DELAY = 0;

export default function LIFControlPanel() {
  const [inputCurrent, setInputCurrent] = useState(INITIAL_INPUT_CURRENT);
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
      inputCurrent,
      pulseDuration,
      restingVoltage,
      simulationDuration,
      pulseDelay
    );

    window.electron.ipcRenderer.sendMessage('run-code', [codeString]);
  };

  const inputCurrentTooltipText =
    'Step input current is injected into the neuron model in order to introduce a change in membrane voltage';

  const pulseDurationTooltipText =
    'Select how long a single pulse duration lasts';

  const membraneThresholdTooltipText = 'Set the voltage at which the neuron will fire';
  const simulationDurationTooltipText = 'Select how long the desired simulation should go for'
  const pulseEntrypointTooltipText = 'Control when to introduce the pulse into the simulation';

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
        <Tooltip title={inputCurrentTooltipText} placement="right">
          <p>Input current (nA):</p>
        </Tooltip>
        <Slider
          sx={{
            width: '20vw',
          }}
          min={0}
          max={3}
          step={0.1}
          value={inputCurrent}
          onChange={(_, newValue) => setInputCurrent(newValue)}
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
        <Tooltip title={pulseDurationTooltipText} placement="right">
          <p>Pulse duration (ms):</p>
        </Tooltip>
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
        <Tooltip title={membraneThresholdTooltipText} placement="right">
          <p>Membrane threshold (mV):</p>
        </Tooltip>
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
        <Tooltip title={simulationDurationTooltipText} placement="right">
          <p>Simultation duration (ms):</p>
        </Tooltip>
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

        <Tooltip title={pulseEntrypointTooltipText} placement="right">
          <p>Pulse entrypoint (ms):</p>
        </Tooltip>
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
