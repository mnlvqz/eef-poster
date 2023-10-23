class Field {
  constructor(rate) {
    this.rate = rate;
    this.setupField();
  }

  setupField() {
    this.cols = int(windowWidth / CELL_WIDTH) - 1;
    this.rows = int(windowHeight / CELL_WIDTH) - 1;
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
