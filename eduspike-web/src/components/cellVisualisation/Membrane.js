import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
    p5.setup = () => p5.createCanvas(500, 300, p5.WEBGL);
  
    p5.draw = () => {
      p5.background(250);
      p5.noFill();
      sketchPhospholipidPair(p5, 0, 0);
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

function sketchPhospholipidPair(p5, x, y) {
    p5.push();
    p5.stroke(100, 210, 150);
    p5.strokeWeight(2);
    p5.bezier(-5, 0, -5, 20, 5, 20, -10, 50);
    p5.bezier(5, 0, 5, 20, -5, 20, 10, 50);


    let gateColor = p5.color(200, 100, 190);

    p5.fill(gateColor);
    p5.noStroke();
    p5.circle(0, 0, 30)
    p5.pop();

    // Bottom part
    p5.stroke(100, 210, 150);
    p5.strokeWeight(2);
    p5.bezier(-5, 110, -5, 100, 5, 100, -10, 60);
    p5.bezier(5, 110, 5, 100, -5, 100, 10, 60);


    p5.fill(gateColor);
    p5.noStroke();
    p5.circle(0, 110, 30)   
}

export default function Membrane() {
    return (
        <div>
            <ReactP5Wrapper sketch={sketch} />
        </div>
    )
}