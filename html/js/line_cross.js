
var shapes = [];
var p1, p2, vp1;

function setup() {
    createCanvas(600, 400);
    p1 = new Point(250,150);
    p2 = new Point(380,200);
    vp1 = new Point(0,0);

    var l, b;

    l = new LineSegment(p1, p2);
    l.dragEnabled = true;
    l.strokeColor = color(10);
    l.strokeWeight = 3;
    shapes.push(l);

    b = new Box(p1, p2, vp1);
    shapes.push(b);

    l = new LineSegment(p1, vp1);
    l.dragEnabled = true;
    l.strokeColor = color(10);
    l.strokeWeight = 3;
    shapes.push(l);
}

function draw() {
    background(255);
    noStroke();

    shapes.forEach(s => s.draw() );
}



function mousePressed(){
    shapes.filter(s => s.dragEnabled)
          .find(s => s.handleMousePressed());
  }
  
  function mouseDragged(){
    shapes.filter(s => s.isDragged)
          .forEach(s => s.handleMouseDragged());
  }
  
  function mouseReleased(){
    shapes.filter(s => s.isDragged)
          .forEach(s => s.handleMouseReleased());
  }