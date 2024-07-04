class Ion {
    constructor(initialX, initialY, ionSize, ionColor, velocityX=0, velocityY=0) {
        if (this.constructor === Ion) {
            throw new Error("Attempting to initialise abstract class: Ion");
        }

        this.x = initialX;
        this.y = initialY;
        this.originX = initialX;
        this.originY = initialY;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.ionSize = ionSize;
        this.ionColor = ionColor;
        this.inScene = true;
    }

    move() {
        // TODO: Implement this function to move
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    updateVelocity(newVx, newVy) {
        this.velocityX = newVx;
        this.velocityY = newVy;
    }

    draw(p5Context) {
        p5Context.push();
        p5Context.noStroke();
        p5Context.translate(Math.random(), Math.random());
        p5Context.fill(this.ionColor);
        p5Context.circle(this.x, this.y, this.ionSize);
        p5Context.pop();
    }
};

export default Ion;