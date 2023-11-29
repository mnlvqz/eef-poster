class Gradient {
  constructor(start, end, c1, c2, sound) {
    this.start = start;
    this.end = end;
    this.c1 = c1;
    this.c2 = c2;
    this.sound = sound;
    this.alpha = 0.0;
    this.gradientFlag = false;
  }

  updateGradient() {
    if (this.gradientFlag) {
      this.alpha = constrain(lerp(this.alpha, 255.0, 0.01), 0.0, 255.0);
    } else {
      this.alpha = constrain(lerp(this.alpha, 0.0, 0.01), 0.0, 255.0);
    }

    let soundLevel = map(this.sound.amplitude.getLevel(), 0.0, 1.0, 1.0, 0.2);

    this.gradient = drawingContext.createLinearGradient(
      this.start.x * width,
      this.start.y * height,
      this.end.x * width,
      this.end.y * height
    );

    this.c1.setAlpha(this.alpha);
    this.c2.setAlpha(this.alpha);

    this.gradient.addColorStop(soundLevel, this.c1);
    this.gradient.addColorStop(1.0, this.c2);
  }

  drawGradient() {
    push();
    blendMode(LIGHTEST);
    drawingContext.fillStyle = this.gradient;
    rect(0, 0, width, height);
    pop();
  }
}
