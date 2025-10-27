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
    let ampm = p.hour() >= 12 ? 'PM' : 'AM';

    // AM/PM label
    p.fill(30);
    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(24);
    p.text(ampm, rx + rw + 20, ry + rh / 2);

    // Pencils
    const pencilY = ry - 60;
    const pencilWidth = 20;
    const maxPencilLength = rw;
    
    // Blue pencil 
    const hourPencilLength = maxPencilLength * ((12 - currentHour) / 12);
    const hourPencilStartX = rx + rw - hourPencilLength;
    const hourPencilEndX = rx + rw;
    
    // Hover effect
    const isHoverBlue = p.mouseX >= hourPencilStartX && p.mouseX <= hourPencilEndX && 
                        p.mouseY >= pencilY - 35 && p.mouseY <= pencilY - 35 + pencilWidth;
    
    p.push();
    p.fill(isHoverBlue ? 150 : 100, isHoverBlue ? 200 : 150, 255);
    p.stroke(0);
    p.strokeWeight(isHoverBlue ? 3 : 2);
    p.rect(hourPencilStartX + 20, pencilY - 35, hourPencilLength - 20, pencilWidth, 0, 3, 3, 0);
    
    p.fill(50, 30, 20);
    p.strokeWeight(2);
    p.triangle(
      hourPencilStartX, pencilY - 35 + pencilWidth / 2,
      hourPencilStartX + 20, pencilY - 35,
      hourPencilStartX + 20, pencilY - 35 + pencilWidth
    );
    
    p.fill(60, 60, 60);
    p.noStroke();
    p.triangle(
      hourPencilStartX + 5, pencilY - 35 + pencilWidth / 2,
      hourPencilStartX + 15, pencilY - 35 + pencilWidth / 4,
      hourPencilStartX + 15, pencilY - 35 + 3 * pencilWidth / 4
    );
    
    p.fill(255, 150, 200);
    p.stroke(0);
    p.strokeWeight(2);
    p.rect(hourPencilEndX - 20, pencilY - 35, 20, pencilWidth, 0, 3, 3, 0);
    
    p.fill(192, 192, 192);
    p.rect(hourPencilEndX - 23, pencilY - 35, 3, pencilWidth);
    p.pop();
    
    // Show exact hour for hover effect
    if (isHoverBlue) {
      p.fill(255, 255, 200, 230);
      p.stroke(0);
      p.strokeWeight(1);
      p.rect(p.mouseX + 10, p.mouseY - 20, 100, 30, 5);
      p.fill(0);
      p.noStroke();
      p.textAlign(p.LEFT, p.CENTER);
      p.textSize(14);
      p.text(`Hour: ${currentHour}`, p.mouseX + 15, p.mouseY - 5);
    }
    
    // Red pencil 
    const minutePencilLength = maxPencilLength * ((60 - currentMinute) / 60);
    const minutePencilStartX = rx + rw - minutePencilLength;
    const minutePencilEndX = rx + rw;
    
    // Red pencil hover effect
    const isHoverRed = p.mouseX >= minutePencilStartX && p.mouseX <= minutePencilEndX && 
                       p.mouseY >= pencilY && p.mouseY <= pencilY + pencilWidth;
    
    p.push();
    p.fill(255, isHoverRed ? 150 : 100, isHoverRed ? 150 : 100);
    p.stroke(0);
    p.strokeWeight(isHoverRed ? 3 : 2);
    p.rect(minutePencilStartX + 20, pencilY, minutePencilLength - 20, pencilWidth, 0, 3, 3, 0);
    
    p.fill(50, 30, 20);
    p.strokeWeight(2);
    p.triangle(
      minutePencilStartX, pencilY + pencilWidth / 2,
      minutePencilStartX + 20, pencilY,
      minutePencilStartX + 20, pencilY + pencilWidth
    );
    
    p.fill(60, 60, 60);
    p.noStroke();
    p.triangle(
      minutePencilStartX + 5, pencilY + pencilWidth / 2,
      minutePencilStartX + 15, pencilY + pencilWidth / 4,
      minutePencilStartX + 15, pencilY + 3 * pencilWidth / 4
    );
    
    p.fill(255, 150, 200);
    p.stroke(0);
    p.strokeWeight(2);
    p.rect(minutePencilEndX - 20, pencilY, 20, pencilWidth, 0, 3, 3, 0);
    
    p.fill(192, 192, 192);
    p.rect(minutePencilEndX - 23, pencilY, 3, pencilWidth);
    p.pop();
    
    // Show minute if hovering
    if (isHoverRed) {
      p.fill(255, 255, 200, 230);
      p.stroke(0);
      p.strokeWeight(1);
      p.rect(p.mouseX + 10, p.mouseY - 20, 120, 30, 5);
      p.fill(0);
      p.noStroke();
      p.textAlign(p.LEFT, p.CENTER);
      p.textSize(14);
      p.text(`Minute: ${currentMinute}`, p.mouseX + 15, p.mouseY - 5);
    }

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
