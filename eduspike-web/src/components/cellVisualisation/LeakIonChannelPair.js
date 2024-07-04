import IonChannelPair from "./IonChannelPair";

class LeakIonChannelPair extends IonChannelPair {

    isAtChannelExit(ion) {
        if (ion.y > this.yUpperBound) {
            return true;
        }

        return false;
    }

    handleIonsMotion() {
        for (let ion of this.ions) {
            if (this.isIonInXBounds(ion) !== 0 && ion.inScene) {
                // Maintain a velocity towards xBounds
                ion.updateVelocity(0.75 * this.isIonInXBounds(ion), 0);
            } else if (this.isIonInYBounds(ion) !== 0 && ion.inScene) {
                // Gradually decrease x-velocity and increase y-velocity
                ion.updateVelocity(0, 0.75);
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

export default LeakIonChannelPair;