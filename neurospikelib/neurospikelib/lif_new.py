import json
import sys

import numpy as np
from neuron import h
from neuron.units import ms, mV
import matplotlib.pyplot as plt

DEFAULT_NUM_TIMEPOINTS = 101
DEFAULT_NUM_VOLTAGE_POINTS = 101

# Default voltages are in mV
DEFAULT_THRESHOLD_VOLTAGE = -55
DEFAULT_RESTING_VOLTAGE = -70

# Capacitance and Ohms in microfarads and ohms respectively
DEFAULT_MEMBRANE_CAPACITANCE = 2
DEFAULT_MEMBRANE_RESISTANCE = 4

# Simulation duration in ms
DEFAULT_SIMULATION_DURATION = 100
DEFAULT_RESOLUTION = 10

def visualize_custom_lif(membrane_v, timepoints, step_current):
    # Getting color visualization
    membrane_v = list(membrane_v)
    timepoints = list(timepoints)

    min_v = np.min(membrane_v)
    max_v = np.max(membrane_v)
    reshaped_membrane_v = np.reshape(membrane_v, (len(membrane_v), 1))
    normalized_v_data = (reshaped_membrane_v - min_v) / (max_v - min_v)

    (
        intracellular_color_v,
        extracellular_color_v,
    ) = LIFSimulation.create_visualization_data(normalized_v_data)
    stim_pulse_train = []
    for i in step_current:
        if i > 0:
            stim_pulse_train.append(1)
        else:
            stim_pulse_train.append(0)

    simulation_results = {
        "membrane_voltage": membrane_v,
        "intracellular_color_v": intracellular_color_v.tolist(),
        "extracellular_color_v": extracellular_color_v.tolist(),
        "timepoints": timepoints,
        "stim_pulse_train": list(stim_pulse_train),
    }

    sys.stdout.write(json.dumps(simulation_results))


class LIFSimulation:
    """
    Leaky Integrate and Fire Simulation Module for Neurospike. Operates
    as a wrapper around brian2 and neurodynex3 libraries to provide
    LIF Model support for Neurospike simulation app
    """

    def __normalize_time_series(self, time_series):
        """Normalizes a given time series. Used for color assignment algorithm"""
        normalized_values = expit(time_series)
        return normalized_values

    @staticmethod
    def create_visualization_data(
        normalized_v_data, base_color=(132, 215, 206), final_color=(238, 129, 238)
    ):
        """Calculate colors to create visualization for LIF simulation"""
        base_color_v = np.array(base_color)
        final_color_v = np.array(final_color)

        color_distance = (final_color_v - base_color_v)[np.newaxis]

        color_time_v = color_distance * normalized_v_data
        intracellular_color_v = base_color_v + color_time_v
        extracellular_color_v = final_color_v - color_time_v

        return (intracellular_color_v, extracellular_color_v)

    @staticmethod
    def simulate(
        threshold_v=DEFAULT_THRESHOLD_VOLTAGE,
        resting_v=DEFAULT_RESTING_VOLTAGE,
        membrane_c=DEFAULT_MEMBRANE_CAPACITANCE,
        membrane_r=DEFAULT_MEMBRANE_RESISTANCE,
        simulation_duration=DEFAULT_SIMULATION_DURATION,
        resolution=DEFAULT_RESOLUTION,
        pulses=[]
    ):
        """
        Runs LIF model simulation given the following data:
            - Threshold voltage (mV)
            - Resting voltage (mV)
            - Membrane capacitance (Microfarads)
            - Membrane resistance (Ohms)
            - Pulses object
        """
        num_points = simulation_duration * resolution
        current_vec = np.zeros(num_points)
        membrane_v_vec = np.zeros(num_points)
        membrane_v_vec[0] = resting_v
        dt = (simulation_duration / (num_points - 1))
        time_vec = np.linspace(0, simulation_duration, num_points)
        v_peak = threshold_v + 30
        v_reset = resting_v

        for pulse in pulses:
            pulse_start = pulse["start"]
            pulse_end = pulse["end"]
            pulse_amplitude = pulse["amp"]

            # Determining indices to apply pulse
            pulse_start_idx = pulse_start * resolution
            pulse_end_idx = pulse_end * resolution
            pulse_app_indices = [range(pulse_start_idx, pulse_end_idx + 1)]
            pulse_vec = np.zeros(len(pulse_app_indices))
            pulse_vec.fill(pulse_amplitude)
            np.put(current_vec, pulse_app_indices, pulse_vec)

        # Determining time constant
        tau = membrane_r * membrane_c
        spike_times = []
        # Forward Euler solver
        for i in range(len(membrane_v_vec) - 1):
            membrane_v_vec[i + 1] = ((dt/tau) * ((resting_v - membrane_v_vec[i]) + (membrane_r * current_vec[i]))) + membrane_v_vec[i]
            # Handle spiking
            if membrane_v_vec[i+1] >= threshold_v:
                spike_times.append(time_vec[i + 1])
                membrane_v_vec[i + 1] = v_reset

        plt.scatter(spike_times, [threshold_v for i in spike_times])
        plt.plot(time_vec, membrane_v_vec.tolist())
        plt.show()
        reshaped_membrane_v_vec = np.reshape(membrane_v_vec, (len(membrane_v_vec), 1))

        # Getting color visualization
        min_v = np.min(list(membrane_v_vec))
        max_v = np.max(list(membrane_v_vec))

        normalized_v_data = ((reshaped_membrane_v_vec - min_v) / (max_v - min_v))
        intracellular_color_v, extracellular_color_v = LIFSimulation.create_visualization_data(normalized_v_data)
        simulation_results = {
            "membrane_voltage": list(membrane_v_vec),
            "applied_current": [list(current_vec)],
            "intracellular_color_v": intracellular_color_v.tolist(),
            "extracellular_color_v": extracellular_color_v.tolist(),
            "timepoints": list(time_vec),
            "spike_times": list(spike_times),
            "threshold_v": list(threshold_v),
        }

        sys.stdout.write(json.dumps(simulation_results))