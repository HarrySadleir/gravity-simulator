import P5 from "p5"
import { Vector, Color } from "p5";
import { bodies, tickRate } from "./GravitySketch"

export default class Body {
    static bigG: number = 10; // Newtons gravitational constatant G
    static radMultiplier: number = 3; // Flat scaler for radius of the body

    private _p5: P5;

    private pos: Vector; // m
    private vel: Vector; // m/s
    private acc: Vector; // m/s^2
    private mass: number;   // kg
    private rad: number;    // m

    // For drawing the previous path of the body
    private path: Vector[];

    private color: Color;

    constructor(p5: P5, pos: Vector, vel: Vector, mass: number, color: Color) {
        this._p5 = p5;
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.color = color;

        this.rad = Body.radMultiplier * p5.pow(mass, 1/3);
        this.acc = p5.createVector();
        this.path = []; 
    }

    show() {
        const p5 = this._p5;

        p5.push();
        p5.translate(this.pos);
        p5.fill(this.color);
        p5.stroke(this.color);
        p5.sphere(this.rad);
        p5.pop();
    }

    showPath() {
        const p5 = this._p5;

        p5.stroke(this.color);
        p5.strokeWeight(2);
        p5.beginShape();
        for(let i in this.path) {
            const point: Vector = this.path[i];
            p5.vertex(point.x, point.y, point.z);
        }
        p5.endShape();
    }

    // Movement functions for Newton integration
    updateAcc() {
        const p5 = this._p5;

        this.acc.set(0, 0, 0);
        for(let i in bodies) {
            const otherBody: Body = bodies[i];
            if(otherBody != this) {
                const d: Vector = this.getDistance(otherBody);
                this.acc.add(d.normalize().mult(otherBody.mass / d.magSq()));
            }
        }
    }

    updateVel() {
        this.vel.add(this.acc.div(tickRate));
    }

    updatePos() {
        this.pos.add(this.vel.div(tickRate));
    }

    private getDistance(other: Body): Vector {
        return Vector.sub(other.pos, this.pos);
    }
}