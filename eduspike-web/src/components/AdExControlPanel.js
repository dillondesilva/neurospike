import { useState, useRef } from 'react';
import ParameterSlider from './ParameterSlider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function getSimulationCode(
  inputCurrent,
  pulseDuration,
  membraneThreshold,
  adaptationCurrent,
  simulationDuration,
  pulseDelay
) {
  const codeString = `from neurospikelib.adex import AdEx
AdEx.simulate(pulses=[{
      "start": ${pulseDelay},
      "end": ${pulseDelay + pulseDuration},
      "amp": ${inputCurrent}
  }], resolution=1, b=${adaptationCurrent},
  threshold_v=${membraneThreshold}, simulation_duration=${simulationDuration})`;

  return codeString;
}

const INITIAL_INPUT_CURRENT = 2;
const INITIAL_PULSE_DURATION = 20;
const INITIAL_THRESHOLD_VOLTAGE = -55;
const INITIAL_SIMULATION_DURATION = 100;
const INITIAL_ADAPTATION_CURRENT = 0.1;
const INITIAL_PULSE_DELAY = 0;

export default function AdExControlPanel(props) {
  const [inputCurrent, setInputCurrent] = useState(INITIAL_INPUT_CURRENT);
  const [pulseDuration, setPulseDuration] = useState(INITIAL_PULSE_DURATION);
  const [adaptationCurrent, setAdaptationCurrent] = useState(INITIAL_ADAPTATION_CURRENT);
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
  const adaptationCurrentSlider = useRef();
  const simulationDurationSlider = useRef();
  const pulseDelaySlider = useRef();

  const runSimulation = async () => {
    const codeString = getSimulationCode(
      inputCurrent,
      pulseDuration,
      thresholdVoltage,
      adaptationCurrent,
      simulationDuration,
      pulseDelay
    );

    // Execute code string
    let execData = {
      logs: [],
    }

    props.pyodideInstance.setStdout({
        batched: (msg) => {
            let outputLine = msg;
            execData.logs.push(outputLine);
        }
    });

    props.pyodideInstance.setStderr({
        batched: (msg) => {
            let outputLine = msg;
            execData.logs.push(outputLine);
        }
    });

    try {
        await props.pyodideInstance.runPythonAsync(codeString);
    } catch (e) {
        let outputLine = e.message;
        execData.logs.push(outputLine);
    }

    props.consoleOutputSetter(execData.logs);
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
  const adaptationCurrentTooltipText = 
    'Set amount of adapation current that increases after each spike';

  return (
    <div className="bg-[#010A22] justify-center \
    h-full w-full rounded-[20px] p-6 flex flex-col">
      <div>
        <ParameterSlider 
          parameterName={"Input current (nA)"}
          tooltipText={inputCurrentTooltipText} 
          ref={inputCurrentSlider}
          defaultValue={inputCurrent} 
          setter={setInputCurrent}
          rangeData={[0, 20, 0.1]}
        />
        <ParameterSlider 
          parameterName={"Pulse duration (ms)"}
          tooltipText={pulseDurationTooltipText}
          ref={pulseDurationSlider}
          defaultValue={pulseDuration}
          setter={setPulseDuration}
          rangeData={[0, 100, 10]}
        />
        <ParameterSlider 
          parameterName={"Membrane threshold (mV)"}
          tooltipText={membraneThresholdTooltipText}
          ref={membraneThresholdSlider}
          defaultValue={thresholdVoltage}
          setter={setThresholdVoltage}
          rangeData={[-60, 30, 10]}
        />
        <ParameterSlider 
          parameterName={"Adaptation current (pA)"}
          tooltipText={adaptationCurrentTooltipText}
          ref={adaptationCurrentSlider}
          defaultValue={adaptationCurrent}
          setter={setAdaptationCurrent}
          rangeData={[0, 5, 0.1]} 
        />
        <ParameterSlider 
          parameterName={"Simulation duration (ms)"}
          tooltipText={simulationDurationTooltipText}
          ref={simulationDurationSlider}
          defaultValue={simulationDuration}
          setter={setSimulationDuration}
          rangeData={[100, 500, 10]} 
        />
        <ParameterSlider 
          parameterName={"Pulse entrypoint (ms)"}
          tooltipText={pulseEntrypointTooltipText}
          ref={pulseDelaySlider}
          defaultValue={pulseDelay}
          setter={setPulseDelay}
          rangeData={[0, 100, 10]} 
        />
      </div>
      <div className="pt-6">
        <button
          className="rounded-md px-2 \
          border-2 border-white justify-center place-content-center \
          flex flex-row float-right hover:bg-[white] \
          text-white hover:text-[#010A22]"
          onClick={runSimulation}
        >
          <PlayArrowIcon className="pr-1" />
          <p>Run Simulation</p>
        </button>
      </div>
    </div>
  );
}
