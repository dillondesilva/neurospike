import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
    p5.setup = () => p5.createCanvas(500, 300, p5.WEBGL);
    
    p5.draw = () => {
      p5.background(250);
      for (let i=-5; i < 5; i++) {
        p5.noFill();
        sketchPhospholipidPair(p5, i * 30 + 2, 110);
      }
    //   p5.noFill();
    //   sketchPhospholipidPair(p5, 0, 110);
    //   p5.noFill();
    //   sketchPhospholipidPair(p5, 32, 110);
    //   p5.noFill();
    //   sketchPhospholipidPair(p5, 64, 110);
    //   sketchChannel(p5, 86, 110);
    //   p5.noFill();

    //   p5.push();
    //   p5.stroke(100, 210, 150);
    //   p5.strokeWeight(2);
    //   p5.bezier(-5, 0, -5, 20, 5, 20, -10, 50);
    //   p5.bezier(5, 0, 5, 20, -5, 20, 10, 50);


    //   let gateColor = p5.color(200, 100, 190);

    //   p5.fill(gateColor);
    //   p5.noStroke();
    //   p5.circle(0, 0, 30)
    //   p5.pop();

    //   // Bottom part
    //   p5.stroke(100, 210, 150);
    //   p5.strokeWeight(2);
    //   p5.bezier(-5, 110, -5, 100, 5, 100, -10, 60);
    //   p5.bezier(5, 110, 5, 100, -5, 100, 10, 60);


    //   p5.fill(gateColor);
    //   p5.noStroke();
    //   p5.circle(0, 110, 30)
    
    };
}

function sketchChannel(p5, x, y) {
    let gateColor = p5.color(200, 20, 90);
    let gateColor2 = p5.color(20, 200, 90);
    p5.fill(gateColor2);
    p5.noStroke();
    p5.rect(x - 50, y, x + 50, y + 10)


    p5.fill(gateColor2);
    p5.noStroke();
    p5.rect(x + 50, y, x - 20, y + 10)

    p5.fill(gateColor);
    p5.noStroke();
    p5.rect(x - 50, y, x + 10, y + 80)
    p5.fill(gateColor);
    p5.noStroke();
    p5.rect(x + 50, y, x + 10, y + 80)
}

function sketchPhospholipidPair(p5, x, y) {
    p5.push();
    p5.translate(0, Math.sin(p5.frameCount / 4));
    p5.stroke(100, 210, 150);
    p5.strokeWeight(2);
    p5.bezier(x - 5, 0, x - 5, 20, x + 5, 20, x - 10, 50);
    p5.bezier(x + 5, 0, x + 5, 20, x - 5, 20, x + 10, 50);


    let gateColor = p5.color(200, 100, 190);

    p5.fill(gateColor);
    p5.noStroke();
    p5.circle(x, 0, 30)
    p5.pop();

    // Bottom part
    p5.push();
    p5.translate(0, Math.sin(p5.frameCount / 4));
    p5.stroke(100, 210, 150);
    p5.strokeWeight(2);
    p5.bezier(x - 5, 110, x - 5, 100, x + 5, 100, x - 10, 60);
    p5.bezier(x + 5, 110, x + 5, 100, x - 5, 100, x + 10, 60);


    p5.fill(gateColor);
    p5.noStroke();
    p5.circle(x, y, 30);
    p5.pop();
}

export default function Membrane() {
    return (
        <div>
            <ReactP5Wrapper sketch={sketch} />
        </div>
    )
}