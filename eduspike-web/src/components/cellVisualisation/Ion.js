class Ion {
    constructor(initialX, initialY, ionSize, ionColor) {
        if (this.constructor === Ion) {
            throw new Error("Attempting to initialise abstract class: Ion");
        }

        this.x = initialX;
        this.y = initialY;
        this.ionSize = ionSize;
        this.ionColor = ionColor;
    }

    moveTo(locationX, locationY) {
        // TODO: Implement this function to move
        // ion in L shape towards the corresponding channel      
    }

    drawIon(p5Context) {
        p5Context.push();
        p5Context.noStroke();
        p5Context.translate(Math.random(), Math.random());
        p5Context.fill(this.ionColor);
        p5Context.circle(this.x, this.y, this.ionSize);
        p5Context.pop();
    }
};

export default Ion;