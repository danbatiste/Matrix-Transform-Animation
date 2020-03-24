function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  w = windowWidth;
  h = windowHeight;
}

var s = 0.5;      // scale factor
var dx = 100*s;   // grid width
var dy = 100*s;   // grid height
var g = 20;       // Grid reach
var w;
var h;

function draw() {
  // List of vectors
  //[[start], [end], color],
  var vectors = [
    [[0,0], [0,1], "blue"],
    [[0,0], [1,0], "blue"],
    [[0,0], [cos(2*millis()/1000), sin(2*millis()/1000)], "red"],
  ].map(vector => {return [
      [vector[0][0]*dx, vector[0][1]*dy],
      [vector[1][0]*dx, vector[1][1]*dy],
      vector[2]
  ]});

  // Sets origin to 0,0 with y up and x to the right
  translate(w/2, h/2);
  scale(1, -1);

  // Animates the transition between matrix 1 and matrix 2
  animateTransform(
    millis()/1000, // Time
    1, 0, 0,  // Matrix 1
    1, 0, 0,  // *
    2, 1, 0,  // Matrix 2
    2, 0, 0   // **
  );

  // Draws the background, origin, and grid
  background(175);
  strokeWeight(1);
  stroke(0);
  fill(0);
  var r = 5;
  rect(-r/2, -r/2, r, r);
  for (var x=0; x < g*w/2; x += dx) {
    line(x,g*-h/2, x, g*h/2);
    line(-x,g*-h/2, -x, g*h/2);
  }
  for (var y=0; y < g*h/2; y += dy) {
    line(g*-w/2, y, g*w/2, y);
    line(g*-w/2, -y, g*w/2, -y);
  }

  // Draws the vectors
  strokeWeight(2)
  vectors.forEach(vector => {
    stroke(vector[2]);
    line(...vector[0], ...vector[1]);
  });
}


// Linearly transitions between value a and value b (given t, 0<=t<=1)
function transition(t, a, b) {
  if (!(0<=t && t<=1)) {
    console.error("function transition: t out of range (0<=t<=1)");
  }
  return (1-t)*a + (t)*b;
}


// Transitions from matrix 1 to matrix 2 using time t
function animateTransform(t, a0,b0,c0,d0,e0,f0, a1,b1,c1,d1,e1,f1) {
  var tx = map(sin(t), -1, 1, 0, 1) // Maps from [-1,1] to [0,1]
  applyMatrix(
    transition(tx, a0,a1),
    transition(tx, b0,b1),
    transition(tx, c0,c1),
    transition(tx, d0,d1),
    transition(tx, e0,e1),
    transition(tx, f0,f1)
  );
}
