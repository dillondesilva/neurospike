import json

import numpy as np

RGB_WHITE = (255, 255, 255)
RGB_OFF_WHITE = (240, 240, 240)
DEFAULT_RGB_RESTING_POTENTIAL = (2, 0, 121)
DEFAULT_RGB_THRESHOLD_POTENTIAL = (4, 217, 255)

class HHOutput:
    """
    Formatting of simulation output for LIF model
    """

    def __init__(self):
        self.simulation_type = "hh"
        self.simulation_title = "Hodgkin-Huxley Ion Currents and AP"

        self.data = {
            "membrane_voltage": list(),
            "timepoints": list(),
            "injected_current": list(),
            "na_current": list(),
            "k_current": list(),
            "leak_current": list(),
            "n": list(),
            "m": list(),
            "h": list(),
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
        ic_final_color=(132, 215, 206), 
        ec_final_color=(238, 129, 238), 
        membrane_initial_color=DEFAULT_RGB_RESTING_POTENTIAL, 
        threshold_color=DEFAULT_RGB_THRESHOLD_POTENTIAL,
    ):
        """Calculate colors to create visualization for LIF simulation"""

        # Determining change in membrane color
        membrane_color_v = np.array(membrane_initial_color)
        threshold_color_v = np.array(threshold_color)
        membrane_color_dist = (threshold_color_v - membrane_color_v)[np.newaxis]

        # Setting color vectors for IC and EC visuals
        ic_initial_color_v = np.array(ic_initial_color)
        ec_initial_color_v = np.array(ec_initial_color)
        ic_final_color_v = np.array(ic_final_color)
        ec_final_color_v = np.array(ec_final_color)

        # Calculate distance vector between initial/final IC and EC colors
        ic_color_distance = (ic_final_color_v - ic_initial_color)[np.newaxis]
        ec_color_distance = (ec_final_color_v - ec_initial_color)[np.newaxis]

        # color_time_v = color_distance * normalized_v_data
        membrane_color_time_v = membrane_color_dist * normalized_v_data
        membrane_color = membrane_color_v + membrane_color_time_v

        ic_color_v = ic_initial_color_v + (ic_color_distance * normalized_v_data)
        ec_color_v = ec_initial_color_v + (ec_color_distance * normalized_v_data)

        for i in range(len(normalized_v_data)):
            if membrane_voltage[i] >= threshold_v:
                membrane_color[i] = RGB_WHITE
                ic_color_v[i] = RGB_WHITE
                ec_color_v[i] = RGB_WHITE

        # intracellular_color_v = base_color_v + color_time_v
        # extracellular_color_v = final_color_v - color_time_v

        return (ic_color_v, ec_color_v, membrane_color)

    def jsonify(self):
        """
        Produces JSON dump of output instance
        """
        return json.dumps(self.__dict__)
