import Channel from "./Channel";
import Gate from "./Gate";

class PotassiumChannel extends Channel {
    constructor(initialX, initialY, channelWidth, channelHeight) {
        super(initialX, initialY, channelWidth, channelHeight, "#afff04");

        this.activationGate = new Gate(initialX, initialY, channelWidth);
        console.log(this.activationGate);
        this.gates.push(this.activationGate);
    }

    triggerActivationGate() {
        this.activationGate.triggerGate();
    }

    isActivationOpen() {
        return this.activationGate.isOpen;
    }
}

export default PotassiumChannel;