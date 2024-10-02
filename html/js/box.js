class Box {
  constructor(p1, p2, vp) {
    this.start = p1;
    this.end = p2;
    this.van_aubel_point = vp;
    this.points = [];
    this.points.push(this.start);
    this.points.push(this.end);

    this.dragEnabled = false;
    this.isDragged = true;

    this.strokeColor = color(150);
    this.strokeWeight = 1;
  }

  draw() {
    applyStyleSet(this);

    //
    // Other three lines of a Square
    //
    // make a new point p3 which is a copy of p1, then rotate it 90° around p2
    let boxPoint3 = this.start.copy();
    boxPoint3.rotateAbout(this.end, π/2);
    // new line from p2 to p3
    line(this.end.x, this.end.y, boxPoint3.x, boxPoint3.y);

    // make a new point p4 which is a copy of p2, then rotate it -90° around p1
    let boxPoint4 = this.end.copy();
    boxPoint4.rotateAbout(this.start, -π/2);
    // new line from p2 to p3
    line(this.start.x, this.start.y, boxPoint4.x, boxPoint4.y);

    // new line from p3 to p4
    line(boxPoint3.x, boxPoint3.y, boxPoint4.x, boxPoint4.y);

    //
    // Diagonals
    //
    line(this.start.x, this.start.y, boxPoint3.x, boxPoint3.y);
    line(this.end.x, this.end.y, boxPoint4.x, boxPoint4.y);

    //
    // Calculate the van_aubel_point
    //
    let vp = lineIntersect(this.start,boxPoint3,this.end,boxPoint4);
    this.van_aubel_point.x = vp.x;
    this.van_aubel_point.y = vp.y;

    if (this.dragEnabled) {
      drawControlPoints(this.points);
    }
  }

  handleMousePressed() {
    return this.isDragged;
  }

  handleMouseDragged() {
    
  }

  handleMouseReleased() {
    this.isDragged = false;
  }

}
