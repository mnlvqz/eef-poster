class TextField {
  constructor(positionRatio, content, size, align, margin) {
    this.positionRatio = positionRatio;
    this.content = split(content, "\n");
    this.size = height * 0.03;
    this.align = align;
    this.margin = height * 0.005;
    this.coordinate = createVector(
      width * this.positionRatio.x,
      height * this.positionRatio.y
    );
    this.textHeight = textAscent() + textDescent();
    this.textWidth = 0.0;
  }

  resizeTextField() {
    this.coordinate = createVector(
      width * this.positionRatio.x,
      height * this.positionRatio.y
    );

    this.size = height * 0.03;
    this.margin = height * 0.005;
  }

  updateTextField() {
    this.textHeight = textAscent() + textDescent();
    this.textWidth = 0.0;
  }

  drawTextField() {
    push();
    textSize(this.size);
    textAlign(this.align);
    switch (this.align) {
      case LEFT:
        translate(
          this.coordinate.x + this.margin,
          this.coordinate.y + textAscent() + this.margin
        );
        for (let i = 0; i < this.content.length; i++) {
          this.textWidth = textWidth(this.content[i]);
          fill(255);
          noStroke();
          rect(
            -this.margin,
            this.textHeight * i - textAscent(),
            this.textWidth + this.margin * 2.0,
            this.textHeight
          );
          fill(0);
          text(this.content[i], 0.0, this.textHeight * i);
        }
        break;
      case CENTER:
        break;
      case RIGHT:
        translate(
          this.coordinate.x + this.margin,
          this.coordinate.y + textAscent() + this.margin
        );
        for (let i = 0; i < this.content.length; i++) {
          this.textWidth = textWidth(this.content[i]);
          fill(255);
          noStroke();
          rect(
            this.margin,
            this.textHeight * i - textAscent(),
            -this.textWidth - this.margin * 2.0,
            this.textHeight
          );
          fill(0);
          text(this.content[i], 0.0, this.textHeight * i);
        }
        break;
    }
    pop();
  }
}
