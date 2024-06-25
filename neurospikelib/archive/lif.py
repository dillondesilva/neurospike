import numpy as np 
import sys
import json

DEFAULT_NUM_TIMEPOINTS = 101
DEFAULT_NUM_VOLTAGE_POINTS = 101

def visualize_custom_lif(membrane_v, timepoints, step_current):
    # Getting color visualization
    membrane_v = list(membrane_v)
    timepoints = list(timepoints)

    min_v = np.min(membrane_v)
    max_v = np.max(membrane_v)
    reshaped_membrane_v = np.reshape(membrane_v, (len(membrane_v), 1))
    normalized_v_data = ((reshaped_membrane_v - min_v) / (max_v - min_v))

    intracellular_color_v, extracellular_color_v = LIFSimulation.create_visualization_data(normalized_v_data)
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
        "stim_pulse_train": list(stim_pulse_train)
    }

    sys.stdout.write(json.dumps(simulation_results))

class LIFSimulation:
    '''
    Leaky Integrate and Fire Simulation Module for Neurospike. Operates
    as a wrapper around brian2 and neurodynex3 libraries to provide
    LIF Model support for Neurospike simulation app
    '''
    def __init__(self, stimulation_parameters, neuron_parameters, simulation_duration):
        '''Instantiates a new LIF Simulation with given parameters'''
        self._stimulation_parameters = stimulation_parameters
        self._neuron_parameters = neuron_parameters
        self._simulation_duration = simulation_duration
        h.load_file("stdrun.hoc")

    def __normalize_time_series(self, time_series):
        '''Normalizes a given time series. Used for color assignment algorithm'''
        normalized_values = expit(time_series)
        return normalized_values

    @staticmethod
    def create_visualization_data(normalized_v_data, base_color=(132, 215, 206), final_color=(238,129,238)):
        '''Calculate colors to create visualization for LIF simulation'''
        base_color_v = np.array(base_color)
        final_color_v = np.array(final_color)

        color_distance = (final_color_v - base_color_v)[np.newaxis]

        color_time_v = color_distance * normalized_v_data
        intracellular_color_v = base_color_v + color_time_v
        extracellular_color_v = final_color_v - color_time_v

        return (intracellular_color_v, extracellular_color_v)
    
    def simulate(self):
        '''Runs LIF model simulation by given parameters'''
        # Initialize time vector and membrane voltage vector
        # Create soma-only neuron model with passive
        # leak channels for membrane
        soma = h.Section(name="soma")
        soma.insert("pas")
        soma.L = self._neuron_parameters["length"]
        soma.diam = self._neuron_parameters["diam"]

        # Create step current from input parameters
        stim = h.IClamp(soma(0.5))
        stim.dur = self._stimulation_parameters["duration"]
        stim.amp = self._stimulation_parameters["amplitude"]
        stim.delay = self._stimulation_parameters["t_start"]
        soma_v = h.Vector().record(soma(0.5)._ref_v)
        time = h.Vector().record(h._ref_t)

        # Run simulation
        h.dt = 1 * ms
        resting_membrane_potential = self._neuron_parameters["resting_v"] * mV
        simulation_duration = self._simulation_duration * ms
        h.finitialize(resting_membrane_potential)
        h.continuerun(simulation_duration)

        reshaped_soma_v = np.reshape(soma_v, (len(soma_v), 1))

        # Getting color visualization
        min_v = np.min(list(soma_v))
        max_v = np.max(list(soma_v))

        normalized_v_data = ((reshaped_soma_v - min_v) / (max_v - min_v))
        intracellular_color_v, extracellular_color_v = LIFSimulation.create_visualization_data(normalized_v_data)

        # Pulse train for stimulation
        stim_pulse_train = []
        stim_end_time = self._stimulation_parameters["duration"] + self._stimulation_parameters["t_start"]
        stim_start_time = self._stimulation_parameters["t_start"]
        for tp in time:
            if tp < stim_end_time and tp > stim_start_time:
                stim_pulse_train.append(1)
            else:
                stim_pulse_train.append(0)

        simulation_results = {
            "membrane_voltage": list(soma_v),
            "intracellular_color_v": intracellular_color_v.tolist(),
            "extracellular_color_v": extracellular_color_v.tolist(),
            "timepoints": list(time),
            "stim_pulse_train": list(stim_pulse_train)
        }

        sys.stdout.write(json.dumps(simulation_results))