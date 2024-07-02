class Channel {
    constructor(initialX, initialY, channelWidth, channelHeight,
        channelColor
    ) {
        if (this.constructor === Channel) {
            throw new Error("Attempting to initialise abstract class: Channel");
        }

        this.x = initialX;
        this.y = initialY;
        this.channelWidth = channelWidth;
        this.channelHeight = channelHeight;

        this.channelColor = channelColor;
        this.gates = [];
    }

    updateGates() {
        for (let gate of this.gates) {
            gate.updateGateState();
        }
    }

    draw(p5Context) {
        p5Context.push();
        p5Context.noStroke();
        p5Context.fill(this.channelColor);

        for (let gate of this.gates) {
            gate.draw(p5Context);
        }
        
        p5Context.rect(this.x, this.y, 10, this.channelHeight);
        p5Context.rect(this.x + this.channelWidth, this.y, 10, this.channelHeight);

        p5Context.pop();
    }
};

export default Channel;
