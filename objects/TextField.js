class TextField {
  constructor(content, coordinate, fontSize, align, margin) {
    this.content = split(content, "\n");
    this.coordinate = coordinate;
    this.fontSize = fontSize;
    this.align = align;
    this.margin = margin;
    this.textHeight = textAscent() + textDescent();
    this.textWidth = 0.0;
    this.fontSizeFixed = 0.0;
    this.marginFixed = 0.0;
  }

  updateTextField() {
    this.textHeight = textAscent() + textDescent();
    this.fontSizeFixed = this.fontSize * max(width, height);
    this.marginFixed = this.margin * max(width, height);
  }

  drawTextField() {
    push();
    textSize(this.fontSizeFixed);
    textAlign(this.align);
    switch (this.align) {
      case LEFT:
        translate(this.coordinate.x * width, this.coordinate.y * height);
        translate(this.marginFixed, textAscent());

        for (let i = 0; i < this.content.length; i++) {
          this.textWidth = textWidth(this.content[i]);
          fill(255);
          noStroke();
          rect(
            -this.marginFixed,
            this.textHeight * i - textAscent(),
            this.textWidth + this.marginFixed * 2.0,
            this.textHeight
          );
          fill(0);
          text(this.content[i], 0.0, this.textHeight * i);
        }

        break;
      case CENTER:
        break;
      case RIGHT:
        translate(this.coordinate.x * width, this.coordinate.y * height);
        translate(
          -this.marginFixed,
          -textAscent() * (this.content.length - 1) -
            this.marginFixed * this.content.length
        );

        for (let i = 0; i < this.content.length; i++) {
          this.textWidth = textWidth(this.content[i]);
          fill(255);
          noStroke();
          rect(
            this.marginFixed,
            this.textHeight * i - textAscent(),
            -this.textWidth - this.marginFixed * 2.0,
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
