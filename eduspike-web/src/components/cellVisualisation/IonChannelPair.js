class IonChannelPair {
    constructor(channel, ions, canvasWidth, canvasHeight) {
        if (this.constructor === IonChannelPair) {
            throw new Error("Attempting to initialise abstract class: IonChannelPair");
        }

        // Determine x-bound for ion entry/exit into channel with padding
        let xPadding = 0.3  * channel.channelWidth;
        this.xLowerBound = channel.x + xPadding;
        this.xUpperBound = channel.x + channel.channelWidth - xPadding;

        this.yLowerBound = channel.y;
        this.yUpperBound = channel.y + channel.channelHeight;

        this.channel = channel;
        this.ions = ions;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        console.log(this.canvasHeight);
    }

    updateIonsMotion(locationX, locationY) {
        /* 
        Determine if ions need to move based on the following rules:
        1. Ions move towards channel if the correct gates are open by first
        getting into the right x-zone and then moving through the channel
        2. Ions are destroyed if they are below the screen with a new ion that
        comes in from the top
        3. If channel gate closes, incoming ions that are not
        close enough to the gate are diverted to stop above the channel
        */
    }

    isIonInXBounds(ion) {
        /*
        Returns an integer depending on the following cases:
        1. 0 if the ion is in x-bounds
        2. 1 if the ion is left of the channel
        3. -1 if the ion is right of the channel
        */
        if ((ion.x >= this.xLowerBound) && (ion.x <=  this.xUpperBound)) {
            return 0;
        } else if (ion.x >= this.xLowerBound) {
            return -1;
        } else {
            return 1;
        }
    }
    
    isIonInYBounds(ion) {
        if ((ion.y >= this.yLowerBound) && (ion.y <=  this.yUpperBound)) {
            return 0;
        } else if (ion.y >= this.yLowerBound) {
            return -1;
        } else {
            return 1;
        }
    }

    draw(p5Context) {
        // Draw channel
        this.channel.draw(p5Context);

        // Draw ions
        for (let ion of this.ions) {
            ion.draw(p5Context);
        }
    }
};

export default IonChannelPair;