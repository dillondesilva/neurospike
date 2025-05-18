import { Container } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useEffect, useState, useRef } from 'react';

import { Line } from 'react-chartjs-2';
import { playbackBarPlugin } from './PlaybackBarPlugin';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  playbackBarPlugin
);

const seedData = {
  labels: [],
  datasets: [
    {
      label: 'Transmembrane Potential',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Current',
      data: [],
      fill: false,
      borderColor: 'rgb(255, 102, 102)',
      yAxisID: 'y1',
    },
  ],
};

let options = {
  plugins: {
    tooltip: {
      animation: false
    },
    playbackBar: {
      lineAtIndex: [0]
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Time (ms)',
      },
      ticks: {
        maxTicksLimit: 5,
      },
      type: "linear",
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Transmembrane Voltage (mV)',
      },
      ticks: {
        maxTicksLimit: 5,
      },
      type: "linear",
      min: -75,
      max: 10
    },
    y1: {
      label: 'Current',
      type: 'linear',
      title: {
        display: true,
        text: 'Stimulating Current (pA)',
      },
      ticks: {
        maxTicksLimit: 5,
      },
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
  elements:{
    point:{
        // borderWidth: 0.5,
        radius: 1,
        // pointBackgroundColor: 'rgb(255,0,0)',
        // pointBorderColor: 'rgb(255,0,0)'
    },
    line: {
        tension : 0.2  // smooth lines
    }
  }
};

