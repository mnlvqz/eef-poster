const CELL_WIDTH = 25;
const PALETTE = ["#000000", "#FFFFFF"];

let FACTOR;

let pulse;
let field;
let wire;
let title, subtitle;
let photo;

function preload() {
  photo = loadImage("assets/photo-a-layer-a-e2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  imageMode(CENTER);
  FACTOR;
  pulse = new Pulse(8, 250);
  field = new Field(1.0);
  wire = new Wire(createVector(0, 0), createVector(width, height), 128, 10);
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
  field.updateField();
  wire.updateWire();

  pulse.updatePulse();

  title.updateTextField();
  subtitle.updateTextField();

  // Draws

  field.drawField();
  wire.drawWire();
  pulse.drawPulse();

  let imageRatio = max(width / photo.width, height / photo.height);

  image(
    photo,
    width * 0.5,
    height * 0.5,
    photo.width * imageRatio,
    photo.height * imageRatio
  );

  title.drawTextField();
  subtitle.drawTextField();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  title.resizeTextField();
  subtitle.resizeTextField();
  field.setupField();
}
