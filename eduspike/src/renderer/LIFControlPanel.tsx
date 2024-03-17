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
import { loadPyodide } from 'pyodide';

async function hello_python(content) {
  const pyodide = await loadPyodide({
    indexURL: './pyodide/',
  });

  pyodide.setStdout({ batched: (string) => {
    console.log(new Blob([string]).size);
    window.electron.ipcRenderer.sendMessage('run-code', [string]);
  } });

  await pyodide.loadPackage("numpy");
  await pyodide.loadPackage('./pyodide/neurospikelib-0.1.0-py3-none-any.whl');
  console.log("now running python");
  let val = await pyodide.runPythonAsync(content);
  return val;
}

function getSimulationCode(
  inputCurrent: any,
  pulseDuration: any,
  membraneThreshold: any,
  simulationDuration: any,
  pulseDelay: any
) {
  const codeString = `from neurospikelib.lif import LIF
LIF.simulate(pulses=[{
      "start": ${pulseDelay},
      "end": ${pulseDelay + pulseDuration},
      "amp": ${inputCurrent}
  }], resolution=1, threshold_v=${membraneThreshold}, simulation_duration=${simulationDuration})`;

  return codeString;
}

const INITIAL_INPUT_CURRENT = 2;
const INITIAL_PULSE_DURATION = 20;
const INITIAL_THRESHOLD_VOLTAGE = -55;
const INITIAL_SIMULATION_DURATION = 100;
const INITIAL_PULSE_DELAY = 0;

export default function LIFControlPanel() {
  const [inputCurrent, setInputCurrent] = useState(INITIAL_INPUT_CURRENT);
  const [pulseDuration, setPulseDuration] = useState(INITIAL_PULSE_DURATION);
  const [thresholdVoltage, setThresholdVoltage] = useState(
    INITIAL_THRESHOLD_VOLTAGE
  );
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
      thresholdVoltage,
      simulationDuration,
      pulseDelay
    );

    hello_python(codeString);

    // window.electron.ipcRenderer.sendMessage('run-code', [codeString]);
  };

  const inputCurrentTooltipText =
    'Step input current is injected into the neuron model in order to introduce a change in membrane voltage';

  const pulseDurationTooltipText =
    'Select how long a single pulse duration lasts';

  const membraneThresholdTooltipText =
    'Set the voltage at which the neuron will fire';
  const simulationDurationTooltipText =
    'Select how long the desired simulation should go for';
  const pulseEntrypointTooltipText =
    'Control when to introduce the pulse into the simulation';

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
          min={-60}
          max={30}
          value={thresholdVoltage}
          step={10}
          valueLabelDisplay="auto"
          onChange={(_, newValue) => setThresholdVoltage(newValue)}
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
          min={100}
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
