class Gradient {
  constructor(start, end, c1, c2, sound) {
    this.start = start;
    this.end = end;
    this.c1 = c1;
    this.c2 = c2;
    this.sound = sound;
  }

  updateGradient() {
    let soundLevel = this.sound.amplitude.getLevel();
    this.gradient = drawingContext.createLinearGradient(
      this.start.x * width,
      this.start.y * height,
      this.end.x * width,
      this.end.y * height
    );
    this.gradient.addColorStop(soundLevel, this.c1);
    this.gradient.addColorStop(1, this.c2);
  }

  drawGradient() {
    push();
    blendMode(LIGHTEST);
    drawingContext.fillStyle = this.gradient;
    rect(0, 0, width, height);
    pop();
  }
}
