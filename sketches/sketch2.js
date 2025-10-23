// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(800, 800);
  };
  p.draw = function () {
    p.background(220);
    // dark green background: https://www.figma.com/colors/dark-green/    
    // chalkboard
    p.fill(6, 64, 43);
    p.noStroke();
    p.rect(50,50, 700, 500);

    // brown border
    p.noFill();
    p.strokeWeight(20);
    p.stroke(120, 80, 40);
    p.rect(50, 50, 700, 500);
    
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
