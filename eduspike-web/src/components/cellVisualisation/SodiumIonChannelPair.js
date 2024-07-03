import IonChannelPair from "./IonChannelPair";

class SodiumIonChannelPair extends IonChannelPair {
    // constructor(naChannel, naIons) {
    //     super(naChannel, naIons);
    // }

    isAtChannelExit(ion) {
        if (ion.y > this.yUpperBound) {
            return true;
        }

        return false;
    }

    handleIonsMotion() {
        const activationState = this.channel.isActivationOpen();
        const inactivationState = this.channel.isInactivationOpen();
        if (activationState && inactivationState) {
            for (let ion of this.ions) {
                if (this.isIonInXBounds(ion) !== 0 && ion.inScene) {
                    // Maintain a velocity towards xBounds
                    ion.updateVelocity(3 * this.isIonInXBounds(ion), 0);
                } else if (this.isIonInYBounds(ion) !== 0 && ion.inScene) {
                    // Gradually decrease x-velocity and increase y-velocity
                    ion.updateVelocity(0, 4);
                }
            }
        } else if (!inactivationState && activationState) {
            // Send ions out of zone and otherwise halt there motion
            for (let ion of this.ions) {
                if (this.isIonInYBounds(ion) === 0 && this.isIonInXBounds(ion) === 0
                    && ion.y <= this.channel.inactivationGate.y) {
                    ion.updateVelocity(0, -4);
                } else if (ion.y <= this.channel.y - 30) {
                    ion.updateVelocity(0, 0); 
                } 
            }
        } else {
            // Ensure ion motion is continued
            for (let ion of this.ions) {
                if (this.isIonInYBounds(ion) !== 0 && this.isIonInXBounds(ion) !== 0) {
                    ion.updateVelocity(0, 0);
                }
            }
        }

        // Check if they have exited channel
        for (let ion of this.ions) {
            if (ion.y > this.canvasHeight / 2) {
                ion.y = ion.originY;
                ion.x = ion.originX;
                ion.updateVelocity(0, 0);
            }
        }

        // Final updates to motion
        for (let ion of this.ions) {
            ion.move();
        }
    }
}

export default SodiumIonChannelPair;