# Original Author: Robert Rosenbaum
# Description: This is a modified file of a leaky integrator
# to determine whether LIF models are correctly visualized
# Original Source: https://github.com/RobertRosenbaum/ModelingNeuralCircuits/blob/main/CodeFromBook/LeakyIntegrator.ipynb

###############################################
## Import packages and specify some settings ##
###############################################
# Import packages
from neurospikelib.lif import visualize_custom_lif
import numpy as np

###############################################
###############################################

# Discretized time
T=600 
dt=1 
time=np.arange(0,T,dt) 

# Neuron parameters
EL=-72 
taum=15 

# Initial condition
V0=-70 

# Time-constant input current
I0=4

# Compute V 
V=(V0-EL-I0)*np.exp(-time/taum)+EL+I0

# Porting to Neurospike
current = np.zeros(len(time))
current.fill(I0)
visualize_custom_lif(V, time.tolist(), current)