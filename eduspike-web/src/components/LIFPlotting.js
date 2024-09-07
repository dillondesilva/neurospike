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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const seedData = {
  labels: [],
  datasets: [
    {
      label: 'Transmembrane Potential',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      yAxisID: 'y',
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
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Time (ms)',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Transmembrane Voltage (mV)',
      },
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
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
  elements:{
    point:{
        borderWidth: 0.5,
        radius: 10,
        pointBackgroundColor: 'rgb(255,0,0)',
        pointBorderColor: 'rgb(255,0,0)',
    },
    line: {
        tension : 0.2  // smooth lines
    }
  }
};

export default function LIFPlotting(props) {
  const [plotData, setPlotData] = useState(seedData);
  const [spikeData, setSpikeData] = useState(seedData);
  const [plotOptions, setPlotOptions] = useState(options);
  const [vMax, setVMax] = useState(5);
  const plotRef = useRef();

  const customRadius = (ctx) => {
    if (ctx.raw >= vMax && ctx.dataset.yAxisID === "y") {
      return 3;
    } else if (ctx.dataset.yAxisID === "y1") {
      return 0;
    }

    return 0;
  }

  const updatePlotData = () => {
    try {
      const parsedData = JSON.parse(props.simulationDataStr[0]);
      const membraneVoltage = Array.from(parsedData.data.membrane_voltage);
      const injectedCurrent = Array.from(parsedData.data.injected_current);
      const spikeTimes = Array.from(parsedData.data.spike_times);

      let newPlotOptions = options;
      const voltageMin = Math.min(...membraneVoltage);
      const voltageMax = Math.max(...membraneVoltage);
      const currentMax = Math.max(...injectedCurrent);

      const deltaToPlotMax = Math.abs(Math.abs(voltageMax) - Math.abs(voltageMin)) * 0.1;
      newPlotOptions.scales.y.min = Math.min(...membraneVoltage) - deltaToPlotMax;
      newPlotOptions.scales.y.max = Math.max(...membraneVoltage) + deltaToPlotMax;
      newPlotOptions.scales.y1.max = currentMax * 2;
      newPlotOptions.elements.point.radius = customRadius;
  
      let timePoints = parsedData.data.timepoints;

      timePoints = timePoints.map((timepoint) => {
        return Number(timepoint.toFixed(0));
      });
  
      const newPlotData = {
        labels: timePoints,
        datasets: [
          {
            label: 'Transmembrane Potential',
            data: membraneVoltage,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            yAxisID: 'y'
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

      const newSpikeData = {
        labels: spikeTimes,
        datasets: [
          {
            data: [10],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            yAxisID: 'y'
          },
        ],
      }
      
      setPlotData(newPlotData);  
      setSpikeData(newSpikeData);
      setPlotOptions(newPlotOptions);

      // Setting the options like this is unsafe.
      // Need to refactor in future
      plotRef.current.options = newPlotOptions;
      plotRef.current.update();
    } catch (e) {
      console.log(e)
    }
  
  };

  useEffect(() => {
      updatePlotData();
    // updatePlotData
  }, [props.simulationDataStr]);

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
        <Line ref={plotRef} data={plotData} options={plotOptions} />
      </Container>
    </Container>
  );
}
