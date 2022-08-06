import P5 from "p5";
import "p5/lib/addons/p5.dom";
import Body from "./Body"
import BodyBuilder from "./BodyBuilder";

export const bodies: Body[] = [];
export const tickRate: number = 30;

const sketch = (p5: P5) => {
    p5.setup = () => {
        const canvas: P5.Renderer = p5.createCanvas(400, 400, p5.WEBGL);
        canvas.parent('app')

        p5.frameRate(tickRate);
        p5.rectMode(p5.CENTER);

        bodies.push(new BodyBuilder(p5)
            .setPosition(0, 0, 0)
            .setVelocity(5, 5, 0)
            .setMass(100)
            .setColor(p5.color(255, 0, 0))
            .build()
        )
    };

    p5.draw = () => {
        p5.background(20);

        for (let i in bodies) {
            let b: Body = bodies[i];
            b.show();
        }
        for (let i in bodies) bodies[i].updatePos();
    };
};

new P5(sketch);