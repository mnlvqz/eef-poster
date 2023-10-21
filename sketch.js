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
  FACTOR;
  pulse = new Pulse(1, 250);
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
  pulse.updatePulse();
  field.updateField();
  wire.updateWire();
  title.updateTextField();
  subtitle.updateTextField();

  // Draws
  pulse.drawPulse();
  field.drawField();
  wire.drawWire();

  image(photo, 0, 0, photo.width / 4, photo.height / 4);

  title.drawTextField();
  subtitle.drawTextField();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  title.resizeTextField();
  subtitle.resizeTextField();
}

class Pulse {
  constructor(nCircles, diameter) {
    this.nCircles = nCircles;
    this.diameter = diameter;
    this.circles = [];
    this.setupPulse();
  }

  setupPulse() {
    this.coordinate = this.nextCoordinate();
    for (let i = 0; i < this.nCircles; i++) {
      this.circles[i] = map(i, 0, this.nCircles, -10, -5);
    }
  }

  updatePulse() {
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i] += 0.05;
    }
    if (this.circles[0] > 3) {
      this.setupPulse();
    }
  }

  drawPulse() {
    push();
    translate(this.coordinate);
    noFill();
    strokeWeight(1);
    for (let c of this.circles) {
      let d = this.diameter * exp(c);
      stroke(255, 255, 255, 255 - c * 255);
      ellipse(0, 0, d, d);
    }
    pop();
  }

  nextCoordinate() {
    let rows = int(width / CELL_WIDTH) - 1;
    let cols = int(height / CELL_WIDTH) - 1;
    return createVector(
      int(random(1, rows)) * CELL_WIDTH,
      int(random(1, rows)) * CELL_WIDTH
    );
  }
}

class Field {
  constructor(rate) {
    this.rate = rate;
    this.rows = int(width / CELL_WIDTH) - 1;
    this.cols = int(height / CELL_WIDTH) - 1;
    this.setupField();
  }

  setupField() {
    this.motifs = [];
    for (let i = 0; i < this.cols; i++) {
      this.motifs[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.motifs[i][j] = createVector(
          (i + 1) * CELL_WIDTH,
          (j + 1) * CELL_WIDTH,
          random(1.0)
        );
      }
    }
  }

  updateField() {}

  drawField() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.motifs[i][j].z < 0.3) {
          this.drawDot(this.motifs[i][j], 2.5, 255);
        }
        if (this.motifs[i][j].z >= 0.3 && this.motifs[i][j].z < 0.6) {
          this.drawCross(this.motifs[i][j], 5.0, 255);
        }
      }
    }
  }

  drawCross(motif, size, alpha) {
    let r = size * 0.5;
    push();
    translate(motif.x, motif.y);
    strokeWeight(1);
    stroke(255, 255, 255);
    line(-r, -r, r, r);
    line(-r, r, r, -r);
    pop();
  }

  drawDot(motif, size, alpha) {
    push();
    translate(motif.x, motif.y);
    noStroke();
    fill(255, 255, 255);
    ellipse(0, 0, size, size);
    pop();
  }
}

class Wire {
  constructor(start, end, segments, amplitude) {
    this.start = start;
    this.end = end;
    this.segments = segments;
    this.amplitude = amplitude;
    this.ctn = 0.0;
    this.angle = atan2(this.end.y - this.start.y, this.end.x - this.start.x);
    this.length = dist(this.start.x, this.start.y, this.end.x, this.end.y);
    this.segmentLength = this.length / this.segments;
    this.vertices = [];
    for (let i = 0; i < this.segments; i++) {
      this.vertices[i] = createVector(i * this.segmentLength, 0.0);
    }
  }

  updateWire() {
    for (let i = 0; i < this.segments; i++) {
      let tension = map(i, 0, this.segments - 1, -HALF_PI, HALF_PI);
      this.vertices[i].y =
        sin(this.ctn) * pow(cos(tension), 2) * this.amplitude;
      this.ctn += 0.1;
    }
  }

  drawWire() {
    push();
    translate(this.start.x, this.start.y);
    rotate(this.angle);
    noFill();
    stroke(255);
    strokeWeight(2);
    beginShape();
    for (let v of this.vertices) {
      curveVertex(v.x, v.y);
    }
    endShape();
    pop();
  }
}

class TextField {
  constructor(positionRatio, content, size, align, margin) {
    this.positionRatio = positionRatio;
    this.content = split(content, "\n");
    this.size = height * 0.03;
    this.align = align;
    this.margin = height * 0.005;
    this.coordinate = createVector(
      width * this.positionRatio.x,
      height * this.positionRatio.y
    );
    this.textHeight = textAscent() + textDescent();
    this.textWidth = 0.0;
  }

  resizeTextField() {
    this.coordinate = createVector(
      width * this.positionRatio.x,
      height * this.positionRatio.y
    );
    this.size = height * 0.03;
    this.margin = height * 0.005;
  }

  updateTextField() {
    this.textHeight = textAscent() + textDescent();
    this.textWidth = 0.0;
  }

  drawTextField() {
    push();
    textSize(this.size);
    textAlign(this.align);
    switch (this.align) {
      case LEFT:
        translate(
          this.coordinate.x + this.margin,
          this.coordinate.y + textAscent() + this.margin
        );
        for (let i = 0; i < this.content.length; i++) {
          this.textWidth = textWidth(this.content[i]);
          fill(255);
          noStroke();
          rect(
            -this.margin,
            this.textHeight * i - textAscent(),
            this.textWidth + this.margin * 2.0,
            this.textHeight
          );
          fill(0);
          text(this.content[i], 0.0, this.textHeight * i);
        }
        break;
      case CENTER:
        break;
      case RIGHT:
        translate(
          this.coordinate.x + this.margin,
          this.coordinate.y + textAscent() + this.margin
        );
        for (let i = 0; i < this.content.length; i++) {
          this.textWidth = textWidth(this.content[i]);
          fill(255);
          noStroke();
          rect(
            this.margin,
            this.textHeight * i - textAscent(),
            -this.textWidth - this.margin * 2.0,
            this.textHeight
          );
          fill(0);
          text(this.content[i], 0.0, this.textHeight * i);
        }
        break;
    }
    pop();
  }
}
