// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(240);

    // ruler dimensions
    const rh = 120;
    const rw = p.width * 0.8; 
    const rx = (p.width - rw) / 2;
    const ry = (p.height - rh) / 2;

    // Ruler body 
    p.noStroke();
    p.fill(235, 200, 140);
    p.rect(rx, ry, rw, rh, 6);

    // Ruler border
    p.noFill();
    p.stroke(90, 60, 30);
    p.strokeWeight(4);
    p.rect(rx, ry, rw, rh, 6);

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
