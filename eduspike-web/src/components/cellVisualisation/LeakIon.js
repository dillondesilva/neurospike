import Ion from "./Ion";

class LeakIon extends Ion {
    constructor(xRange, yRange) {
        let initialX;
        let initialY;

        initialX = Math.floor(Math.random() * (xRange[1] - xRange[0] + 1) + xRange[0]);
        initialY = Math.floor(Math.random() * (yRange[1] - yRange[0] + 1) + yRange[0]);

        super(initialX, initialY, 15, "#FDDA0D");
    }
};

export default LeakIon;