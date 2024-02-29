import numpy as np

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

DEFAULT_A = 0
DEFAULT_B = 5 # Adaptation current (pA)
DEFAULT_SHARPNESS = 1

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
        a=DEFAULT_A,
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
        
        pass