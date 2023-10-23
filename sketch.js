const CELL_WIDTH = 25;
const PALETTE = ["#000000", "#FFFFFF"];

let pulse;
let field;
let title, subtitle;
let landscapes = [];

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
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  imageMode(CENTER);
  pulse = new Pulse(8, 250);
  field = new Field(1.0);
  title = new TextField(
    createVector(0.05, 0.05),
    "ELECTROMAGNETIC\nEXPERIENCE\nFESTIVAL",
    40,
    LEFT,
    8
  );
  subtitle = new TextField(
    createVector(0.95, 0.85),
    "MEXICO CITY\nAPRIL 11-14\n2024",
    40,
    RIGHT,
    8
  );
}

function draw() {
  background(0.0);

  // Updates

  landscapes[0].updateLandscape();

  field.updateField();

  pulse.updatePulse();

  title.updateTextField();
  subtitle.updateTextField();

  // Draws

  field.drawField();
  pulse.drawPulse();

  landscapes[0].drawLandscape();

  title.drawTextField();
  subtitle.drawTextField();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  title.resizeTextField();
  subtitle.resizeTextField();
  field.setupField();
}
