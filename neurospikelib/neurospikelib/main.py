from lif import LIFSimulation
import matplotlib.pyplot as plt
if __name__ == "__main__":
    # Run sample LIF simulation
    neuron_parameters = {
        "length": 100,
        "diam": 20,
        "resting_v": -70
    }

    stimulation_parameters = {
        "duration": 40,
        "amplitude": 10,
        "t_start": 30                
    }

    lif_simulation_a = LIFSimulation(stimulation_parameters, neuron_parameters, 100)
    simulation_data = lif_simulation_a.simulate()