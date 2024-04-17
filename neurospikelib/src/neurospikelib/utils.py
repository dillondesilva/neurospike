from neurospikelib.lif import LIF

LIF.simulate(pulses=[{
    "start": 10,
    "end": 20,
    "amp": 3
}, {
    "start": 40,
    "end": 80,
    "amp": 5
}], membrane_c=1, resolution=1)