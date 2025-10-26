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
    const ry = (p.height - rh) / 2 + 60;

    // Ruler body 
    p.noStroke();
    p.fill(235, 200, 140);
    p.rect(rx, ry, rw, rh, 6);

    // Ruler border
    p.noFill();
    p.stroke(90, 60, 30);
    p.strokeWeight(4);
    p.rect(rx, ry, rw, rh, 2);

    const minutes = 60;
    p.stroke(40);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.fill(30);
    p.textSize(16);

    for (let i = 0; i <= minutes; i++) {
      const tx = rx + (i * rw) / minutes;
      
      // Every 5 minutes is a larger tick (hour)
      if (i % 5 === 0) {
        // hour tick
        const tickTop = ry;
        const tickBottom = ry + 40;
        p.strokeWeight(3);
        p.line(tx, tickTop, tx, tickBottom);
        
        // Hour label above ruler
        if (i > 0) {
          p.noStroke();
          p.text(i / 5, tx, ry - 5);
          p.stroke(40);
        }
      } else {
        // minute tick (smaller than the hour)
        const tickTop = ry;
        const tickBottom = ry + 20;
        p.strokeWeight(1.5);
        p.line(tx, tickTop, tx, tickBottom);
      }
    }

    const currentSecond = p.second();
    p.stroke(40);
    p.strokeWeight(1);

    for (let s = 0; s <= currentSecond; s++) {
      const sx = rx + (s * rw) / 60;
      const tickTop = ry + rh - 20;
      const tickBottom = ry + rh;
      p.line(sx, tickTop, sx, tickBottom);
    }

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
