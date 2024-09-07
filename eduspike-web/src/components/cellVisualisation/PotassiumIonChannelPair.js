import IonChannelPair from "./IonChannelPair";

class PotassiumIonChannelPair extends IonChannelPair {
    // constructor(naChannel, naIons) {
    //     super(naChannel, naIons);
    // }

    isAtChannelExit(ion) {
        if (ion.y < this.yLowerBound) {
            return true;
        }

        return false;
    }

    handleIonsMotion() {
        const activationState = this.channel.isActivationOpen();
        if (activationState) {
            for (let ion of this.ions) {
                if (this.isIonInXBounds(ion) !== 0 && ion.inScene) {
                    // Maintain a velocity towards xBounds
                    ion.updateVelocity(3 * this.isIonInXBounds(ion), 0);
                } else if (this.isIonInYBounds(ion) !== 0 && ion.inScene) {
                    // Decrease x-velocity and increase y-velocity
                    ion.updateVelocity(0, -4);
                }
            }
        } else {
            // Ensure ion motion is continued
            for (let ion of this.ions) {
                if (this.isIonInXBounds(ion) === 0 && 
                (ion.y < (this.channel.activationGate.y) && ion.y > (this.channel.activationGate.y) + 30)) {
                    ion.updateVelocity(0, 4);
                } else if (ion.y > this.channel.activationGate.y + 100) {
                    ion.updateVelocity(0, 0);
                }
            }
        }

        // Check if they have exited channel
        for (let ion of this.ions) {
            if (ion.y < -(this.canvasHeight / 2)) {
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

export default PotassiumIonChannelPair;