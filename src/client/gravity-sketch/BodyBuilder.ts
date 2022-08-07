import P5 from "p5"
import Body from "./Body"

export default class BodyBuilder {
    private p5: P5;

    private pos: P5.Vector; // m
    private vel: P5.Vector; // m/s
    private mass: number;   // kg

    private color: P5.Color;

    constructor(p5: P5) {
        this.p5 = p5;
    }

    setPosition(x: number, y: number, z: number): BodyBuilder {
        this.pos = this.p5.createVector(x, y, z);
        return this;
    }

    setVelocity(vx: number, vy: number, vz: number): BodyBuilder {
        this.vel = this.p5.createVector(vx, vy, vz);
        return this;
    }

    setMass(mass: number): BodyBuilder {
        this.mass = mass;
        return this;
    }

    setColor(color: P5.Color): BodyBuilder {
        this.color = color
        return this;
    }

    build(): Body {
        return new Body(this.p5, this.pos, this.vel, this.mass, this.color)
    }
}