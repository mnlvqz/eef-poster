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
