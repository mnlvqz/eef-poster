class Landscape {
  constructor(photo, backWires, frontWires, offsetW, offsetH) {
    this.photo = photo;
    this.backWires = backWires;
    this.frontWires = frontWires;
    this.offsetW = offsetW;
    this.offsetH = offsetH;
  }

  setupLandscape() {}
  updateLandscape() {
    this.photoRatio = max(width / this.photo.width, height / this.photo.height);
  }
  drawLandscape() {
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

    /*

  let imageRatio = max(width / photos[0].width, height / photos[0].height);

  image(
    photos[0],
    width * 0.5,
    height * 0.5,
    photos[0].width * imageRatio,
    photos[0].height * imageRatio
  );
  */
  }
}
