import '../App.css';
import { Box } from '@mui/material';
import ModeOptionCard from './ModeOptionCard';

export default function ModeSelection() {
  const playgroundDescriptions: object = {
    lif: 'Explore the simplest integrate-and-fire model by stimulating a neuron to form an action potential',
    eif: 'See how factoring in exponential changes to membrane voltage produce more accurate integrate-and-fire models',
    hhSpike:
      'Use the Hodgkin-Huxley Model to explore the behaviour of different ion channels during nerve impulse propagation',
  };

  return (
    <div className="modeSelectionWrapper">
      <Box
        sx={{
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>🧠 Neurospike Education 🧠</h1>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
        }}
      >
        <ModeOptionCard
          title="LIF Model Playground"
          description={playgroundDescriptions.lif}
          playgroundRef="/lif"
        />
        {/* <ModeOptionCard
          title="EIF Model Playground"
          description={playgroundDescriptions.eif}
        /> */}
        {/* <ModeOptionCard
          title="HH Spike Playground"
          description={playgroundDescriptions.hhSpike}
        /> */}
      </Box>
    </div>
  );
}
