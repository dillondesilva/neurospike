import numpy as np
import json

class LIFOutput:
    '''
    Formatting of simulation output for LIF model
    '''
    def __init__(self):
        self.simulation_type = "lif"
        self.simulation_title = "LIF Model Membrane Voltage vs Time"

        self._data = {
            "membrane_voltage": list(),
            "timepoints": list(),
            "injected_current": list()
        }

        self._visualization = {
            "intracellular_color_v": list(),
            "extracellular_color_v": list()
        }

    def set_membrane_voltage(self, membrane_voltage):
        '''
        Set membrane voltage for LIFOutput and corresponding visualization
        '''
        reshaped_membrane_voltage = np.reshape(membrane_voltage, (len(membrane_voltage), 1))
        
        max_v = np.max(list(membrane_voltage))
        min_v = np.min(list(membrane_voltage))

        normalized_v_data = ((reshaped_membrane_voltage - min_v) / (max_v - min_v))
        intracellular_color_v, extracellular_color_v = self._create_visualization_data(normalized_v_data)
        
        self._data["membrane_voltage"] = membrane_voltage.tolist()
        self._visualization["intracellular_color_v"] = intracellular_color_v.tolist()
        self._visualization["extracellular_color_v"] = extracellular_color_v.tolist()
  
    def set_timepoints(self, timepoints):
        '''
        Set timepoints for LIFOutput
        '''
        self._data["timepoints"] = timepoints.tolist()

    def set_injected_current(self, injected_current):
        '''
        Set current injection vector for LIFOutput
        '''
        self._data["injected_current"] = injected_current.tolist()

    def _create_visualization_data(
        self, normalized_v_data, base_color=(132, 215, 206), final_color=(238, 129, 238)
    ):
        """Calculate colors to create visualization for LIF simulation"""
        base_color_v = np.array(base_color)
        final_color_v = np.array(final_color)

        color_distance = (final_color_v - base_color_v)[np.newaxis]

        color_time_v = color_distance * normalized_v_data
        intracellular_color_v = base_color_v + color_time_v
        extracellular_color_v = final_color_v - color_time_v

        return (intracellular_color_v, extracellular_color_v)

    def jsonify(self):
        '''
        Produces JSON dump of output instance
        '''
        return json.dumps(self.__dict__)
