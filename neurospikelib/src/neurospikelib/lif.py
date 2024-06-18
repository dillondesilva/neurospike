from .lif_output import LIFOutput

import numpy as np
import sys

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

class LIF:
    """
    Leaky Integrate and Fire Simulation Module for Neurospike. Provides
    LIF Model support for Neurospike simulation app
    """

    @staticmethod
    def visualize_custom_lif(membrane_v_vec, time_vec, current_vec, threshold_v=-55):
        '''
        Creates Neurospike compatible output based on values from custom 
        LIF model
        '''
        # Reformat as numpy lists
        membrane_v_vec = np.array(membrane_v_vec)
        time_vec = np.array(time_vec)
        current_vec = np.array(current_vec)

        # Create output instance
        simulation_output = LIFOutput()
        simulation_output.set_membrane_voltage(membrane_v_vec, threshold_v)
        simulation_output.set_timepoints(time_vec)
        simulation_output.set_injected_current(current_vec)
        sys.stdout.write(simulation_output.jsonify())
        sys.stdout.write('\n')

    @staticmethod
    def simulate(
        threshold_v=DEFAULT_THRESHOLD_VOLTAGE,
        resting_v=DEFAULT_RESTING_VOLTAGE,
        initial_v=DEFAULT_RESTING_VOLTAGE,
        v_reset=DEFAULT_RESTING_VOLTAGE,
        membrane_c=DEFAULT_MEMBRANE_CAPACITANCE,
        membrane_r=DEFAULT_MEMBRANE_RESISTANCE,
        simulation_duration=DEFAULT_SIMULATION_DURATION,
        resolution=DEFAULT_RESOLUTION,
        pulses=list()
    ):
        """
        Runs LIF model simulation given the following data:
            - Threshold voltage (mV)
            - Resting voltage (mV)
            - Membrane capacitance (Microfarads)
            - Membrane resistance (Ohms)
            - Pulses object
        """
        num_points = (simulation_duration * resolution)
        if num_points == 0:
            return [[], []]

        membrane_v_vec = np.zeros(num_points)
        membrane_v_vec[0] = initial_v
        dt = simulation_duration / num_points
        time_vec = np.linspace(0, simulation_duration, num_points)
        current_vec = np.zeros(len(time_vec))

        for pulse in pulses:
            pulse_start = pulse["start"]
            pulse_end = pulse["end"]
            pulse_amplitude = pulse["amp"]

            # Determining indices to apply pulse
            pulse_start_idx = pulse_start * resolution
            pulse_end_idx = pulse_end * resolution
            pulse_app_indices = [range(pulse_start_idx, pulse_end_idx)]
            pulse_vec = np.zeros(len(pulse_app_indices))
            pulse_vec.fill(pulse_amplitude)
            np.put(current_vec, pulse_app_indices, pulse_vec)

        # Determining time constant
        tau = membrane_r * membrane_c
        spike_times = np.empty(shape=(1,))
        v_peak = threshold_v + 80

        # Forward Euler solver
        for i in range(len(membrane_v_vec) - 1):
            membrane_v_vec[i + 1] = ((dt/tau) * ((resting_v - membrane_v_vec[i]) + (membrane_r * current_vec[i]))) + membrane_v_vec[i]
            # Handle spiking
            if membrane_v_vec[i+1] >= threshold_v:
                np.append(spike_times, time_vec[i])
                membrane_v_vec[i] = v_peak
                membrane_v_vec[i + 1] = v_reset

        # Create output instance
        # simulation_output = LIFOutput()
        # simulation_output.set_membrane_voltage(membrane_v_vec, threshold_v)
        # simulation_output.set_timepoints(time_vec)
        # simulation_output.set_injected_current(current_vec)
        # simulation_output.set_spike_times(spike_times)
        # sys.stdout.write(simulation_output.jsonify())
        # sys.stdout.write('\n')
        return [membrane_v_vec, time_vec]
