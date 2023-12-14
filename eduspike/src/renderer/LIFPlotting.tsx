import { Container, IconButton } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
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

import { useEffect, useState } from 'react';

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
    },
  ],
};

const options = {
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
    },
  },
};

export default function LIFPlotting() {
  const [simulationDataStr, setSimulationDataStr] = useState('');
  const [plotData, setPlotData] = useState(seedData);
  const [isPlotUpdated, setIsPlotUpdated] = useState(false);

  const updatePlotData = () => {
    console.log('Updating plot data');
    console.log(simulationDataStr);
    const parsedData = JSON.parse(simulationDataStr);
    console.log(parsedData);
    const membraneVoltage = parsedData.data.membrane_voltage;
    const timePoints = parsedData.data.timepoints;
    // const appliedCurrent = parsedData.applied_current;

    const newPlotData = {
      labels: timePoints,
      datasets: [
        {
          label: 'Transmembrane Potential',
          data: membraneVoltage,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        },
        // {
        //   label: 'Applied Current',
        //   data: appliedCurrent,
        //   fill: false,
        //   borderColor: 'rgb(255, 0, 0)',
        // },
      ],
    };

    setPlotData(newPlotData);
  };

  window.electron.ipcRenderer.on('run-code', async (arg: string) => {
    if (arg.includes('{')) {
      setIsPlotUpdated(true);
      const dataStartingIndex = arg.indexOf('{');
      setSimulationDataStr(arg.substring(dataStartingIndex, arg.length));
    }
  });

  useEffect(() => {
    if (isPlotUpdated) {
      updatePlotData();
    }
    // updatePlotData();
  }, [simulationDataStr, isPlotUpdated]);

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
          paddingBottom: '3vh',
        }}
      >
        <Line data={plotData} options={options} />
      </Container>
    </Container>
  );
}
