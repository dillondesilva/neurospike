from hh import HHModel
import matplotlib.pyplot as plt
import numpy as np

pulses = [{
    "start": 0,
    "end": 15,
    "amp": 2
}]

membrane_vec, time_v = HHModel.simulate(simulation_duration=100, pulses=pulses, resolution=100)
plt.plot(time_v, membrane_vec)
plt.axis([0,time_v[-1], np.min((-70,np.min(membrane_vec))),np.max((-57,np.max(membrane_vec)))])
plt.show()