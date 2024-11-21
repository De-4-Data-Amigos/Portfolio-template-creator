import React from 'react';
import Sketch from 'react-p5';

const WaveEffect = () => {
    let yoff = 0.0; // 2nd dimension of perlin noise

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        p5.noLoop();
    };

    const draw = p5 => {
        p5.background(0);
        p5.fill(255);
        p5.beginShape();

        let xoff = 0;
        for (let x = 0; x <= p5.width; x += 10) {
            let y = p5.map(p5.noise(xoff, yoff), 0, 1, 200, 300);
            p5.vertex(x, y);
            xoff += 0.05;
        }
        yoff += 0.01;
        p5.vertex(p5.width, p5.height);
        p5.vertex(0, p5.height);
        p5.endShape(p5.CLOSE);
    };

    const windowResized = p5 => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default WaveEffect;
