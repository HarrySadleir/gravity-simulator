const bodies = [];
const tickRate = 30;

function setup() {
    const canvas = createCanvas(400, 400, WEBGL);
    canvas.parent('app')

    frameRate(tickRate);
    rectMode(CENTER);

    bodies.push(new BodyBuilder()
        .setPosition(0, 0, 0)
        .setVelocity(5, 5, 0)
        .setMass(100)
        .setColor(color(255, 0, 0))
        .build()
    )
}

function draw() {
    background(20);

    for (let i in bodies) {
        let b = bodies[i];
        b.show();
    }
    for (let i in bodies) bodies[i].updatePos();
}