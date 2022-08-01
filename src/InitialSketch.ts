import P5 from "p5";
import "p5/lib/addons/p5.dom";

const sketch = (p5: P5) => {
    let angle: number = 0;

    p5.setup = () => {
        const canvas: P5.Renderer = p5.createCanvas(400, 400);
        canvas.parent('app')

        p5.angleMode(p5.DEGREES);
        p5.rectMode(p5.CENTER);
    };

    p5.draw = () => {
        p5.background(0);

        p5.push();
        p5.translate(50, 50);
        p5.rotate(angle);
        p5.fill(255, 100, 50);
        p5.rect(0, 0, 100, 50);
        p5.pop();

        p5.translate(300, 300);
        p5.rotate(-angle * 3);
        p5.fill(50, 100, 250);
        p5.rect(0, 0, 100, 50);

        angle = angle + 5;
    };
};

new P5(sketch);