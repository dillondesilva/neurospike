# Neurospikelib

Neurospikelib is a simple and evolving neural computation library. It is utilised by applications we develop and can also be used
as a standalone Python library. 

## 🔮 Roadmap
Our current API only supports simulating LIF (Leaky Integrate-and-Fire) models. Future neuron models we are developing throughout 2024 include:
* EIF (Exponential Integrate-and-Fire)
* Hodgkin-Huxley
* AdEx (Adaptive Exponential Integrate-and-Fire)
* Izhikevich Model

## 💿 Installation

Neurospikelib requires Python >= 3.8 for usage. Installation can be run using either `pip install neurospikelib` or `pip3 install neurospikelib` from 25th January 2024 onwards.

Alternatively, wheels/compressed files for the library can be downloaded from our GitHub Releases page.

## 🧠 API

### Spiking Neuron Models

Biological neurons that form neural tissue inside of living beings are one of the most fascinating types of cells. When their surrounding environments experience sufficient change, they are capable of initiating an electrical impulse (also referred to as a spike) that can be propagated to local neurons. This phenomenon forms the basis for all actions controlled by the nervous system such as breathing, cognitive function and movement.

Spiking neuron models use mathematics to describe the nature of these spikes. They form the basis of computational neuroscience.
______
### LIF.simulate(threshold_v=DEFAULT_THRESHOLD_VOLTAGE, resting_v=DEFAULT_RESTING_VOLTAGE, membrane_c=DEFAULT_MEMBRANE_CAPACITANCE, membrane_r=DEFAULT_MEMBRANE_RESISTANCE, simulation_duration=DEFAULT_SIMULATION_DURATION, resolution=DEFAULT_RESOLUTION, pulses=list())

Module for simulation of LIF neurons. An example of how to use this is the following:
```python
from neurospikelib.lif import LIF

LIF.simulate(pulses=[{
    "start": 10,
    "end": 20,
    "amp": 3
}, {
    "start": 40,
    "end": 80,
    "amp": 5
}], membrane_c=1, membrane_r=4, resolution=1)
```

| Parameter    |    Type  |  Description  |
| --- | --- | ----- |
|  **threshold_v**  |  int   | fefefefefefefe |
|  **resting_v**  |  int   | fefefefefefefe |
|  **membrane_c**  |  int   | fefefefefefefe |
|  **membrane_r**  |  int   | fefefefefefefe |
|  **simulation_duration**  |  int   | fefefefefefefe |
|  **resolution**  |  int   | fefefefefefefe |
|  **pulses**  |  List[Pulse]   | fefefefefefefe |




