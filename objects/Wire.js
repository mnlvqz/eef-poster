class Wire {
  constructor(start, end, segments, amplitude, sound) {
    this.start = start;
    this.end = end;
    this.segments = segments;
    this.amplitude = amplitude;
    this.sound = sound;
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
    let soundLevel;
    for (let i = 0; i < this.segments; i++) {
      soundLevel = map(this.sound.amplitude.getLevel(), 0.0, 1.0, -1.0, 1.0);
      let tension = map(i, 0, this.segments - 1, -HALF_PI, HALF_PI);
      /*
      this.vertices[i].y =
        sin(this.ctn) * pow(cos(tension), 2) * this.amplitude;
        */
      this.vertices[i].y = soundLevel * pow(cos(tension), 2) * this.amplitude;
      this.ctn += 0.2;
    }
  }

  drawWire(photoRatio, photoSize) {
    let maxRatio = max(photoRatio.x, photoRatio.y);
    push();
    translate(this.start.x * maxRatio, this.start.y * maxRatio);
    if (photoRatio.y >= photoRatio.x) {
      translate((width - photoSize.x * maxRatio) * 0.5, 0);
    } else {
      translate(0, (height - photoSize.y * maxRatio) * 0.5);
    }
    rotate(this.angle);
    noFill();
    stroke(255);
    strokeWeight(2);
    beginShape();
    for (let v of this.vertices) {
      curveVertex(v.x * maxRatio, v.y * maxRatio);
    }
    endShape();
    pop();
  }
}
