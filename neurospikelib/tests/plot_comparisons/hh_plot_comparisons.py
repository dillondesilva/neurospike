###############################################
## Import packages and specify some settings ##
###############################################
# Import packages
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# This makes plots show up and look nice
#matplotlib inline
sns.set(context='paper',style='white',font_scale=1.5,rc={"lines.linewidth":2.5})
sns.set_palette('muted')

###############################################
###############################################



# Discretized time
T=30
dt=.01
time=np.arange(0,T,dt)

# Initialize applied current
Ix=np.zeros_like(time)

# Add smooth step input
from scipy.stats import norm
StepStrength=20
StepTime=13
StepWidth=1
Ix=Ix+StepStrength*norm.cdf(time,StepTime,StepWidth)


# # Add pulsatile input in the form of a Gaussian
# PulseWidth=1.5 # Width of pulse in ms
# PulseTime=10  # Pulse time
# PulseStrength=10  # Pulse strength
# Ix=Ix+PulseStrength*np.exp(-(time-PulseTime)**2/(2*PulseWidth**2))



# Define gating variables as inline functions
alphan = lambda V: .01*(V+55)/(1-np.exp(-.1*(V+55)))
betan = lambda V: .125*np.exp(-.0125*(V+65))
alpham = lambda V: .1*(V+40)/(1-np.exp(-.1*(V+40)))
betam = lambda V: 4*np.exp(-.0556*(V+65))
alphah = lambda V: .07*np.exp(-.05*(V+65))
betah = lambda V: 1/(1+np.exp(-.1*(V+35)))


# n variable
ninfty= lambda V: (alphan(V)/(alphan(V)+betan(V)))
taun= lambda V: (1/(alphan(V)+betan(V)))
minfty= lambda V: (alpham(V)/(alpham(V)+betam(V)))
taum= lambda V: (1/(alpham(V)+betam(V)))
hinfty= lambda V: (alphah(V)/(alphah(V)+betah(V)))
tauh= lambda V: (1/(alphah(V)+betah(V)))

# Parameters
Cm=1
gL=.3
EL=-54.387
gK=36
EK=-77
gNa=120
ENa=50

# Initial conditions near their fixed points when Ix=0
V0=-65.0
n0=ninfty(V0)
m0=minfty(V0)
h0=hinfty(V0)


# Currents
IL= lambda V: (-gL*(V-EL))
IK = lambda n,V: (-gK*n **4*(V-EK))
INa = lambda m,h,V: (-gNa*m **3*h*(V-ENa))

# Toal ion currents
Iion = lambda n,m,h,V: IL(V)+IK(n,V)+INa(m,h,V)

# Euler solver
V=np.zeros_like(time)
n=np.zeros_like(time)
m=np.zeros_like(time)
h=np.zeros_like(time)
V[0]=V0
n[0]=n0
m[0]=m0
h[0]=h0
for i in range(len(time)-1):
    # Update gating variables
    n[i+1]=n[i]+dt*((1-n[i])*alphan(V[i])-n[i]*betan(V[i]))
    m[i+1]=m[i]+dt*((1-m[i])*alpham(V[i])-m[i]*betam(V[i]))
    h[i+1]=h[i]+dt*((1-h[i])*alphah(V[i])-h[i]*betah(V[i]))

    # Update membrane potential
    V[i+1]=V[i]+dt*(Iion(n[i],m[i],h[i],V[i])+Ix[i])/Cm


# Now run neurospikelib HH model with same stimulation
from neurospikelib.hh import HHModel

pulses = [{
    "start": 13,
    "end": 30,
    "amp": 20
}]

sim_out = HHModel.simulate(simulation_duration=30, pulses=pulses, resolution=10)

# Make figure
sim_t = sim_out.data["timepoints"]
plt.subplots(1,3,figsize=(13,5.25))


# Membrane potential for plotting
# Vplot=np.arange(-100,0,.1)

# plt.subplot(2,3,1)
# plt.plot(Vplot,ninfty(Vplot),label=r'$n_\infty$')
# plt.plot(Vplot,minfty(Vplot),label=r'$m_\infty$')
# plt.plot(Vplot,hinfty(Vplot),label=r'$h_\infty$')
# plt.legend()
# plt.xlabel('V (mV)')
# plt.ylabel('gating variable')
# plt.title('A',loc='left')
# sns.despine()


# plt.subplot(2,3,4)
# plt.plot(Vplot,taun(Vplot),label=r'$\tau_n$')
# plt.plot(Vplot,taum(Vplot),label=r'$\tau_m$')
# plt.plot(Vplot,tauh(Vplot),label=r'$\tau_h$')
# plt.legend()
# plt.xlabel('V (mV)')
# plt.ylabel('timescale (ms)')
# plt.title('B',loc='left')
# sns.despine()



plt.subplot(1,3,1)
sim_i = sim_out.data["injected_current"]
sim_v = np.array(sim_out.data["membrane_voltage"])

plt.plot(time,Ix,'m',label=r'R, $I_{x}$')
plt.plot(sim_t, sim_i,label=r'N, $I_{x}$')
plt.ylabel(r'$I_{x}$')
plt.title('C',loc='left')
plt.legend(loc='upper left')
sns.despine()


# plt.subplot(2,3,5)
# plt.plot(time,n**4,label=r'$n^4$')
# plt.plot(time,m**3,label=r'$m^3$')
# plt.plot(time,h,label=r'$h$')
# plt.plot(time,(m**3)*h,label=r'$m^3h$')
# plt.legend(loc='upper left')
# plt.ylabel('open probability')
# plt.xlabel('time (ms)')
# plt.ylim(bottom=0)
# plt.title('D',loc='left')
# sns.despine()

plt.subplot(1,3,2)

sim_n = np.array(sim_out.data["n"])
sim_m = np.array(sim_out.data["m"])
sim_h = np.array(sim_out.data["h"])

plt.plot(time,IK(n,V),label=r'R, $I_K$')
plt.plot(time,INa(m,h,V),label=r'R, $I_{Na}$')

plt.plot(time,IK(sim_n,V),label=r'N, $I_K$')
plt.plot(time,INa(sim_m,sim_h,V),label=r'N, $I_{Na}$')


plt.legend(loc='upper left')
plt.ylabel('current')
plt.title('E',loc='left')
sns.despine()


plt.subplot(1,3,3)

v = sim_out.data["membrane_voltage"]
plt.plot(time,V,color=sns.color_palette()[7], label=r'R, $V_{m}$')
plt.plot(sim_out.data["timepoints"], v, label=r'N, $V_{m}$')
plt.ylabel('V (mV)')
plt.xlabel('time (ms)')
plt.axis([0,T,np.min((-70,np.min(V), np.min(v))),np.max((-57,np.max(V),np.max(v)))])
plt.title('F',loc='left')
plt.legend(loc='upper left')
sns.despine()

plt.tight_layout()
plt.show()