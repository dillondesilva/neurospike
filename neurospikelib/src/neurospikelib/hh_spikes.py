from hh import HHModel
import matplotlib.pyplot as plt
import numpy as np

pulses = [{
    "start": 10,
    "end": 30,
    "amp": 20
}]

membrane_vec, time_v = HHModel.simulate(pulses=pulses)
plt.plot(time_v, membrane_vec)
plt.axis([0,time_v[-1], np.min((-70,np.min(membrane_vec))),np.max((-57,np.max(membrane_vec)))])
plt.show()