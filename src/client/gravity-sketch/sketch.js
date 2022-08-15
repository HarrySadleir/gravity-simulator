let bodies = [];
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
    // Place the canvas under app
    const canvas = createCanvas(400, 400, WEBGL);
    canvas.parent('app');

    // Add the toggle for axis
    const toggleCheckbox = createCheckbox('Show Axis', false);
    toggleCheckbox.parent('app');
    toggleCheckbox.changed(() => {
        if (toggleCheckbox.checked()) {
            debugMode(AXES, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        } else {
            noDebugMode();
        }
    });

    // Select the add button and add its functionality
    const addStartingBodyButton = select("#add-item-btn");
    addStartingBodyButton.mousePressed(addNewBodyToTable);
    noLoop();
}

function addNewBodyToTable() {
    const x = select("#pos-x").value();
    const y = select("#pos-y").value();
    const z = select("#pos-z").value();

    const vx = select("#vel-x").value();
    const vy = select("#vel-y").value();
    const vz = select("#vel-z").value();    

    const mass = select("#mass").value();  

    const r = select("#col-r").value();  
    const g = select("#col-g").value();  
    const b = select("#col-b").value();  

    // Render the row
    const newRow = createElement("tr");
    newRow.parent("#input-table-body");

    createElement("td", `(${x}, ${y}, ${z})`).parent(newRow);
    createElement("td", `(${vx}, ${vy}, ${vz})`).parent(newRow);
    createElement("td", mass).parent(newRow);
    createElement("td").parent(newRow).style('background-color', color(r, g, b));
    createButton("Remove Body").parent(newRow);

    bodies.push(
        new BodyBuilder()
            .setPosition(x, y, z)
            .setVelocity(vx, vy, vz)
            .setMass(mass)
            .setColor(color(r, g, b))
            .build()
    )
}