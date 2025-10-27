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

    // current time
    let currentHour = p.hour() % 12;
    if (currentHour === 0) currentHour = 12;
    let currentMinute = p.minute();

    // Measuring bars above the ruler that shrink from right to left
    const barY = ry - 50; // Position above ruler
    const barHeight = 30;
    
    // Blue bar for hours - starts at 12 (right side) and shrinks left as hour progresses
    const hourBarStartX = rx + rw; // Start at the right (12 o'clock position)
    const hourBarWidth = rw * ((12 - currentHour) / 12); // Full at hour 0/12, empty at hour 12
    p.fill(0, 100, 255, 150);
    p.noStroke();
    p.rect(hourBarStartX - hourBarWidth, barY - 40, hourBarWidth, barHeight, 3);
    
    // Red bar for minutes - starts at right and shrinks left as minute progresses
    const minuteBarStartX = rx + rw; // Start at the right
    const minuteBarWidth = rw * ((60 - currentMinute) / 60); // Full at 0 min, empty at 60 min
    p.fill(255, 50, 50, 150);
    p.noStroke();
    p.rect(minuteBarStartX - minuteBarWidth, barY, minuteBarWidth, barHeight, 3);

    const markerY = ry + 50;

    // Blue triangle for hours
    const hourPos = rx + ((currentHour * 5) * rw) / 60;
    p.noStroke();
    p.fill(0, 100, 255, 180);
    p.triangle(hourPos, markerY - 15, hourPos - 10, markerY + 5, hourPos + 10, markerY + 5);

    // Red triangle for minutes
    const minutePos = rx + (currentMinute * rw) / 60;
    p.fill(255, 50, 50, 180);
    p.triangle(minutePos, markerY - 15, minutePos - 10, markerY + 5, minutePos + 10, markerY + 5);

    // Key
    const keyX = p.width - 150;
    const keyY = 30;
    p.fill(255, 255, 255, 200);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(keyX - 10, keyY - 10, 140, 70, 4);

    p.noStroke();
    p.fill(0, 100, 255, 180);
    p.triangle(keyX + 10, keyY, keyX, keyY + 10, keyX + 20, keyY + 10);
    p.fill(30);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(14);
    p.text("= Hours", keyX + 30, keyY + 5);

    p.fill(255, 50, 50, 180);
    p.triangle(keyX + 10, keyY + 30, keyX, keyY + 40, keyX + 20, keyY + 40);
    p.fill(30);
    p.text("= Minutes", keyX + 30, keyY + 35);

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
