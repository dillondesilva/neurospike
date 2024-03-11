from lif_output import LIFOutput

import numpy as np
import sys

DEFAULT_NUM_TIMEPOINTS = 101
DEFAULT_NUM_VOLTAGE_POINTS = 101

# Default voltages are in mV
DEFAULT_THRESHOLD_VOLTAGE = -55
DEFAULT_RESTING_VOLTAGE = -65
DEFAULT_RESET_VOLTAGE = -70

# Capacitance and Ohms in microfarads and ohms respectively
DEFAULT_MEMBRANE_CAPACITANCE = 2
DEFAULT_MEMBRANE_RESISTANCE = 4

# Simulation duration in ms
DEFAULT_SIMULATION_DURATION = 100
DEFAULT_RESOLUTION = 10

DEFAULT_A = 0
DEFAULT_B = 5 # Adaptation current (pA)
DEFAULT_SHARPNESS = 2 # Sharpness parameter in (mV)
DEFAULT_TAU_W = 100 # Time constant for adaptation current (ms)

class AdEx:
    """
    Adaptive Expontential Integrate and Fire Simulation Module 
    for Neurospike to model spike adaptation in neurons
    """
    @staticmethod
    def simulate(
        threshold_v=DEFAULT_THRESHOLD_VOLTAGE,
        resting_v=DEFAULT_RESTING_VOLTAGE,
        membrane_c=DEFAULT_MEMBRANE_CAPACITANCE,
        membrane_r=DEFAULT_MEMBRANE_RESISTANCE,
        sharpness=DEFAULT_SHARPNESS,
        v_reset=DEFAULT_RESET_VOLTAGE,
        a=DEFAULT_A,
        b=DEFAULT_B,
        tau_w=DEFAULT_TAU_W,
        simulation_duration=DEFAULT_SIMULATION_DURATION,
        resolution=DEFAULT_RESOLUTION,
        pulses=[]
    ):
        """
        Runs Forward-Euler solver for AdEx model from given inputs
        """
        num_points = simulation_duration * resolution
        current_vec = np.zeros(num_points)
        membrane_v_vec = np.zeros(num_points)
        membrane_v_vec[0] = resting_v
        w = np.zeros(num_points)
        dt = (simulation_duration / (num_points - 1))
        time_vec = np.linspace(0, simulation_duration, num_points)
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

        tau_m = membrane_r * membrane_c
        # Forward Euler solver
        for i in range(len(membrane_v_vec) - 1):
            alpha = (membrane_v_vec[i] - threshold_v) / sharpness
            beta = -a * (membrane_v_vec[i] - resting_v)
            exp_term = sharpness * np.exp(alpha)
            w[i + 1] = ((dt / tau_w) * (-w[i] + (-beta))) + w[i]
            membrane_v_vec[i + 1] = ((dt/tau_m) * ((resting_v - membrane_v_vec[i]) + (exp_term) + (membrane_r * current_vec[i]) + ((w[i+1] - w[i]) / dt * tau_w) + beta)) + membrane_v_vec[i]
            
            # Handle spiking
            if membrane_v_vec[i+1] >= threshold_v:
                membrane_v_vec[i + 1] = v_reset
                membrane_v_vec[i] = threshold_v
                w[i+1] = w[i+1] + b
        
        # Create output instance
        simulation_output = LIFOutput()
        simulation_output.set_membrane_voltage(membrane_v_vec, threshold_v)
        simulation_output.set_timepoints(time_vec)
        simulation_output.set_injected_current(current_vec)
        print(sys.getsizeof(simulation_output.jsonify()))
        # sys.stdout.write(simulation_output.jsonify())
        # sys.stdout.write('\n')
