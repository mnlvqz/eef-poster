class Gradient {
  constructor(start, end, colorA, colorB) {
    this.start = start;
    this.end = end;
    this.c1 = c1;
    this.c2 = c2;
  }

  updateGradient() {
    this.gradient = drawingContext.createLinearGradient(
      start.x,
      start.y,
      end.x,
      end.y
    );
    this.gradient.addColorStop(0, color(c1.v1, c1.v2, c1.v3, c1.alpha));
    this.gradient.addColorStop(1, color(c2.v1, c2.v2, c2.v3, c2.alpha));
  }

  drawGradient() {
    push();
    blendMode(LIGHTEST);
    drawingContext.fillStyle = this.gradient;
    rect(0, 0, width, height);
    pop();
  }
}
