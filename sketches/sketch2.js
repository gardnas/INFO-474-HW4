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

    // hours:
    let hour = p.hour();
    p.fill(255);
    p.noStroke();
    p.textSize(28);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Hour: ", 100, 100);

    let minute = p.minute();
    p.fill(255);
    p.noStroke();
    p.textSize(28);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Minute: ", 100, 200);

    let second = p.second();
    p.fill(255);
    p.noStroke();
    p.textSize(28);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Seconds: ", 100, 300);

    const ticksXHours = 190;
    const ticksXMinutes = 210;
    const ticksXSeconds = 240;
    drawTallyMarks(p, ticksXHours, 95, hour, { tallyHeight: 36, groupSpacing: 46, tallySpacing: 10, maxGroupsPerRow: 6 });

    drawTallyMarks(p, ticksXMinutes, 202, minute,{ tallyHeight: 24, groupSpacing: 38, tallySpacing: 8, maxGroupsPerRow: 15 });

    drawTallyMarks(p, ticksXSeconds, 303, second,{ tallyHeight: 20, groupSpacing: 34, tallySpacing: 7, maxGroupsPerRow: 15 });
  };

  function drawTallyMarks(p, startX, startY, count, opts) {
    const tallyHeight = opts.tallyHeight || 30;
    const groupSpacing = opts.groupSpacing || 40;
    const tallySpacing = opts.tallySpacing || 8;
    const maxGroupsPerRow = opts.maxGroupsPerRow || 10;

    p.stroke(255);
    p.strokeWeight(3);
    p.strokeCap(p.ROUND);

    const fullGroups = Math.floor(count / 5);
    const remainder = count % 5;

    // draw full groups (4 vertical + diagonal) with wrapping
    for (let g = 0; g < fullGroups; g++) {
      const groupIndex = g % maxGroupsPerRow;
      const row = Math.floor(g / maxGroupsPerRow);
      const gx = startX + groupIndex * groupSpacing;
      const gy = startY + row * (tallyHeight + 12);

      // 4 veritcal lines
      for (let j = 0; j < 4; j++) {
        const x = gx + j * tallySpacing;
        p.line(x, gy, x, gy + tallyHeight);
      }
      // diagonal 5th line
      p.line(gx, gy, gx + 3 * tallySpacing, gy + tallyHeight);
    }

    const baseGroup = fullGroups;
    for (let r = 0; r < remainder; r++) {
      const groupIndex = baseGroup % maxGroupsPerRow;
      const row = Math.floor(baseGroup / maxGroupsPerRow);
      const gx = startX + groupIndex * groupSpacing + r * tallySpacing;
      const gy = startY + row * (tallyHeight + 12);

      p.line(gx, gy, gx, gy + tallyHeight);
    }
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});