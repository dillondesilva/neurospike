import { ReactP5Wrapper } from "@p5-wrapper/react";
import SodiumIon from "./SodiumIon";
import IonCollection from "./IonCollection";
import SodiumChannel from "./SodiumChannel";
import PotassiumChannel from "./PotassiumChannel";
import LeakChannel from "./LeakChannel";
import SodiumIonChannelPair from "./SodiumIonChannelPair";
import PotassiumIonChannelPair from "./PotassiumIonChannelPair";

function sketch(p5) {
    p5.setup = () => p5.createCanvas(800, 500, p5.WEBGL);
    let simulationIons = new IonCollection(200, 200, 200);
    let naChannel = new SodiumChannel(0, 0, 60, 85, "#ffad21");
    let kChannel = new PotassiumChannel(-150, 0, 60, 85, "#a0a0de");
    let leakChannel = new LeakChannel(150, 0, 60, 85, "#ff0fa9");
    p5.simulationData = {};
    // naChannel.triggerInactivationGate();
    naChannel.triggerActivationGate();

    p5.updateWithProps = props => {
      console.log(props);
      if (props.simulationData) {
        console.log(props.simulationData);
        p5.simulationData = props.simulationData.data;
      }
        // console.log(props.simulationData)
        // if (props.simulationData.data.m > 0.5 && !naChannel.isActivationOpen()) {
        //   naChannel.triggerActivationGate();
        // } else if (props.simulationData.m > 0.5 && naChannel.isActivationOpen()) {
        //   naChannel.triggerActivationGate();
        // }
    };

    kChannel.triggerActivationGate();

    let naIonChannelPair = new SodiumIonChannelPair(naChannel, simulationIons.sodiumIons, 800, 500);
    let kIonChannelPair = new PotassiumIonChannelPair(kChannel, simulationIons.potassiumIons, 800, 500)
    let currTimepoint = 0;
    // simSodiumIons.forEach((emptyItem) => {
    //   emptyItem = new SodiumIon([100, 200], [100,200]);
    // })
    
    p5.draw = () => {
      p5.background(180, 200, 255);
      // console.log(simulationData);
      if (Object.keys(p5.simulationData).length > 5) {
        currTimepoint += 1;
        console.log(p5.simulationData.timepoints[currTimepoint]);
        console.log('n is', p5.simulationData.n[currTimepoint], 'm is', p5.simulationData.m[currTimepoint], 'h is', p5.simulationData.h[currTimepoint])
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
      naIonChannelPair.draw(p5);
      kIonChannelPair.draw(p5);

      // simulationIons.potassiumIons.forEach((potassiumIon) => {
      //   potassiumIon.draw(p5);
      // })

      // simulationIons.leak.forEach((potassiumIon) => {
      //   potassiumIon.draw(p5);
      // })
      
      naChannel.updateGates();
      kChannel.updateGates();

      naChannel.draw(p5);
      kChannel.draw(p5);
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