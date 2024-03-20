from adex import AdEx

AdEx.simulate(pulses=[{
  "start": 100,
  "end": 400,
  "amp": 10
}], membrane_c=1, resolution=100, sharpness=100, tau_w=100, simulation_duration=500)