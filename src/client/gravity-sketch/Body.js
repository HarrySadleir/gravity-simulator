class Body {
    static _bigG = 1;         // Newtons gravitational constatant G
    static _radMultiplier = 1; // Flat scaler for radius of the body

    _pos;  // P5.Vector,   m
    _vel;  // P5.Vector,   m/s
    _acc;  // P5.Vector,   m/s^2
    _mass; // number,      kg
    _rad;  // number,      m
    _color;// P5.Color

    // For reseting to the starting position
    _initialPos;
    _initialVel;

    // For drawing the previous path of the body
    _path; // P5.Vector[], m

    // For easy removing from the list
    _id;    // number

    constructor(pos, vel, mass, color) {
        this._pos = pos;
        this._vel = vel;
        this._mass = mass;
        this._color = color;

        this._initialPos = pos.copy();
        this._initialVel = vel.copy();

        this._rad = Body._radMultiplier * pow(mass, 1/3);
        this._acc = createVector();
        this._path = []; 
        this._id = uidGenerator.nextUUID();
    }

    getId() {
        return this._id;
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
        strokeWeight(2);
        noFill();
        beginShape();
        let point;
        for(let i in this._path) {
            point = this._path[i];
            stroke(this._color).vertex(point.x, point.y, point.z);
        }
        stroke(this._color);
        endShape(LINES);
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

        if(this._path.length > 1000) this._path.shift();
        this._path.push(this._pos.copy());
    }

    resetToInitialValue() {
        this._pos = this._initialPos.copy();
        this._vel = this._initialVel.copy();
        this._path = [];
    }

    _getDistance(other) {
        return p5.Vector.sub(other._pos, this._pos);
    }
}