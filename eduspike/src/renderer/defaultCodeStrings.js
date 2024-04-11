const adexDefaultCodeString = `"""
AdEx Model Sample

The following is some sample code for how you can use
the in-built neurospikelib AdEx model to run your simulation
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
AdEx Model Sample

The following is some sample code for how you can use
the in-built neurospikelib AdEx model to run your simulation
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


export { adexDefaultCodeString, lifDefaultCodeString };