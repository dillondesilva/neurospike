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
      data: [],
      borderColor: 'rgb(75, 192, 192)',
    },
  ],
};

export default function LIFPlotting() {
  const [simulationDataStr, setSimulationDataStr] = useState('');
  const [plotData, setPlotData] = useState(seedData);

  const updatePlotData = () => {
    console.log('Updating plot data');
    console.log(simulationDataStr);
    const parsedData = JSON.parse(simulationDataStr);
    console.log(parsedData);
    const membraneVoltage = parsedData.membrane_voltage;
    const { timepoints } = parsedData;

    const newPlotData = {
      labels: timepoints,
      datasets: [
        {
          label: 'Transmembrane Potential',
          data: membraneVoltage,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        },
      ],
    };

    setPlotData(newPlotData);
    console.log(plotData)
  };

  window.electron.ipcRenderer.on('run-code', async (arg: string) => {
    if (arg.includes('{')) {
      const dataStartingIndex = arg.indexOf('{');
      await setSimulationDataStr(arg.substring(dataStartingIndex, arg.length));
      updatePlotData();
    }
  });

  return <Line data={plotData} />;
}
