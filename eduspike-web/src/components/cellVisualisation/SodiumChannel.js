import Channel from "./Channel";
import Gate from "./Gate";

class SodiumChannel extends Channel {
    constructor(initialX, initialY, channelWidth, channelHeight) {
        super(initialX, initialY, channelWidth, channelHeight, "#1010ff");

        this.activationGate = new Gate(initialX, initialY, channelWidth);

        let inactivationGateOffsetY = channelHeight / 2;
        this.inactivationGate = new Gate(initialX, initialY + inactivationGateOffsetY, 
            channelWidth);
        console.log(this.activationGate);
        this.gates.push(this.activationGate);
        this.gates.push(this.inactivationGate);
    }

    triggerActivationGate() {
        this.activationGate.triggerGate();
    }
    
    triggerInactivationGate() {
        this.inactivationGate.triggerGate();
    }
}

export default SodiumChannel;