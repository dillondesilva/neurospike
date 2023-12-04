class LIFOutput:
    '''
    Formatting of simulation output for LIF model
    '''
    def __init__(self):
        self._simulation_type = "lif"
        self._simulation_title = "LIF Model Membrane Voltage vs Time"

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
        Set membrane voltage for LIFOutput
        '''
        self._data["membrane_voltage"] = list(membrane_voltage)
  
    def set_timepoints(self, timepoints):
        '''
        Set timepoints for LIFOutput
        '''
        self._data["timepoints"] = list(timepoints)

    def set_injected_current(self, injected_current):
        '''
        Set current injection vector for LIFOutput
        '''
        self._data["injected_current"] = list(injected_current)
    
    def set_visualization(self, intracellular_color_v, extracellular_color_v):
        '''
        Set visualization properties for LIFOutput
        '''
        self._visualization["intracellular_color_v"] = list(intracellular_color_v)
        self._visualization["extracellular_color_v"] = list(extracellular_color_v)
