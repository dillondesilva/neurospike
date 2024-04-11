import '../App.css';
import { Box } from '@mui/material';
import ModeOptionCard from './ModeOptionCard';

export default function ModeSelection() {
  const playgroundDescriptions: object = {
    lif: 'Explore the simplest integrate-and-fire model by stimulating a neuron to form an action potential',
    eif: 'See how factoring in exponential changes to membrane voltage produce more accurate integrate-and-fire models',
    hhSpike:
      'Use the Hodgkin-Huxley Model to explore the behaviour of different ion channels during nerve impulse propagation',
    adex: 'Improve the realism of the integrate-and-fire model by introducing positive feedback loops into your model',
  };

  return (
    <div className="modeSelectionWrapper">
      <Box
        sx={{
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>🧠 Eduspike 🧠</h1>
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
        <ModeOptionCard
          title="Hodgkin-Huxley Model Playground"
          description={playgroundDescriptions.hhSpike}
          playgroundRef='/hh'
        />
        <ModeOptionCard
          title="AdEx Model Playground"
          description={playgroundDescriptions.adex}
          playgroundRef='/adex'
        />
      </Box>
    </div>
  );
}
