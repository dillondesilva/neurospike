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

### neurospikelib.lif

Module for simulation of LIF neurons. To run this:

`LIF.simulate()`



