import { ReactP5Wrapper } from "@p5-wrapper/react";
import SodiumIon from "./SodiumIon";
import IonCollection from "./IonCollection";

function sketch(p5) {
    p5.setup = () => p5.createCanvas(500, 300, p5.WEBGL);
    let simulationIons = new IonCollection(6, 6, 16);

    // simSodiumIons.forEach((emptyItem) => {
    //   emptyItem = new SodiumIon([100, 200], [100,200]);
    // })
    
    p5.draw = () => {
      p5.background(180, 200, 255);
      p5.push();

      p5.noStroke();
      p5.translate(0, Math.sin(p5.frameCount / 16));
      p5.fill(230, 205, 190)
      p5.rect(-250, -15, 500, 140);

      p5.pop();
      for (let i=-8; i < 0; i++) {
        p5.noFill();
        sketchPhospholipidPair(p5, i * 30 + 2, 110);
      }
      for (let i=4; i < 9; i++) {
        p5.noFill();
        sketchPhospholipidPair(p5, i * 30 + 2, 110);
      } 
    //   p5.noFill();
    //   sketchPhospholipidPair(p5, 0, 110);
    //   p5.noFill();
    //   sketchPhospholipidPair(p5, 32, 110);
    //   p5.noFill();
    //   sketchPhospholipidPair(p5, 64, 110);

      sketchChannel(p5, 30, 0);
      simulationIons.sodiumIons.forEach((sodiumIon) => {
        sodiumIon.drawIon(p5);
      })
      
      simulationIons.potassiumIons.forEach((potassiumIon) => {
        potassiumIon.drawIon(p5);
      })
    
    };
}

function sketchChannel(p5, x, y) {
    let gateColor = p5.color(0, 190, 0);
    let gateColor2 = p5.color(20, 200, 90);
    p5.push()
    p5.translate(0, Math.sin(p5.frameCount / 16));
    
    // p5.fill(gateColor2);
    // p5.noStroke();
    // p5.rect(x - 50, y, x + 50, y + 10);

    // p5.fill(gateColor2);
    // p5.noStroke();
    // p5.rect(x + 50, y, x - 20, y + 10)

    p5.fill(gateColor);
    p5.noStroke();
    p5.rect(x - 35, y - 20, 10, 145);

    p5.fill(gateColor);
    p5.noStroke();
    p5.rect(x + 50, y - 20, 10, 145);
    p5.pop();
}

function sketchPhospholipidPair(p5, x, y) {
    p5.push();
    p5.translate(0, Math.sin(p5.frameCount / 16));
    p5.stroke(100, 100, 150);
    p5.strokeWeight(2);
    p5.bezier(x - 5, 0, x - 5, 20, x + 5, 20, x - 10, 50);
    p5.bezier(x + 5, 0, x + 5, 20, x - 5, 20, x + 10, 50);


    let gateColor = p5.color(100, 100, 190);

    p5.fill(gateColor);
    p5.noStroke();
    p5.circle(x, 0, 30)
    p5.pop();

    // Bottom part
    p5.push();
    p5.translate(0, Math.sin(p5.frameCount / 16));
    p5.stroke(100, 100, 150);
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