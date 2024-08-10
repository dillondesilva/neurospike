const adexDefaultCodeString = `"""
AdEx Model Sample

The following is some sample code for how you can use
the in-built neurospikelib AdEx model to run your simulations
"""
from neurospikelib.adex import AdEx

# Now perform same computation using neurospikelib
# Note that taum is equivalent to product of R and C
pulses = [{
    "start": 0,
    "end": 1000,
    "amp": 19
}]

v, time_vec = AdEx.simulate(resting_v=-72, membrane_c=15, 
membrane_r=1, simulation_duration=1000, resolution=1, 
pulses=pulses, initial_v=-70, v_reset=-75, threshold_v=-55, 
sharpness=2, a=0.1, b=0.75, tau_w=400)`;

const lifDefaultCodeString = `"""
LIF Model Sample

The following is some sample code for how you can use
the in-built neurospikelib LIF model to run your simulations
"""

from neurospikelib.lif import LIF

# Now perform same computation using neurospikelib
# Note that taum is equivalent to product of R and C
pulses = [{
  "start": 0,
  "end": 100,
  "amp": 19
}]

v, time_vec = LIF.simulate(resting_v=-72, membrane_c=15,
membrane_r=1, simulation_duration=100, resolution=10, 
pulses=pulses, initial_v=-70, v_reset=-75, threshold_v=-55)
`;

const hhDefaultCodeString = `"""
Hodgkin-Huxley (HH) Model Sample

The following is some sample code for how you can use
the in-built neurospikelib HH model to run your simulations
"""

from neurospikelib.hh import HHModel

# Now perform same computation using neurospikelib
# Note that taum is equivalent to product of R and C
pulses = [{
  "start": 10,
  "end": 15,
  "amp": 3
}]

v, time_vec = HHModel.simulate(simulation_duration=25, pulses=pulses)`

const lifZeroStepExerciseString = `"""
LIF EXERCISE: ZERO STEP CURRENT

Let's find out what happens when we 
don't stimulate our LIF neuron.
"""

from neurospikelib.lif import LIF

v, time_vec = LIF.simulate(resting_v=-72, membrane_c=15,
membrane_r=1, simulation_duration=100, resolution=10,
initial_v=-70, v_reset=-75, threshold_v=-55)
`
const lifExploringTauExerciseString = `"""
LIF EXERCISE: EXPLORING TAU
The time constant tau is the product
of membrane resistance and capacitance.

What happens when we change this? 
"""

from neurospikelib.lif import LIF

pulses = [{
  "start": 1,
  "end": 100,
  "amp": 15
}]

# Change mem_cap and mem_res to adjust value of tau
# and see neuron response
mem_cap = 5
mem_res = 1

v, time_vec = LIF.simulate(resting_v=-72, membrane_c=mem_cap,
membrane_r=mem_res, simulation_duration=100, resolution=10,
pulses=pulses, initial_v=-70, v_reset=-75, threshold_v=-55)

`

export { 
  adexDefaultCodeString, 
  lifDefaultCodeString, 
  hhDefaultCodeString,
  lifZeroStepExerciseString,
  lifExploringTauExerciseString
};