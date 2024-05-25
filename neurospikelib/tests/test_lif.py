"""
LIF Model Tests

To assess the correctness of the neurospikelib implementaition
of the LIF model, we compare it against LeakyIntegrator.ipynb
from Robert Rosenbaum's implementation of the LIF model. 

Source: Rosenbaum, Robert. Modeling Neural Circuits 
Made Simple with Python. MIT Press, 2024.
"""
import numpy as np
import numpy.testing as npt
from tests.test_lif_helper import *
from neurospikelib.lif import LIF

def test_basic1():
    # Now perform same computation using neurospikelib
    # Note that taum is equivalent to product of R and C
    pulses = [{
        "start": 0,
        "end": 100,
        "amp": 19
    }]
    v, time_vec = LIF.simulate(resting_v=-72, membrane_c=15, membrane_r=1, 
    simulation_duration=100, resolution=10, pulses=pulses, initial_v=-70,
    v_reset=-75, threshold_v=-55)

    npt.assert_equal(len(v), len(BASIC_1_EXPECTED_V))
    npt.assert_almost_equal(v, BASIC_1_EXPECTED_V, decimal=2)
    return

def test_basic2():
    # Now perform same computation using neurospikelib
    # Note that taum is equivalent to product of R and C
    pulses = [{
        "start": 0,
        "end": 300,
        "amp": 19
    }]
    v, time_vec = LIF.simulate(resting_v=-72, membrane_c=15, membrane_r=1, 
    simulation_duration=300, resolution=10, pulses=pulses, initial_v=-70,
    v_reset=-75, threshold_v=-55)

    npt.assert_equal(len(v), len(BASIC_2_EXPECTED_V))
    npt.assert_almost_equal(v, BASIC_2_EXPECTED_V, decimal=2)

def test_edge1():
    # Testing that a simulation duration of 0 results
    # in an empty membrane voltage vector returned
    v, time_vec = LIF.simulate(resting_v=-72, membrane_c=15, membrane_r=1, 
    simulation_duration=0, resolution=10, initial_v=-70,
    v_reset=-75, threshold_v=-55)
    npt.assert_equal(v, EDGE_1_EXPECTED_V)
