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
  "start": 20,
  "end": 80,
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
LIF EXERCISE: EXPLORING SPIKE RESPONSE

Run the following code and breakdown
how the neuron is responding over time,
including its behaviour under stimulation.
"""

from neurospikelib.lif import LIF

pulses = [{
  "start": 30,
  "end": 50,
  "amp": 2
}, {
  "start": 55,
  "end": 65,
  "amp": 4
}, {
  "start": 70,
  "end": 90,
  "amp": 10
}]

mem_cap = 1
mem_res = 5

v, time_vec = LIF.simulate(resting_v=-72, membrane_c=mem_cap,
membrane_r=mem_res, simulation_duration=130, resolution=10,
pulses=pulses, initial_v=-65, v_reset=-75, threshold_v=-55)

`

const hhMinStimExerciseString = `
"""
HH MODEL EXERCISE: MINIMUM STIMULATION CURRENT

The goal of this exercise is to determine the
minimum amount of current to generate an action
potential in the HH model.

Can you think of an efficient algorithm to help find
minimum_curr_amplitude (instead of brute-force)?
"""

from neurospikelib.hh import HHModel

minimum_curr_amplitude = 100

pulses = [{
  "start": 2,
  "end": 5,
  "amp": minimum_curr_amplitude
}]

hh_data = HHModel.simulate(
  simulation_duration=10, 
  pulses=pulses,
  # Comment the sim_out param to output simulations
  # in the UI
  sim_out=False
)

print(f"Minimum amplitude for AP: {minimum_curr_amplitude} nA")

# TIP: Access HH simulation data through the data property
# which is just a Python dictionary
print(hh_data.data.keys())
print(hh_data.data)

`;

export { 
  adexDefaultCodeString, 
  lifDefaultCodeString, 
  hhDefaultCodeString,
  lifZeroStepExerciseString,
  lifExploringTauExerciseString,
  hhMinStimExerciseString
};