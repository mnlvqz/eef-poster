class Landscape {
  constructor(
    photo,
    offsetW,
    offsetH,
    backWiresCoordinates,
    frontWiresCoordinates,
    wireSegments
  ) {
    this.photo = photo;
    this.offsetW = offsetW;
    this.offsetH = offsetH;
    this.backWiresCoordinates = backWiresCoordinates;
    this.frontWiresCoordinates = frontWiresCoordinates;
    this.wireSegments = wireSegments;
    this.backWires = [];
    this.frontWires = [];

    for (let i = 0; i < this.backWiresCoordinates; i++) {
      this.backWires[i] = new Wire(
        createVector(
          this.backWiresCoordinates[0].x,
          this.backWiresCoordinates[0].y
        ),
        createVector(
          this.backWiresCoordinates[1].x,
          this.backWiresCoordinates[1].y
        ),
        128,
        10
      );
    }

    for (let i = 0; i < this.frontWiresCoordinates; i++) {
      this.frontWires[i] = new Wire(
        createVector(
          this.frontWiresCoordinates[0].x,
          this.frontWiresCoordinates[0].y
        ),
        createVector(
          this.frontWiresCoordinates[1].x,
          this.frontWiresCoordinates[1].y
        ),
        128,
        10
      );
    }
  }

  setupLandscape() {}

  updateLandscape() {
    this.photoRatio = max(width / this.photo.width, height / this.photo.height);

    for (let b of this.backWires) {
      b.updateWire();
    }

    for (let f of this.frontWires) {
      f.updateWire();
    }
  }

  drawLandscape() {
    for (let b of this.backWires) {
      b.drawWire();
    }

    push();
    if (width > height) {
      translate(this.offsetW);
    } else {
      translate(this.offsetH);
    }
    image(
      this.photo,
      width * 0.5,
      height * 0.5,
      this.photo.width * this.photoRatio,
      this.photo.height * this.photoRatio
    );
    pop();

    for (let f of this.frontWires) {
      f.drawWire();
    }
  }
}
