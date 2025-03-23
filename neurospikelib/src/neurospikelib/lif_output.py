import json

import numpy as np

RGB_WHITE = (255, 255, 255)
RGB_OFF_WHITE = (240, 240, 240)
DEFAULT_RGB_RESTING_POTENTIAL = (214, 96, 77)
DEFAULT_RGB_THRESHOLD_POTENTIAL = (4, 217, 255)

class LIFOutput:
    """
    Formatting of simulation output for LIF model
    """

    def __init__(self):
        self.simulation_type = "lif"
        self.simulation_title = "LIF Model Membrane Voltage vs Time"

        self.data = {
            "membrane_voltage": list(),
            "timepoints": list(),
            "injected_current": list(),
            "spike_times": list()
        }

        self.visualization = {
            "intracellular_color_v": list(),
            "extracellular_color_v": list(),
            "membrane_color_v": list(),
        }

    def set_membrane_voltage(self, membrane_voltage, threshold_v=-55):
        """
        Set membrane voltage for LIFOutput and corresponding visualization
        """
        reshaped_membrane_voltage = np.reshape(
            membrane_voltage, (len(membrane_voltage), 1)
        )

        min_v = np.min(list(membrane_voltage))
        normalized_v_data = (reshaped_membrane_voltage - min_v) / (threshold_v - min_v)

        intracellular_color_v, extracellular_color_v, membrane_color_v = self._create_visualization_data(
            membrane_voltage, normalized_v_data, threshold_v
        )

        self.data["membrane_voltage"] = membrane_voltage.tolist()
        self.visualization["intracellular_color_v"] = intracellular_color_v.tolist()
        self.visualization["extracellular_color_v"] = extracellular_color_v.tolist()
        self.visualization["membrane_color_v"] = membrane_color_v.tolist()

    def set_timepoints(self, timepoints):
        """
        Set timepoints for LIFOutput
        """
        self.data["timepoints"] = timepoints.tolist()

    def set_injected_current(self, injected_current):
        """
        Set current injection vector for LIFOutput
        """
        self.data["injected_current"] = injected_current.tolist()
    
    def set_spike_times(self, spike_times):
        """
        Set spike times for LIF
        """
        self.data["spike_times"] = spike_times.tolist()

    def _create_visualization_data(
        self, membrane_voltage, normalized_v_data, threshold_v, 
        ic_initial_color=RGB_WHITE, ec_initial_color=RGB_WHITE,
        ic_final_color=(178, 24, 43), 
        ec_final_color=(33, 102, 172), 
        membrane_initial_color=DEFAULT_RGB_RESTING_POTENTIAL, 
        threshold_color=DEFAULT_RGB_THRESHOLD_POTENTIAL,
    ):
        """Calculate colors to create visualization for LIF simulation"""

        # Determining change in membrane color
        membrane_color_v = np.array(membrane_initial_color) * np.ones_like(normalized_v_data)
        # threshold_color_v = np.array(threshold_color)
        # membrane_color_dist = (threshold_color_v - membrane_color_v)[np.newaxis]

        # Setting color vectors for IC and EC visuals. EC should not change
        ic_initial_color_v = np.array(ic_initial_color)
        ic_final_color_v = np.array(ic_final_color)

        # Calculate distance vector between initial/final IC and EC colors
        ic_color_distance = (ic_final_color_v - ic_initial_color)[np.newaxis]

        membrane_color = membrane_color_v

        ic_color_v = ic_initial_color_v + (ic_color_distance * normalized_v_data)
        ec_color_v = np.array(ec_initial_color) * np.ones_like(normalized_v_data)

        for i in range(len(normalized_v_data)):
            if membrane_voltage[i] >= threshold_v:
                ic_color_v[i] = ic_final_color

        return (ic_color_v, ec_color_v, membrane_color)

    def jsonify(self):
        """
        Produces JSON dump of output instance
        """
        return json.dumps(self.__dict__)
