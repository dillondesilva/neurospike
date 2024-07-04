class Gate {
    constructor(initialX, initialY, channelWidth, initialGateWidth=0, initialGateHeight=10) {
        this.x = initialX;
        this.y = initialY;
        this.isOpen = true;
        this.channelWidth = channelWidth;
        this.gateWidth = initialGateWidth;
        this.gateHeight = initialGateHeight;

        this.rate = 2; // How many pixels gate opens/closes
        // by per frame where this.isOpen is active
    }

    triggerGate() {
        this.isOpen = !this.isOpen;    
    }

    updateGateState() {
        if (this.gateWidth < this.channelWidth / 2 && !this.isOpen) {
            this.gateWidth += this.rate;
        } else if (this.gateWidth > 0 && this.isOpen) {
            this.gateWidth -= this.rate;
        }
    }

    draw(p5Context) {
        p5Context.push();
        p5Context.noStroke();
        p5Context.fill(240, 5, 10);

        // Draw left side of gate
        p5Context.rect(this.x, this.y, this.gateWidth, this.gateHeight);

        // Draw right side of gate
        p5Context.rect(this.x + this.channelWidth, this.y, -this.gateWidth, this.gateHeight);

        p5Context.pop();
    }
};

export default Gate;
