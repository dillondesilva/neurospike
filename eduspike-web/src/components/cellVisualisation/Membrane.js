import { ReactP5Wrapper } from "@p5-wrapper/react";
import SodiumIon from "./SodiumIon";
import IonCollection from "./IonCollection";
import SodiumChannel from "./SodiumChannel";
import PotassiumChannel from "./PotassiumChannel";
import LeakChannel from "./LeakChannel";
import SodiumIonChannelPair from "./SodiumIonChannelPair";
import PotassiumIonChannelPair from "./PotassiumIonChannelPair";
import LeakIonChannelPair from "./LeakIonChannelPair";

function sketch(p5) {
    let font;
    p5.preload = () => {
      font = p5.loadFont('fonts/Roboto/Roboto-Black.ttf');
    }
    p5.setup = () => {
      p5.createCanvas(800, 500, p5.WEBGL);
      p5.textFont(font);
    }

    let simulationIons = new IonCollection(400, 400, 400);
    let naChannel = new SodiumChannel(0, -30, 60, 85, "#ffad21");
    let kChannel = new PotassiumChannel(-120, -30, 60, 85, "#10d0de");
    let leakChannel = new LeakChannel(-250, -30, 60, 85, "#0002a0");
    p5.simulationData = {};
    // naChannel.triggerInactivationGate();
    naChannel.triggerActivationGate();

    p5.updateWithProps = props => {
      if (props.simulationData) {
        p5.simulationData = props.simulationData.data;
      }
    };

    kChannel.triggerActivationGate();

    let naIonChannelPair = new SodiumIonChannelPair(naChannel, simulationIons.sodiumIons, 800, 500);
    let kIonChannelPair = new PotassiumIonChannelPair(kChannel, simulationIons.potassiumIons, 800, 500);
    let leakIonChannelPair = new LeakIonChannelPair(leakChannel, simulationIons.leakIons, 800, 500)

    let currTimepoint = 0;
    // simSodiumIons.forEach((emptyItem) => {
    //   emptyItem = new SodiumIon([100, 200], [100,200]);
    // })
    
    p5.draw = () => {
      p5.background(180, 200, 255);
      p5.noStroke();
      p5.fill(232, 220, 202);
      p5.rect(-600, -80, 1200, 85)
      if (Object.keys(p5.simulationData).length > 5) {
        if (currTimepoint === p5.simulationData.timepoints.length) {
          currTimepoint = 0;
        } else {
          currTimepoint += 1;
        }
        
        if (p5.simulationData.m[currTimepoint] > 0.9 && !naChannel.isActivationOpen()) {
          naChannel.triggerActivationGate();
        } else if (p5.simulationData.m[currTimepoint] < 0.1 && naChannel.isActivationOpen()) {
          naChannel.triggerActivationGate();
        }

        if (p5.simulationData.h[currTimepoint] > 0.4  && !naChannel.isInactivationOpen()) {
          naChannel.triggerInactivationGate();
        } else if (p5.simulationData.h[currTimepoint] < 0.1 && naChannel.isInactivationOpen()) {
          naChannel.triggerInactivationGate();
        }

        if (p5.simulationData.n[currTimepoint] > 0.7 && !kChannel.isActivationOpen() 
            && !naChannel.isInactivationOpen()) {
          kChannel.triggerActivationGate();
        } else if (p5.simulationData.n[currTimepoint] < 0.5 && kChannel.isActivationOpen()) {
          kChannel.triggerActivationGate();
        }

        let formattedN = (Math.round(p5.simulationData.n[currTimepoint] * 100) / 100).toFixed(2);
        let formattedM = (Math.round(p5.simulationData.m[currTimepoint] * 100) / 100).toFixed(2);
        let formattedH = (Math.round(p5.simulationData.h[currTimepoint] * 100) / 100).toFixed(2);
        
        p5.push();
        p5.translate(-80, -50);
        p5.fill(0)
        p5.text(`n: ${formattedN}`, 100, 40);
        p5.text(`m: ${formattedM}`, 100, 60);
        p5.text(`h: ${formattedH}`, 100, 80);
        p5.pop();
      }


      // p5.push();

      // p5.noStroke();
      // p5.translate(0, Math.sin(p5.frameCount / 16));
      // p5.fill(230, 205, 190)
      // p5.rect(-250, -15, 500, 140);

      // p5.pop();


      // for (let i=-8; i < 0; i++) {
      //   p5.noFill();
      //   sketchPhospholipidPair(p5, i * 30 + 2, 110);
      // }
      // for (let i=4; i < 9; i++) {
      //   p5.noFill();
      //   sketchPhospholipidPair(p5, i * 30 + 2, 110);
      // }

      // simulationIons.sodiumIons.forEach((sodiumIon) => {
      //   sodiumIon.drawIon(p5);
      // })
      p5.push();
      p5.translate(-80, -50);
      naIonChannelPair.handleIonsMotion();
      kIonChannelPair.handleIonsMotion();
      leakIonChannelPair.handleIonsMotion();

      naIonChannelPair.draw(p5);
      leakIonChannelPair.draw(p5);
      kIonChannelPair.draw(p5);
      
      naChannel.updateGates();
      kChannel.updateGates();

      p5.fill(0);
      p5.textSize(12);
      let formattedTime = (Math.round(p5.simulationData.timepoints[currTimepoint] * 100) / 100).toFixed(2);
      let formattedV = (Math.round(p5.simulationData.membrane_voltage[currTimepoint] * 100) / 100).toFixed(2);

      p5.text(`Transmembrane Potential: ${formattedV} mV`, 100, 20);
      p5.text(`Time: ${formattedTime} ms`, 100, 0);
      p5.pop();
      // leakChannel.draw(p5);
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

export default function Membrane(props) {
  return (
      <div>
          <ReactP5Wrapper sketch={sketch} simulationData={props.simulationData}/>
      </div>
  )
}