const CELL_WIDTH = 25;
const PALETTE = ["#000000", "#FFFFFF"];

let sound;
let pulse;
let field;
let title, subtitle;
let landscapes = [];
let gradient = [];

let landscapeType;
let gradientType;
let soundFlag;

function preload() {
  soundFormats("wav");

  loadSound("assets/sounds/sound-" + int(random(1, 23)) + ".wav", (sample) => {
    sound = new Sound(sample);
    pulse = new Pulse(8, 500, sound);
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
          128,
          sound
        );

        let c1 = color(
          data[i].c1[0],
          data[i].c1[1],
          data[i].c1[2],
          data[i].c1[3]
        );
        let c2 = color(
          data[i].c2[0],
          data[i].c2[1],
          data[i].c2[2],
          data[i].c2[3]
        );

        gradient[i] = new Gradient(
          createVector(0.5, 0.0),
          createVector(0.5, 1.0),
          c2,
          c1,
          sound
        );
      }
    });
  });

  landscapeType = int(floor(random(3)));
  gradientType = int(floor(random(3)));
}

function setup() {
  getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  imageMode(CENTER);
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

  soundFlag = false;
}

function draw() {
  blendMode(BLEND);
  background(0.0);

  // Updates
  sound.updateSound();
  landscapes[landscapeType].updateLandscape();
  field.updateField();
  pulse.updatePulse();
  title.updateTextField();
  subtitle.updateTextField();
  gradient[gradientType].updateGradient();

  // Draws
  field.drawField();
  landscapes[landscapeType].drawLandscape();
  title.drawTextField();
  subtitle.drawTextField();
  pulse.drawPulse();
  gradient[gradientType].drawGradient();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  field.setupField();
}

function mousePressed() {
  getAudioContext().resume();
  if (!soundFlag) {
    sound.sample.setVolume(1.0, 2, 0.5);
    gradient[gradientType].gradientFlag = true;
    pulse.pulseFlag = true;
    soundFlag = true;
  } else {
    sound.sample.setVolume(0.0, 2, 0.5);
    gradient[gradientType].gradientFlag = false;
    pulse.pulseFlag = false;
    soundFlag = false;
  }
}

function touchStarted() {
  getAudioContext().resume();
  if (!soundFlag) {
    sound.sample.setVolume(1.0, 2, 0.5);
    gradient[gradientType].gradientFlag = true;
    pulse.pulseFlag = true;
    soundFlag = true;
  } else {
    sound.sample.setVolume(0.0, 2, 0.5);
    gradient[gradientType].gradientFlag = false;
    pulse.pulseFlag = false;
    soundFlag = false;
  }
}
