import SodiumIon from "./SodiumIon";
import PotassiumIon from "./PotassiumIon";

class IonCollection {
    constructor(nSodiumIons, nPotassiumIons, nChlorineIons) {
        this.sodiumIons = [];
        this.potassiumIons = [];
        this.chlorineIons = [];

        for (let idx=0; idx < nSodiumIons; idx++) {
            let currentInstance = new SodiumIon([-200, 200], [-100, -50]);
            while (this.#checkInstanceOverlap(currentInstance) !== true) {
                currentInstance = new SodiumIon([-200, 200], [-100, -50]);
            }

            this.sodiumIons.push(currentInstance);
        }
        for (let idx=0; idx < nPotassiumIons; idx++) {
            this.potassiumIons.push(new PotassiumIon([-200, 200], [-100, -50]));
        }
        // for (let idx=0; idx < nChlorineIons; idx++) {
        //     sodiumIons[idx] = new SodiumIon([-100, 100], [-100, 0]);
        // }

    }

    #checkInstanceOverlap(ionInstance) {
        this.sodiumIons.forEach((existingIon) => {
            const padding = 4;
            const leftBound = existingIon.x - existingIon.ionSize - padding;
            const rightBound = existingIon.x + existingIon.ionSize + padding;

            const upperBound = existingIon.y + existingIon.ionSize + padding;
            const lowerBound = existingIon.y - existingIon.ionSize - padding;

            const isInValidXBounds = leftBound < ionInstance.x - ionInstance.ionSize < ionInstance.x + ionInstance.ionSize < rightBound;
            const isInValidYBounds = lowerBound < ionInstance.y - ionInstance.ionSize < ionInstance.y + ionInstance.ionSize < upperBound;
            if (!isInValidXBounds && !isInValidYBounds) {
                return false;
            }
        })

        return true;
    }

}

export default IonCollection;