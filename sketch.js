const CELL_WIDTH = 25;
const PALETTE = ["#000000", "#FFFFFF"];

let pulse;
let field;
let title, subtitle;
let landscapes = [];

let myShader;

function preload() {
  loadJSON("assets/photos-data.json", (data) => {
    for (let i = 0; i < data.length; i++) {
      let backWires = [];
      let frontWires = [];

      for (let j = 0; j < data[i].back.length; j++) {
        backWires[j] = [];

        backWires[j][0] = createVector(
          data[i].back[j].start[0],
          data[i].back[j].start[1]
        );

        backWires[j][1] = createVector(
          data[i].back[j].end[0],
          data[i].back[j].end[1]
        );
      }

      for (let j = 0; j < data[i].front.length; j++) {
        frontWires[j] = [];

        frontWires[j][0] = createVector(
          data[i].front[j].start[0],
          data[i].front[j].start[1]
        );

        frontWires[j][1] = createVector(
          data[i].front[j].end[0],
          data[i].front[j].end[1]
        );
      }

      landscapes[i] = new Landscape(
        loadImage(data[i].path),
        createVector(0.0, 0.0),
        createVector(0.0, 0.0),
        backWires,
        frontWires,
        128
      );
    }
  });

  myShader = loadShader("assets/test.vert", "assets/test.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  imageMode(CENTER);
  pulse = new Pulse(8, 250);
  field = new Field(1.0);
  title = new TextField(
    "ELECTROMAGNETIC\nEXPERIENCE\nFESTIVAL",
    createVector(0.05, 0.05),
    0.03,
    LEFT,
    0.005
  );

  subtitle = new TextField(
    "MEXICO CITY\nAPRIL 11-14\n2024",
    createVector(0.95, 0.95),
    0.03,
    RIGHT,
    0.005
  );
}

function draw() {
  blendMode(BLEND);
  background(0.0);

  // Updates

  landscapes[0].updateLandscape();
  field.updateField();
  pulse.updatePulse();

  title.updateTextField();
  subtitle.updateTextField();

  // Draws

  field.drawField();
  /*
  pulse.drawPulse();

  landscapes[0].drawLandscape();

  title.drawTextField();
  subtitle.drawTextField();
  */

  blendMode(DIFFERENCE);
  noStroke();
  fill(255, 0, 0);
  ellipse(mouseX - 10, mouseY - 10, 100, 100);
  fill(0, 255, 0);
  ellipse(mouseX + 10, mouseY - 10, 100, 100);
  fill(0, 0, 255);
  ellipse(mouseX, mouseY + 10, 100, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  title.resizeTextField();
  subtitle.resizeTextField();
  field.setupField();
}
