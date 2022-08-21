// Globals
let bodies = [];
let nextBodies = [];
let simulationIsRunning = false;
const tickRate = 30;
let debugEnabled = true;
let uidGenerator;

function setup() {
    setupDom();

    // p5 configurations
    frameRate(tickRate);
    rectMode(CENTER);
    uidGenerator = new UidGenerator();
}

function draw() {
    background(20);

    // Set camera controls to work with the mouse and/or trackpad
    orbitControl();

    if (simulationIsRunning) {
        // The seperate loops are necessary to preserve symmetry
        for (let i in bodies) bodies[i].updateAcc();
        for (let i in bodies) bodies[i].updateVel();
        for (let i in bodies) bodies[i].updatePos();

        for (let i in bodies) {
            let b = bodies[i];
            b.show();
            b.showPath();
        }
    } else {
        for (let i in nextBodies) {
            let b = nextBodies[i];
            b.show();
        }
    }
}

function setupDom() {
    // Place the canvas under app
    const canvas = createCanvas(600, 500, WEBGL);
    canvas.parent('app');

    const buttonContainer = createDiv()
        .parent('app')
        .style('display', 'flex')

    // Add the toggle for axis
    const toggleCheckbox = createCheckbox('Show Axis', debugEnabled);
    toggleCheckbox
        .parent(buttonContainer)
        .style('width', '100px')
        .style('margin','auto');
    toggleCheckbox.changed(() => {
        if (toggleCheckbox.checked()) {
            debugMode(AXES, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        } else {
            noDebugMode();
        }
    });
    if(debugEnabled) {
        debugMode(AXES, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    }

    // Add Start, Save, and Load buttons
    const startButton = createButton('Start Simulation')
        .parent(buttonContainer)
        .mousePressed(startOrResetSimulation)
        .style('margin','auto');

    // Select the add button and add its functionality
    const addStartingBodyButton = select("#add-item-btn");
    addStartingBodyButton.mousePressed(addNewBodyToTable);
}

function startOrResetSimulation() {
    if (this.html() === "Reset Simulation") {
        bodies = [];
        for (let i in nextBodies) nextBodies[i].resetToInitialValue();
        simulationIsRunning = false;
        this.html("Start Simulation");
    } else if (this.html() === "Start Simulation") {
        bodies = [...nextBodies];
        simulationIsRunning = true;
        this.html("Reset Simulation");
    }
}

function addNewBodyToTable() {
    const x = select("#pos-x");
    const y = select("#pos-y");
    const z = select("#pos-z");

    const vx = select("#vel-x");
    const vy = select("#vel-y");
    const vz = select("#vel-z");    

    const mass = select("#mass");  

    const r = select("#col-r");  
    const g = select("#col-g");  
    const b = select("#col-b");  

    // Render the row
    const newRow = createElement("tr");
    newRow.parent("#input-table-body");

    createElement("td", `(${x.value()}, ${y.value()}, ${z.value()})`).parent(newRow);
    createElement("td", `(${vx.value()}, ${vy.value()}, ${vz.value()})`).parent(newRow);
    createElement("td", mass.value()).parent(newRow);
    createElement("td").parent(newRow).style('background-color', color(r.value(), g.value(), b.value()));
    
    const newBody = new BodyBuilder()
        .setPosition(Number(x.value()), Number(y.value()), Number(z.value()))
        .setVelocity(Number(vx.value()), Number(vy.value()), Number(vz.value()))
        .setMass(Number(mass.value()))
        .setColor(color(Number(r.value()), Number(g.value()), Number(b.value())))
        .build()

    createButton("Remove Body").parent(createElement("td").parent(newRow))   
        .style("width", "130px")
        .mousePressed(() => {
            // Remove the row from the html
            newRow.remove();
            // Lookup this body based on id and remove it from nextBodies
            const index = nextBodies.findIndex(body => body.getId() === newBody.getId())
            nextBodies.splice(index, 1)
        });

    nextBodies.push(newBody)
}