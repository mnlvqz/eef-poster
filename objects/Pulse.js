class Pulse {
  constructor(nCircles, diameterRatio, sound) {
    this.nCircles = nCircles;
    this.diameterRatio = diameterRatio;
    this.sound = sound;
    this.alpha = 0.0;
    this.pulseFlag = false;
    this.soundLevel = 0.0;
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
    if (this.pulseFlag) {
      this.alpha = constrain(lerp(this.alpha, 1.0, 0.01), 0.0, 1.0);
    } else {
      this.alpha = constrain(lerp(this.alpha, 0.0, 0.01), 0.0, 1.0);
    }

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
    strokeWeight(1.5);
    for (let c of this.circles) {
      let d = this.diameterRatio * exp(c);
      stroke(255, 255, 255, this.alpha * (255 - c * 255));

      ellipse(0, 0, d, d);
    }
    pop();
  }

  nextCoordinate() {
    let cols = int(width / CELL_WIDTH) - 1;
    let rows = int(height / CELL_WIDTH) - 1;
    return createVector(
      int(random(1, cols)) * CELL_WIDTH,
      int(random(1, rows)) * CELL_WIDTH
    );
  }
}
