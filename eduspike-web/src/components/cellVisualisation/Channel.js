import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
    p5.setup = () => p5.createCanvas(250, 250, p5.WEBGL);
  
    p5.draw = () => {
      p5.background(250);
      let gateColor = p5.color(200, 20, 90);
      let gateColor2 = p5.color(20, 200, 90);
      p5.fill(gateColor2);
      p5.noStroke();
      p5.rect(-50, 0, 50, 10)


      p5.fill(gateColor2);
      p5.noStroke();
      p5.rect(50, 0, -20, 10)

      p5.fill(gateColor);
      p5.noStroke();
      p5.rect(-50, 0, 10, 80)
      p5.fill(gateColor);
      p5.noStroke();
      p5.rect(50, 0, 10, 80)

    //   p5.fill(gateColor2);
    //   p5.noStroke();
    //   p5.rect(-50, 0, 30, 10)
    //   p5.push();
    //   p5.rotateZ(p5.frameCount * 0.01);
    //   p5.rotateX(p5.frameCount * 0.01);
    //   p5.rotateY(p5.frameCount * 0.01);
    //   p5.plane(100);
    //   p5.pop();
    };
}

export default function Channel() {
    return (
        <div>
            <ReactP5Wrapper sketch={sketch} />
        </div>
    )
}