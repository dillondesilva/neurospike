"""
HH Model Tests

To assess the correctness of the neurospikelib implementaition
of the Hodgkin-Huxley model, we compare it against HodgkinHuxley.ipynb
from Robert Rosenbaum's implementation of the HH model. 

Source: Rosenbaum, Robert. Modeling Neural Circuits 
Made Simple with Python. MIT Press, 2024.
"""
import numpy as np
import numpy.testing as npt
from tests.test_hh_helper import *
from neurospikelib.hh import HHModel

def test_basic1():
    pulses = [{
        "start": 13,
        "end": 14,
        "amp": 20
    }]
    v, time_vec = HHModel.simulate(simulation_duration=30, pulses=pulses)

    npt.assert_equal(len(v), len(BASIC_1_EXPECTED_V))
    npt.assert_almost_equal(v, BASIC_1_EXPECTED_V, decimal=2)
    return
