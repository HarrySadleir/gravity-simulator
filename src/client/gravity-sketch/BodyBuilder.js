class BodyBuilder {
    _pos;   // P5.Vector, m
    _vel;   // P5.Vector, m/s
    _mass;  // number,    kg
    _color; // P5.Color

    setPosition(x, y, z) {
        this._pos = createVector(x, y, z);
        return this;
    }

    setVelocity(vx, vy, vz) {
        this._vel = createVector(vx, vy, vz);
        return this;
    }

    setMass(mass) {
        this._mass = mass;
        return this;
    }

    setColor(color) {
        this._color = color
        return this;
    }

    build() {
        return new Body(this._pos, this._vel, this._mass, this._color)
    }
}