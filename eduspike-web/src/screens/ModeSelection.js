import '../App.css';
import { Box } from '@mui/material';
import ModeOptionCard from './ModeOptionCard';

function openAuthor() {
  window.open("https://dillondesilva.github.io/", "_blank")
}

export default function ModeSelection() {
  const playgroundDescriptions = {
    lif: 'Explore the simplest integrate-and-fire model by stimulating a neuron to form an action potential',
    eif: 'See how factoring in exponential changes to membrane voltage produce more accurate integrate-and-fire models',
    hh:
      'Use the Hodgkin-Huxley Model to explore the behaviour of different ion channels during nerve impulse propagation',
  };

  return (
    <div>
      <div class="grid grid-cols-2 gap-4 h-screen">

        <div class="container p-16 content-center">
          <div>
            <img src='logo-white-bg.png' className='w-3/12' alt="logo"/>
            <h1 className="text-4xl">Welcome to <h1 className="font-bold">Eduspike</h1></h1>
            <p className="mt-4">Understanding computational neurons has never been more intuitive.</p>
          </div>
          <div>
            <p className='pt-12'>Built by</p>
            <div className='pt-4 hover:opacity-75'>
              <button className='w-full' onClick={() => openAuthor('dillon')}>
                <img src='dillon.jpg' className='w-1/12 rounded-full' alt="logo"></img>
              </button>
            </div>
          </div>
        </div> 

        <div class="container p-16 content-center self-center">
          <div className='pt-6'>
            <ModeOptionCard title="LIF Sandbox" description={playgroundDescriptions.lif} playgroundRef="/lif"/>
          </div>
          <div className='pt-6'>
            <ModeOptionCard title="AdEx Sandbox" description={playgroundDescriptions.lif} playgroundRef="/adex"/>
          </div>
          <div className='pt-6'>
            <ModeOptionCard title="Hodgkin-Huxley Sandbox" description={playgroundDescriptions.hh} playgroundRef="/hh"/>
          </div>
        </div> 
      </div>
    </div>
  );
}
