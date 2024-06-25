"""
AdEx Model Tests

To assess the correctness of the neurospikelib implementaition
of the AdEx model, we compare it against AdEx.ipynb
from Robert Rosenbaum's implementation of the LIF model. 

Source: Rosenbaum, Robert. Modeling Neural Circuits 
Made Simple with Python. MIT Press, 2024.
"""
import numpy as np
import numpy.testing as npt
from tests.test_adex_helper import *
from neurospikelib.adex import AdEx

def test_basic1():
    # Now perform same computation using neurospikelib
    # Note that taum is equivalent to product of R and C
    pulses = [{
        "start": 0,
        "end": 1000,
        "amp": 19
    }]
    v, time_vec = AdEx.simulate(resting_v=-72, membrane_c=15, membrane_r=1, 
    simulation_duration=1000, resolution=10, pulses=pulses, initial_v=-70,
    v_reset=-75, threshold_v=-55, sharpness=2, a=0.1, b=0.75, tau_w=400)
    npt.assert_equal(len(v), len(BASIC_1_EXPECTED_V))
    print(v[409])
    print(BASIC_1_EXPECTED_V[409])
    npt.assert_almost_equal(v, BASIC_1_EXPECTED_V, decimal=2)
    return