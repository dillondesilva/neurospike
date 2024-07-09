import { useState, useRef } from 'react';
import ParameterSlider from './ParameterSlider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function getSimulationCode(
  inputCurrent,
  pulseDuration,
  simulationDuration,
  pulseDelay
) {
  const codeString = `from neurospikelib.hh import HHModel
HHModel.simulate(pulses=[{
      "start": ${pulseDelay},
      "end": ${pulseDelay + pulseDuration},
      "amp": ${inputCurrent}
  }], simulation_duration=${simulationDuration})`;

  return codeString;
}

const INITIAL_INPUT_CURRENT = 2;
const INITIAL_PULSE_DURATION = 20;
const INITIAL_SIMULATION_DURATION = 20;
const INITIAL_PULSE_DELAY = 0;

export default function HHControlPanel(props) {
  const [inputCurrent, setInputCurrent] = useState(INITIAL_INPUT_CURRENT);
  const [pulseDuration, setPulseDuration] = useState(INITIAL_PULSE_DURATION);
  const [simulationDuration, setSimulationDuration] = useState(
    INITIAL_SIMULATION_DURATION
  );
  const [pulseDelay, setPulseDelay] = useState(INITIAL_PULSE_DELAY);

  const inputCurrentSlider = useRef();
  const pulseDurationSlider = useRef();
  const simulationDurationSlider = useRef();
  const pulseDelaySlider = useRef();

  const runSimulation = async () => {
    const codeString = getSimulationCode(
      inputCurrent,
      pulseDuration,
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
  const simulationDurationTooltipText =
  'Select how long the desired simulation should go for';
  const pulseEntrypointTooltipText =
  'Control when to introduce the pulse into the simulation';

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
          rangeData={[0, 25, 1]}
        />
        <ParameterSlider 
          parameterName={"Simulation duration (ms)"}
          tooltipText={simulationDurationTooltipText}
          ref={simulationDurationSlider}
          defaultValue={simulationDuration}
          setter={setSimulationDuration}
          rangeData={[5, 30, 1]} 
        />
        <ParameterSlider 
          parameterName={"Pulse entrypoint (ms)"}
          tooltipText={pulseEntrypointTooltipText}
          ref={pulseDelaySlider}
          defaultValue={pulseDelay}
          setter={setPulseDelay}
          rangeData={[5, 25, 1]} 
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
