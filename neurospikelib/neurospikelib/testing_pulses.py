from adex import AdEx

AdEx.simulate(pulses=[{
    "start": 10,
    "end": 200,
    "amp": 10
}], membrane_c=1, resolution=100, sharpness=100, tau_w=1000,
simulation_duration=202)