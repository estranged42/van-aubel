
var shapes = [];
var p1, p2, p3, p4, vp1, vp2, vp3, vp4;

function setup() {
    let theCanvas = createCanvas(600, 600);
    theCanvas.parent("p5canvas");

    p1 = new Point(250,200);
    p2 = new Point(380,250);
    p3 = new Point(350,300);
    p4 = new Point(225,325);
    vp1 = new Point(0,0);
    vp2 = new Point(0,0);
    vp3 = new Point(0,0);
    vp4 = new Point(0,0);

    var l, b;

    /*
    Four lines for the quadralateral, moving clockwise from the upper left point.
    */
    l = new LineSegment(p1, p2);
    l.dragEnabled = true;
    l.strokeColor = color(100);
    l.strokeWeight = 2;
    shapes.push(l);

    b = new Box(p1, p2, vp1);
    shapes.push(b);

    l = new LineSegment(p2, p3);
    l.dragEnabled = true;
    l.strokeColor = color(100);
    l.strokeWeight = 2;
    shapes.push(l);

    b = new Box(p2, p3, vp2);
    shapes.push(b);

    l = new LineSegment(p3, p4);
    l.dragEnabled = true;
    l.strokeColor = color(100);
    l.strokeWeight = 2;
    shapes.push(l);

    b = new Box(p3, p4, vp3);
    shapes.push(b);

    l = new LineSegment(p4, p1);
    l.dragEnabled = true;
    l.strokeColor = color(100);
    l.strokeWeight = 2;
    shapes.push(l);

    b = new Box(p4, p1, vp4);
    shapes.push(b);

    /*
    The two Van Aubel lines are calculated inside their Box objects.
    */
    l = new LineSegment(vp1, vp3);
    l.strokeColor = color("#0c234b");
    l.strokeWeight = 3;
    l.showLength = true;
    shapes.push(l);

    l = new LineSegment(vp2, vp4);
    l.strokeColor = color("#0c234b");
    l.strokeWeight = 3;
    l.showLength = true;
    shapes.push(l);

}

function draw() {
    background(240);
    noStroke();

    shapes.forEach(s => s.draw() );
}



function mousePressed() {
    shapes.filter(s => s.dragEnabled)
            .find(s => s.handleMousePressed());
}

function mouseDragged() {
    shapes.filter(s => s.isDragged)
            .forEach(s => s.handleMouseDragged());
}

function mouseReleased() {
    shapes.filter(s => s.isDragged)
            .forEach(s => s.handleMouseReleased());
}