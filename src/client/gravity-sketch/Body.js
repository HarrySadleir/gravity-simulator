class Body {
    static _bigG = 10;         // Newtons gravitational constatant G
    static _radMultiplier = 3; // Flat scaler for radius of the body

    _pos;  // P5.Vector,   m
    _vel;  // P5.Vector,   m/s
    _acc;  // P5.Vector,   m/s^2
    _mass; // number,      kg
    _rad;  // number,      m
    _color;// P5.Color

    // For drawing the previous path of the body
    _path; // P5.Vector[], m

    constructor(pos, vel, mass, color) {
        this._pos = pos;
        this._vel = vel;
        this._mass = mass;
        this._color = color;

        this._rad = Body._radMultiplier * pow(mass, 1/3);
        this._acc = createVector();
        this._path = []; 
    }

    show() {
        push();
        translate(this._pos);
        fill(this._color);
        stroke(this._color);
        sphere(this._rad);
        pop();
    }

    showPath() {
        stroke(this._color);
        strokeWeight(2);
        beginShape();
        for(let i in this._path) {
            const point = this._path[i];
            vertex(point.x, point.y, point.z);
        }
        endShape();
    }

    // Movement functions for Newton integration
    updateAcc() {
        this._acc.set(0, 0, 0);
        for(let i in bodies) {
            const otherBody = bodies[i];
            if(otherBody != this) {
                const dist = this._getDistance(otherBody);
                this._acc.add(dist.normalize().mult(Body._bigG * otherBody._mass / dist.magSq()));
            }
        }
    }

    updateVel() {
        this._vel.add(p5.Vector.div(this._acc, tickRate));
    }

    updatePos() {
        this._pos.add(p5.Vector.div(this._vel, tickRate));
    }

    _getDistance(other) {
        return p5.Vector.sub(other.pos, this.pos);
    }
}