export default function HHPlotting(props) {
  const [plotData, setPlotData] = useState(seedData);
  const [plotOptions, setPlotOptions] = useState(options);
  const [vMax, setVMax] = useState(5);
  const plotRef = useRef();


  const customRadius = (ctx) => {
    if (ctx.raw >= vMax) {
      return 3;
    }

    return 0;
  }

  const updatePlotData = () => {
    try {
      const parsedData = JSON.parse(props.simulationDataStr[0]);
      let timePoints = parsedData.data.timepoints;

      timePoints = timePoints.map((timepoint) => {
        return Number(timepoint.toFixed(2));
      });
      if (props.plotMode === "AP") {
        const membraneVoltage = Array.from(parsedData.data.membrane_voltage);
        const injectedCurrent = Array.from(parsedData.data.injected_current);

        let newPlotOptions = {...options};  // Create a new object instead of mutating
        const voltageMin = Math.min(...membraneVoltage);
        const voltageMax = Math.max(...membraneVoltage);
        const currentMax = Math.max(...injectedCurrent);
        setVMax(voltageMax);

        const deltaToPlotMax = Math.abs(Math.abs(voltageMax) - Math.abs(voltageMin)) * 0.1;
        const timestepSize = (timePoints[timePoints.length - 1] - timePoints[0]) / 4;
        const membraneVoltageTickStepSize = (voltageMax - voltageMin) / 4;
        const injectedCurrentTickStepSize = (currentMax * 2) / 4;

        newPlotOptions.scales.y.min = Math.min(...membraneVoltage) - deltaToPlotMax;
        newPlotOptions.scales.y.max = Math.max(...membraneVoltage) + deltaToPlotMax;
        newPlotOptions.scales.y1.max = currentMax * 2;
        newPlotOptions.scales.y.title.text = "Transmembrane Voltage (mV)";
        newPlotOptions.scales.y1.display = true;  // Show the right axis for current
        newPlotOptions.scales.x.ticks.stepSize = timestepSize;
        newPlotOptions.scales.y.ticks.stepSize = membraneVoltageTickStepSize;
        newPlotOptions.scales.y1.ticks.stepSize = injectedCurrentTickStepSize;

        const newPlotData = {
          labels: timePoints,
          datasets: [
            {
              label: 'Transmembrane Potential',
              data: membraneVoltage,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
            },
            {
              label: 'Current',
              data: injectedCurrent,
              fill: false,
              borderColor: 'rgb(255, 102, 102)',
              yAxisID: 'y1',
            },
          ],
        };

        setPlotData(newPlotData);  
        setPlotOptions(newPlotOptions);
        plotRef.current.options = newPlotOptions;
        plotRef.current.update();  

      } else {
        const naCurrent = Array.from(parsedData.data.na_current);
        const kCurrent = Array.from(parsedData.data.k_current);
        const leakCurrent = Array.from(parsedData.data.leak_current);
        let newPlotOptions = {...options};  // Create a new object instead of mutating
        const voltageMin = Math.min(...naCurrent, ...kCurrent, ...leakCurrent);
        const voltageMax = Math.max(...naCurrent, ...kCurrent, ...leakCurrent);
        setVMax(voltageMax);
        newPlotOptions.scales.y.min = voltageMin - (Math.abs(voltageMin) * 0.1);
        newPlotOptions.scales.y.max = voltageMax + (0.1 * voltageMax);
        newPlotOptions.scales.y.title.text = "Ion Currents (mA)";
        newPlotOptions.scales.y1.display = false;  // Hide the right axis for ion currents view

        const newPlotData = {
          labels: timePoints,
          datasets: [
            {
              label: 'Na+ Current',
              data: naCurrent,
              fill: false,
              borderColor: 'rgb(255, 0, 0)',
            },
            {
              label: 'K+ Current',
              data: kCurrent,
              fill: false,
              borderColor: 'rgb(10, 255, 12)',
            },
            {
              label: 'Leaky Current',
              data: leakCurrent,
              fill: false,
              borderColor: 'rgb(25, 25, 10)',
            },
          ],
        };
 
        setPlotData(newPlotData);  
        setPlotOptions(newPlotOptions);

                // Setting the options like this is unsafe.
        // Need to refactor in future
        plotRef.current.options = newPlotOptions;
        plotRef.current.update();  

        // if (plotRef.current) {
        //   plotRef.current.options = newPlotOptions;
        //   plotRef.current.update();
        // }
      }
   
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    options.onClick = async (event, elements) => {
      // elements contains the clicked points
      if (elements.length > 0) {
          const element = elements[0];
          const dataIndex = element.index;
          await props.setActiveState(false);
          await props.setNewTimepoint(dataIndex);
          await props.setFocus(true);
      }
    }
  })

  useEffect(() => {
    const updatePlaybackBar = async () => {
      let newPlotOptions = {...options};  // Create a new object from options instead of plotOptions
      newPlotOptions.plugins.playbackBar.lineAtIndex = [props.currentTimepoint];
      setPlotOptions(newPlotOptions);
      if (plotRef.current) {
        plotRef.current.options = newPlotOptions;
        plotRef.current.update();
      }
    }

    if (props.currentTimepoint !== undefined) {
      updatePlaybackBar();
    }
  }, [props.currentTimepoint]);

  useEffect(() => {
    const handleClick = async (event, elements) => {
      if (elements.length > 0) {
        const element = elements[0];
        const dataIndex = element.index;
        // Update playback bar immediately
        const newPlotOptions = {...options};  // Create a new object from options instead of plotOptions
        newPlotOptions.plugins.playbackBar.lineAtIndex = [dataIndex];
        setPlotOptions(newPlotOptions);
        if (plotRef.current) {
          plotRef.current.options = newPlotOptions;
          plotRef.current.update();
        }
        // Then update the state
        await props.setActiveState(false);
        await props.setNewTimepoint(dataIndex);
        await props.setFocus(true);
      }
    };

  }, [props.setActiveState, props.setNewTimepoint, props.setFocus]);

  useEffect(() => {
      updatePlotData();
    // updatePlotData
  }, [props.plotMode, props.simulationDataStr]);

  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '0.2vh',
        }}
      >
        <Line ref={plotRef} data={plotData} options={plotOptions} plugins={[playbackBarPlugin]} />
      </Container>
    </Container>
  );
}
