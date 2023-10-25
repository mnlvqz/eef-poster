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

    for (let i = 0; i < this.backWiresCoordinates.length; i++) {
      this.backWires[i] = new Wire(
        createVector(
          this.backWiresCoordinates[i][0].x,
          this.backWiresCoordinates[i][0].y
        ),
        createVector(
          this.backWiresCoordinates[i][1].x,
          this.backWiresCoordinates[i][1].y
        ),
        128,
        50
      );
    }

    for (let i = 0; i < this.frontWiresCoordinates.length; i++) {
      this.frontWires[i] = new Wire(
        createVector(
          this.frontWiresCoordinates[i][0].x,
          this.frontWiresCoordinates[i][0].y
        ),
        createVector(
          this.frontWiresCoordinates[i][1].x,
          this.frontWiresCoordinates[i][1].y
        ),
        128,
        50
      );
    }
  }

  setupLandscape() {}

  updateLandscape() {
    this.photoRatio = createVector(
      width / this.photo.width,
      height / this.photo.height
    );

    for (let b of this.backWires) {
      b.updateWire();
    }

    for (let f of this.frontWires) {
      f.updateWire();
    }
  }

  drawLandscape() {
    for (let b of this.backWires) {
      b.drawWire(
        this.photoRatio,
        createVector(this.photo.width, this.photo.height)
      );
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
      this.photo.width * max(this.photoRatio.x, this.photoRatio.y),
      this.photo.height * max(this.photoRatio.x, this.photoRatio.y)
    );
    pop();

    for (let f of this.frontWires) {
      f.drawWire(
        this.photoRatio,
        createVector(this.photo.width, this.photo.height)
      );
    }
  }
}
