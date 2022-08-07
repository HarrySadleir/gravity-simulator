const bodies = [];
const tickRate = 30;

let debugEnabled = true;

function setup() {
    setupDom();

    // p5 configurations
    frameRate(tickRate);
    rectMode(CENTER);

    // TODO: Extract to dom input setup
    bodies.push(new BodyBuilder()
        .setPosition(-50, 0, 0)
        .setVelocity(50, 50, 0)
        .setMass(100)
        .setColor(color(200, 200, 0))
        .build()
    )

    bodies.push(new BodyBuilder()
        .setPosition(50, 0, 0)
        .setVelocity(-50, -50, 0)
        .setMass(100)
        .setColor(color(0, 200, 200))
        .build()
    )
}

function draw() {
    background(20);

    // Set camera controls to work with the mouse and/or trackpad
    orbitControl();


    for (let i in bodies) {
        let b = bodies[i];
        b.show();
        b.showPath();
        b.updateAcc();
    }
    for (let i in bodies) bodies[i].updateVel();
    for (let i in bodies) bodies[i].updatePos();
}

function setupDom() {
    const canvas = createCanvas(400, 400, WEBGL);
    canvas.parent('app')

    const toggleCheckbox = createCheckbox('Show Axis', false)
    toggleCheckbox.parent('app');
    toggleCheckbox.changed(() => {
        if (toggleCheckbox.checked()) {
            debugMode(AXES, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        } else {
            noDebugMode();
        }
    });
}