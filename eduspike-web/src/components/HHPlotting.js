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
    console.log(vMax);
    if (ctx.raw >= vMax) {
      console.log("hit");
      return 3;
    }

    return 0;
  }

  const updatePlotData = () => {
    try {
      const parsedData = JSON.parse(props.simulationDataStr[0]);
      let timePoints = parsedData.data.timepoints;

      timePoints = timePoints.map((timepoint) => {
        return Number(timepoint.toFixed(0));
      });
      if (props.plotMode === "AP") {
        const membraneVoltage = Array.from(parsedData.data.membrane_voltage);
        let newPlotOptions = options;
        const voltageMin = Math.min(...membraneVoltage);
        const voltageMax = Math.max(...membraneVoltage);
        setVMax(voltageMax);
        const deltaToPlotMax = Math.abs(Math.abs(voltageMax) - Math.abs(voltageMin)) * 0.1;
        newPlotOptions.scales.y.min = Math.min(...membraneVoltage) - deltaToPlotMax;
        newPlotOptions.scales.y.max = Math.max(...membraneVoltage) + deltaToPlotMax;
        // newPlotOptions.elements.point.radius = customRadius;

        const newPlotData = {
          labels: timePoints,
          datasets: [
            {
              label: 'Transmembrane Potential',
              data: membraneVoltage,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
            }
          ],
        };

        console.log("UPdated")  
        setPlotData(newPlotData);  
        setPlotOptions(newPlotOptions);
        console.log(plotRef);

        // Setting the options like this is unsafe.
        // Need to refactor in future
        plotRef.current.options = newPlotOptions;
        plotRef.current.update();  
        console.log("UPdated")  
      } else {
        console.log(parsedData)
        const naCurrent = Array.from(parsedData.data.na_current);
        const kCurrent = Array.from(parsedData.data.k_current);
        const leakCurrent = Array.from(parsedData.data.leak_current);
        let newPlotOptions = options;
        const voltageMin = Math.min(...naCurrent, ...kCurrent, ...leakCurrent);
        const voltageMax = Math.max(...naCurrent, ...kCurrent, ...leakCurrent);
        setVMax(voltageMax);
        newPlotOptions.scales.y.min = voltageMin - (Math.abs(voltageMin) * 0.1);
        newPlotOptions.scales.y.max = voltageMax + (0.1 * voltageMax);
        newPlotOptions.scales.y.title.text = "Ion Currents (mA)"
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
      }
   
    } catch (e) {
      console.log(e)
    }
  
  };

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
        <Line ref={plotRef} data={plotData} options={plotOptions} />
      </Container>
    </Container>
  );
}
