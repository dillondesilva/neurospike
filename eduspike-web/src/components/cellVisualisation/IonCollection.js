import SodiumIon from "./SodiumIon";
import PotassiumIon from "./PotassiumIon";
import LeakIon from "./LeakIon";

class IonCollection {
    constructor(nSodiumIons, nPotassiumIons, nLeakIons) {
        this.sodiumIons = [];
        this.potassiumIons = [];
        this.leakIons = [];

        for (let idx=0; idx < nSodiumIons; idx++) {
            let currentInstance = new SodiumIon([-800, 800], [-200, -70]);
            while (this.#checkInstanceOverlap(currentInstance) !== true) {
                currentInstance = new SodiumIon([-800, 800], [-200, -70]);
            }

            this.sodiumIons.push(currentInstance);
        }
        for (let idx=0; idx < nPotassiumIons; idx++) {
            this.potassiumIons.push(new PotassiumIon([-800, 800], [80, 300]));
        }

        for (let idx=0; idx < nLeakIons; idx++) {
            this.leakIons.push(new LeakIon([-800, 800], [-200, -70]));
        }
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