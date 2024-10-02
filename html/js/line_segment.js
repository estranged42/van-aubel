class LineSegment {
  constructor(x1, y1, x2, y2) {
    if (typeof x1 == "object" && typeof y1 == "object" ) {
      this.start = x1;
      this.end = y1;
    } else {
      this.start = new Point(x1, y1);
      this.end = new Point(x2, y2);
    }
    this.points = [];
    this.points.push(this.start);
    this.points.push(this.end);

    this.dragEnabled = false;
    this.isDragged = true;
    this.showLength = false;
  }

  dx() { return this.endX - this.startX; }
  dy() { return this.endY - this.startY; }
  get slope() { return this.dy() / this.dx(); }

  get offset() {
    if (this.slope == Infinity) {
      return undefined;
    }
    return this.startY + this.slope * (0 - this.startX);
  }

  translate(x, y) {
    this.start.move(x, y);
    this.end.move(x, y);
  }

  set startX(val) { this.start.x = val; }
  set startY(val) { this.start.y = val; }
  set endX(val) { this.end.x = val; }
  set endY(val) { this.end.y = val; }
  get startX() { return this.start.x; }
  get startY() { return this.start.y; }
  get endX() { return this.end.x; }
  get endY() { return this.end.y; }

  handleMousePressed() {
    const pointPressed = this.points.find(p => p.containsXY(mouseX, mouseY));

    if (pointPressed) {
      pointPressed.isBeingDragged = true;
      this.isDragged = true;
      return true;
    }
    return false;
  }

  handleMouseDragged() {
    const pointDragged = this.points.find(p => p.isBeingDragged);

    if (pointDragged) {
      pointDragged.set(mouseX, mouseY);
    }
  }

  handleMouseReleased() {
    this.points.forEach(p => { p.isBeingDragged = false; });
    this.isDragged = false;
  }

  draw() {
    applyStyleSet(this);
    line(this.startX, this.startY, this.endX, this.endY);

    if (this.dragEnabled) {
      drawControlPoints(this.points);
    }

    if (this.showLength) {
      // Use p5 vectors to calculate the line length
      let lenVector = p5.Vector.sub(this.start.pos, this.end.pos);
      const lineLength = Math.floor(lenVector.mag());

      // use a vector to create an offset for the label
      let offsetVector = lenVector.copy();
      offsetVector.setMag(10);
      offsetVector = p5.Vector.add(this.start.pos, offsetVector);
      push();
      strokeWeight(1);
      text(lineLength, offsetVector.x, offsetVector.y);
      pop();
    }
  }
}
