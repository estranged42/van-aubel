
let π = 3.15159;

function _drawControlPoint(point) {
    if (point.containsXY(mouseX, mouseY)) {
        fill(0, 0, 0,);
        point.radius = 30;
    } else {
        fill(150, 150, 150);
        point.radius = 20;
    }
    noStroke();
    ellipse(point.x, point.y, point.radius, point.radius);
}

function drawControlPoints(points) {
    push();
    points.forEach(p => _drawControlPoint(p));
    pop();
}

function applyStyleSet(styleSet, buffer = undefined) {
    if (buffer) {
        if (styleSet.fillColor) { buffer.fill(styleSet.fillColor); }
        if (styleSet.noFill) { buffer.noFill(); }
        if (styleSet.strokeColor) { buffer.stroke(styleSet.strokeColor); }
        if (styleSet.noStroke) { buffer.noStroke(); }
        if (styleSet.strokeWeight) { buffer.strokeWeight(styleSet.strokeWeight); }

    } else {
        if (styleSet.fillColor) { fill(styleSet.fillColor); }
        if (styleSet.noFill) { noFill(); }
        if (styleSet.strokeColor) { stroke(styleSet.strokeColor); }
        if (styleSet.noStroke) { noStroke(); }
        if (styleSet.strokeWeight) { strokeWeight(styleSet.strokeWeight); }
    }
}


  // Calculate the intersection between a line ab and a line cd. 
  // and return the result as a new Point().
  function lineIntersect(a,b, c,d) {
    // need to pass in vectors
    let result = this.intersectionCheck(a.pos,b.pos,c.pos,d.pos);
    if (result.crossPointPosition != undefined) {
      return new Point(result.crossPointPosition.x, result.crossPointPosition.y);
    }
  }

  function getDet2(a,b,c) {
    return (c.x-a.x) * (c.y-b.y) - (c.x-b.x) * (c.y-a.y);
  }
  
  function intersectionCheck(a,b,c,d,threshold = 1e-9) {
    const abc = getDet2(a,b,c);
    const abd = getDet2(a,b,d);
    const cda = getDet2(c,d,a);
    const cdb = getDet2(c,d,b);
    if (abc<0&&abd<0) return {intersect:false};
    if (abc>0&&abd>0) return {intersect:false};
    if (cda<0&&cdb<0) return {intersect:false};
    if (cda>0&&cdb>0) return {intersect:false};
  
    const abr = abs(abc) + abs(abd);
    const cdr = abs(cda) + abs(cdb);
  
    if (abr < threshold || cdr < threshold){
      return {intersect:false};
    }
  
    const crossPointPosition = createVector();
    if (abr < cdr) {
      p5.Vector.lerp(a, b, abs(cda)/cdr, crossPointPosition);
    } else {
      p5.Vector.lerp(c, d, abs(abc)/abr, crossPointPosition);
    }
  
    return {intersect:true, crossPointPosition};
  }
